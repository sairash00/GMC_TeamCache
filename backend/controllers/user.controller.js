import User from "../models/user.model.js";
import CatchAsync from "../utils/CatchAsync.js";
import ApiError from "../utils/ApiError.js";
import sendResponse from "../utils/ApiResponse.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";

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

    const uploaded = await uploadToCloudinary(req.file);

    user.avatar = {
        public_id: uploaded.public_id,
        url: uploaded.secure_url,
    };

    await user.save();

    return sendResponse(
        res,
        200,
        "Avatar uploaded successfully.",
        {
            avatar: user.avatar,
        }
    );
});