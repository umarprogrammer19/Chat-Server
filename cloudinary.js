import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "dotenv/config";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility function to upload an image to Cloudinary
export const uploadImageToCloudinary = async (localPath) => {
    try {
        const result = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto",
        });
        fs.unlinkSync(localPath);
        return result.url;
    } catch (err) {
        console.error("Error uploading image to Cloudinary:", err);
        fs.unlinkSync(localPath);
        throw new Error("Failed to upload image to Cloudinary");
    }
};
