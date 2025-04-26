// lib/cloudinary.ts - Updated with better error handling
import { v2 as cloudinary } from 'cloudinary';

// Check if the required environment variables are set
const requiredEnvVars = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

const missingVars = requiredEnvVars.filter(
  varName => !process.env[varName]
);

if (missingVars.length > 0) {
  console.error(`Missing required Cloudinary environment variables: ${missingVars.join(', ')}`);
  // In development, you might want to throw an error to make it obvious
  if (process.env.NODE_ENV === 'development') {
    throw new Error(`Cloudinary configuration error: Missing ${missingVars.join(', ')}`);
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export default cloudinary;