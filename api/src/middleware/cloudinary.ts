import { v2 as cloudinary } from "cloudinary";
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || "dtjpty55a",
  api_key: process.env.CLOUDINARY_API_KEY || "632554956838911",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "Y_Q7ynhv5QyqQhte3Ev4UOudQV4",
});

export { cloudinary };
