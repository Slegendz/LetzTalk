import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return "";
    // Upload the file on cloud
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    let modifiedUrl = response.secure_url;
    if (response.resource_type === "image") {
      modifiedUrl = response.secure_url.replace(`v${response.version}`, "f_auto,q_30");
    }
    if (response.resource_type === "video") {
      modifiedUrl = response.secure_url.replace(`v${response.version}`, "f_auto:video,q_30");
    }

    // File has been uploaded successfully
    console.log("FILE IS UPLOADED ON CLOUD ", modifiedUrl);
    return modifiedUrl;
  } catch (err) {
    console.log("Failed to upload");
    // Remove the locally saved temporarily saved file as the upload opeation got failed
    return "";
  } finally {
    fs.unlinkSync(localFilePath);
  }
};

export default uploadOnCloudinary;
