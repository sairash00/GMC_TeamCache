import { v2 as cloudinary } from "cloudinary";

const deleteVideoFromCloudinary = async (publicId) => {
    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId, {
        resource_type: "video",
    });
};

export default deleteVideoFromCloudinary;