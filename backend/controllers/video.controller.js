import User from "../models/user.model.js";
import Video from "../models/video.model.js"; 

import CatchAsync from "../utils/CatchAsync.js";
import ApiError from "../utils/ApiError.js";
import sendResponse from "../utils/ApiResponse.js";

import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import uploadVideoToCloudinary from "../utils/uploadToCloudinaryVideo.js";

import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";
import deleteVideoFromCloudinary from "../utils/deleteFromCloudinaryVideo.js";

// Upload Video

export const uploadVideo = CatchAsync(async (req, res) => {
  const { title, description, category, isPremium } = req.body;

  if (!req.files?.thumbnail?.length) {
    throw new ApiError(400, "Thumbnail is required.");
  }

  if (!req.files?.video?.length) {
    throw new ApiError(400, "Video is required.");
  }

  const thumbnailLocalPath = req.files.thumbnail[0].path;
  const videoLocalPath = req.files.video[0].path;

  const uploadedThumbnail = await uploadToCloudinary(thumbnailLocalPath);

  if (!uploadedThumbnail?.url) {
    throw new ApiError(500, "Thumbnail upload failed.");
  }

  const uploadedVideo = await uploadVideoToCloudinary(videoLocalPath);

  if (!uploadedVideo?.url) {
    throw new ApiError(500, "Video upload failed.");
  }

  const premium = isPremium === true || isPremium === "true";

  const creditsRequired = premium ? 30 : 0;

  const video = await Video.create({
    title,

    description,

    category,

    isPremium: premium,

    creditsRequired,

    thumbnail: {
      public_id: uploadedThumbnail.public_id,
      url: uploadedThumbnail.url,
    },

    video: {
      public_id: uploadedVideo.public_id,
      url: uploadedVideo.url,
    },

    uploadedBy: req.user._id,
  });

  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      uploadedVideos: video._id,
    },
  });

  return sendResponse(res, 201, true, "Video uploaded successfully.", video);
});

// Get All Videos

export const getAllVideos = CatchAsync(async (req, res) => {
  const videos = await Video.find().populate("uploadedBy", "name avatar").sort({
    createdAt: -1,
  });

  return sendResponse(res, 200, "Videos fetched successfully.", videos);
});

// Get Video By Id

export const getVideoById = CatchAsync(async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id).populate("uploadedBy", "name avatar");

  if (!video) {
    throw new ApiError(404, "Video not found.");
  }

  video.views += 1;

  await video.save();

  return sendResponse(res, 200,  "Video fetched successfully.", video);
});

// Unlock Premium Video
// ditching it for the time being
export const unlockPremiumVideo = CatchAsync(async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id);

  if (!video) {
    throw new ApiError(404, "Video not found.");
  }

  if (!video.isPremium) {
    return sendResponse(res, 200, "This video is already free.", video);
  }

  const user = await User.findById(req.user._id);

  if (user.credits < video.creditsRequired) {
    throw new ApiError(400, "Not enough Skill Credits to unlock this video.");
  }

  user.credits -= video.creditsRequired;

  await user.save();

  return sendResponse(res, 200,"Premium video unlocked successfully.", {
    remainingCredits: user.credits,
    video,
  });
});

// Delete Video

export const deleteVideo = CatchAsync(async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id);

  if (!video) {
    throw new ApiError(404, "Video not found.");
  }

  if (video.uploadedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this video.");
  }

  await deleteFromCloudinary(video.thumbnail.public_id);

  await deleteVideoFromCloudinary(video.video.public_id);

  await User.findByIdAndUpdate(req.user._id, {
    $pull: {
      uploadedVideos: video._id,
    },
  });

  await video.deleteOne();

  return sendResponse(res, 200, true, "Video deleted successfully.");
});
