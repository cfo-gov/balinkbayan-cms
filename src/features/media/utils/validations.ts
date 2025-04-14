import { z } from "zod";

export const FileUploadSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  file: z
    .instanceof(File)
    .refine((file) => ["image/", "video/"].some((type) => file.type.startsWith(type)), {
      message: "Only image and video files are allowed",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must be 5MB or less",
    }),
});

export type fileUploadSchema = z.infer<typeof FileUploadSchema>