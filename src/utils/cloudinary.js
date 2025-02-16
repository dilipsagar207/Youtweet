import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // Importing the fs module

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
      if (!localFilePath) return null;
      // Upload the file on Cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto"
      });
      // File has been uploaded successfully
      // console.log("File is uploaded on Cloudinary", response.url);
      fs.unlinkSync(localFilePath); // Remove the local file after upload
      return response;
  } catch (error) {
      fs.unlinkSync(localFilePath); // Remove the local file if upload fails
      console.error("Error uploading to Cloudinary:", error); // Log the error
      return null;
  }
};

export { uploadOnCloudinary };