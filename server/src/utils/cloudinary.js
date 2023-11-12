import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (file) => {
  try {
    if (!file) return null;
    // Upload image to cloudinary
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    console.log(res);
    return res?.secure_url;
  } catch (error) {
    fs.unlinkSync(file); // Delete image from server
    console.log(error);
    return "";
  }
};

export default uploadImage;
