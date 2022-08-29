import 'dotenv/config';

import cloudi from 'cloudinary';

interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  folder?: string;
}

export const cloudinaryConfig = {
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  // folder: "images",
} as CloudinaryConfig;

cloudi.v2.config({
  api_key: cloudinaryConfig.apiKey,
  api_secret: cloudinaryConfig.apiSecret,
  cloud_name: cloudinaryConfig.cloudName,
});

export const cloudinary = cloudi.v2;
