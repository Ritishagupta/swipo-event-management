import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

//  Helper: Get Cloudinary public_id from image URL
const getCloudinaryPublicId = (url) => {
  try {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    const publicId = fileName.split(".")[0];
    return `swipo-events-management/${publicId}`;
  } catch (err) {
    console.error("Failed to get publicId from URL", err);
    return null;
  }
};

//  Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  Upload Function
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "swipo-events-management",
    });

    console.log("Event file has been uploaded ✅");
    fs.unlinkSync(localFilePath); // Remove temp file

    return response;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

// Delete Function
const deleteFromCloudinary = async (url) => {
  try {
    if (!url) return null;

    const publicId = getCloudinaryPublicId(url);
    if (publicId) {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log("Image deleted ✅ --", result);
      return result;
    } else {
      console.warn("Public ID could not be extracted.");
    }
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
