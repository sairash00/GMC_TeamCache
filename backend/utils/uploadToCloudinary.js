import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (file) => {
    if (!file) return null;

    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    folder: "TeamCache",
                    resource_type: "auto",
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            )
            .end(file.buffer);
    });
};

export default uploadToCloudinary;