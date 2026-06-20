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

const DeleteMediaInput = z.object({
  url: z.string().optional(),
  publicId: z.string().optional(),
});

export const deleteMedia = createServerFn({ method: "POST" })
  .validator(DeleteMediaInput)
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    configureCloudinary();

    const prisma = getPrisma();
    const stored = prisma && data.url
      ? await prisma.mediaAsset.findFirst({
          where: { OR: [{ secureUrl: data.url }, { url: data.url }] },
        })
      : null;

    const publicId = data.publicId ?? stored?.publicId;
    if (!publicId) return { deleted: false };

    await cloudinary.uploader.destroy(publicId, {
      resource_type: stored?.resourceType === "video" ? "video" : "image",
    });

    if (prisma) {
      await prisma.mediaAsset.deleteMany({ where: { publicId } });
    }

    return { deleted: true };
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


