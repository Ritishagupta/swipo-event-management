import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const getCloudinaryPublicId = (url) => {
  try {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    const publicId = fileName.split(".")[0]; // remove extension
    return `swipo-events/${publicId}`; // include folder if used
  } catch {
    return null;
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //Upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "swipo-events-management",
    });
    console.log("Event file has been uploaded ");
    fs.unlinkSync(localFilePath); //Remove the local file after uploading on cloudinary gets failed.
    return response;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath); //Remove the local file after uploading on cloudinary gets failed.
    return null;
  }
};

const deleteFromCloudinary = async (url) => {
  try {
    if (!url) return null;

    //delete from cloudinary
    const publicId = getCloudinaryPublicId(imageUrl);
    if (publicId) {
      const result = await cloudinary.uploader.destroy(publicId);
      if (result) {
        return result;
      }
    }
  } catch (error) {}
};
export { uploadOnCloudinary, deleteFromCloudinary };
