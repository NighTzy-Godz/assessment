import { v2 as cloudinary, ConfigOptions } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME,
} from "../config/env";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const cloudinaryConfig: ConfigOptions = {
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
};

cloudinary.config(cloudinaryConfig);

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "assessment",
    allowed_formats: ["jpg", "png", "jpeg"],
  } as any,
});

export { storage, cloudinary };
