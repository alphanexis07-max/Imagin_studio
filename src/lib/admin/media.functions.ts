import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "./auth.server";
import { getPrisma } from "@/lib/db.server";

const UploadInput = z.object({
  dataUri: z.string().min(20),
  folder: z.string().default("alphanexis"),
  resourceType: z.enum(["image", "video", "auto"]).default("auto"),
});

export const uploadMedia = createServerFn({ method: "POST" })
  .validator(UploadInput)
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    configureCloudinary();

    const result = await cloudinary.uploader.upload(data.dataUri, {
      folder: data.folder,
      resource_type: data.resourceType,
    });

    const asset = {
      publicId: result.public_id,
      url: result.url,
      secureUrl: result.secure_url,
      resourceType: result.resource_type,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      folder: data.folder,
    };

    const prisma = getPrisma();
    if (prisma) {
      await prisma.mediaAsset.create({ data: asset });
    }

    return asset;
  });

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary env vars are missing.");
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

