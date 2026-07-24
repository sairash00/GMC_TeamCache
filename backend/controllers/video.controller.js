import User from "../models/user.model.js";
import Video from "../models/video.model.js";

import CatchAsync from "../utils/CatchAsync.js";
import ApiError from "../utils/ApiError.js";
import sendResponse from "../utils/sendResponse.js";

import {
    uploadToCloudinary,
    uploadVideoToCloudinary,
    deleteFromCloudinary,
    deleteVideoFromCloudinary,
} from "../utils/cloudinary.js";


//upload video
export const uploadVideo = CatchAsync(async (req, res) => {
    const { title, description, category, duration, isPremium } = req.body;

    if (!req.files?.thumbnail?.length) {
        throw new ApiError(400, "Thumbnail is required.");
    }

    if (!req.files?.video?.length) {
        throw new ApiError(400, "Video is required.");
    }

    const thumbnailLocalPath = req.files.thumbnail[0].path;
    const videoLocalPath = req.files.video[0].path;

    const uploadedThumbnail = await uploadToCloudinary(thumbnailLocalPath);

    if (!uploadedThumbnail) {
        throw new ApiError(500, "Thumbnail upload failed.");
    }

    const uploadedVideo = await uploadVideoToCloudinary(videoLocalPath);

    if (!uploadedVideo) {
        throw new ApiError(500, "Video upload failed.");
    }

    const creditsRequired =
        isPremium === "true" || isPremium === true
            ? Number(duration) * 6
            : 0;

    const video = await Video.create({
        title,
        description,
        category,
        duration,
        isPremium,
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

    return sendResponse(
        res,
        201,
        true,
        "Video uploaded successfully.",
        video
    );
});



//get all videos

export const getAllVideos = CatchAsync(async (req, res) => {
    const videos = await Video.find()
        .populate("uploadedBy", "name avatar")
        .sort({ createdAt: -1 });

    return sendResponse(
        res,
        200,
        true,
        "Videos fetched successfully.",
        videos
    );
});



//get videos by id

export const getVideoById = CatchAsync(async (req, res) => {
    const { id } = req.params;

    const video = await Video.findById(id).populate(
        "uploadedBy",
        "name avatar"
    );

    if (!video) {
        throw new ApiError(404, "Video not found.");
    }

    video.views += 1;
    await video.save();

    return sendResponse(
        res,
        200,
        true,
        "Video fetched successfully.",
        video
    );
});



//unlock premium videos
// lets ditch this idea for now 

export const unlockPremiumVideo = CatchAsync(async (req, res) => {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
        throw new ApiError(404, "Video not found.");
    }

    if (!video.isPremium) {
        return sendResponse(
            res,
            200,
            true,
            "This video is already free.",
            video
        );
    }

    const user = await User.findById(req.user._id);

    if (user.credits < video.creditsRequired) {
        throw new ApiError(
            400,
            "Not enough Skill Credits to unlock this video."
        );
    }

    user.credits -= video.creditsRequired;

    await user.save();

    return sendResponse(
        res,
        200,
        true,
        "Premium video unlocked successfully.",
        {
            remainingCredits: user.credits,
            video,
        }
    );
});



//delete videos

export const deleteVideo = CatchAsync(async (req, res) => {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
        throw new ApiError(404, "Video not found.");
    }

    if (video.uploadedBy.toString() !== req.user._id.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to delete this video."
        );
    }

    await deleteFromCloudinary(video.thumbnail.public_id);

    await deleteVideoFromCloudinary(video.video.public_id);

    await User.findByIdAndUpdate(req.user._id, {
        $pull: {
            uploadedVideos: video._id,
        },
    });

    await video.deleteOne();

    return sendResponse(
        res,
        200,
        true,
        "Video deleted successfully."
    );
});