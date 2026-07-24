import User from "../models/user.model.js";
import Video from "../models/video.model.js"; 

import CatchAsync from "../utils/CatchAsync.js";
import ApiError from "../utils/ApiError.js";
import sendResponse from "../utils/ApiResponse.js";

import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";

// Get My Profile checked

export const getProfile = CatchAsync(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password")
    .populate(
      "uploadedVideos",
      "title description thumbnail category views isPremium creditsRequired",
    );

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return sendResponse(res, 200, "Profile fetched successfully.", user);
});

// Upload Avatar checked

export const uploadAvatar = CatchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Please upload an image.");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (user.avatar?.public_id) {
    await deleteFromCloudinary(user.avatar.public_id);
  }

  const uploaded = await uploadToCloudinary(req.file.path);

  user.avatar = {
    public_id: uploaded.public_id,
    url: uploaded.url,
  };

  await user.save();

  return sendResponse(res, 200, "Avatar uploaded successfully.", {
    avatar: user.avatar,
  });
});

//user credit increment functionality its underdeveloped

export const increaseCredits = CatchAsync(async (req, res) => {
  const { videoId } = req.body;

  if (!videoId) {
    throw new ApiError(400, "Video ID is required.");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found.");
  }

  const alreadyRewarded = user.rewardedVideos.some(
    (id) => id.toString() === videoId,
  );

  if (alreadyRewarded) {
    return sendResponse(res, 401, "Credits already awarded for this video.", {
      creditsEarned: 0,
      credits: user.credits,
    });
  }

  // Reward: 10 credit per completed video
  const creditsEarned = 10;

  user.credits += creditsEarned;
  user.rewardedVideos.push(video._id);

  await user.save();

  return sendResponse(res, 200, "Credits awarded successfully.", {
    creditsEarned,
    credits: user.credits,
  });
});

export const getUnlockedPremiumVideos = CatchAsync(async (req, res) => {
  const user = await User.findById(req.user._id).select("premiumVideos");

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return sendResponse(
    res,
    200,
    "Unlocked premium videos fetched successfully.",
    user.premiumVideos,
  );
});
