import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadVideoToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "video",
            folder: "skillsnap/videos",
        });

        fs.unlinkSync(localFilePath);

        return {
            public_id: response.public_id,
            url: response.secure_url,
        };
    } catch (error) {
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        throw error;
    }
};

export default uploadVideoToCloudinary;