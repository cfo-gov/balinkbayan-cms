import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Progress } from "@/shared/components/ui/progress";
import { Textarea } from "@/shared/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUploadImage } from "../react-query/upload-image";
import { type fileUploadSchema, FileUploadSchema } from "../utils/validations";


interface UploadNewMediaModalProps {
  open: boolean;
  setClose: () => void;
}

export function UploadNewMediaModal({ open, setClose }: UploadNewMediaModalProps) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const upload = useUploadImage()

  const method = useForm({
    defaultValues: {
      title: "",
      description: "",
      file: null as unknown as File
    },
    resolver: zodResolver(FileUploadSchema)
  })
  const { register, handleSubmit, watch, reset, resetField, setValue, formState } = method

  const onSubmit: SubmitHandler<fileUploadSchema> = async data => {
    if (!data.file) return;

    setUploading(true);
    const fd = new FormData();

    fd.append("file", data.file)
    fd.append("title", data.title)
    fd.append("description", data.description)

    upload.mutate(fd, {
      onSuccess: () => {
        toast.success("image uploaded")
        setProgress(100);
        setTimeout(() => {
          setUploading(false);
          setClose()
        }, 500);
        reset()
      },
      onError: () => {
        toast.error("image upload failed")
        setUploading(false);
      }
    }
    )
  }

  const resetForm = () => {
    reset();
    setProgress(0);
    setPreview(null);
  };

  const file = watch("file") as File

  useEffect(() => {
    if (file instanceof File) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [file]);

  const handleClose = () => {
    resetForm();
    setClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload New Media</DialogTitle>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="Enter media title"
              {...register("title")}
            />
            {formState.errors.title && (
              <p className="text-red-500 text-sm mt-1">{formState.errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              {...register("description")}
              rows={3}
              placeholder="Enter media description"
            />
            {formState.errors.description && (
              <p className="text-red-500 text-sm mt-1">{formState.errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="file" className="block text-sm font-medium"
              onClick={() => reset({ ...method.getValues(), file: null as unknown as File })}>
            </label>
            {preview ? (
              <div className="mt-2 relative">
                {file?.type.startsWith('image/') ? (
                  <Image
                    src={preview}
                    width={500}
                    height={500}
                    alt="Preview"
                    className="max-h-64 rounded-md mx-auto object-center"
                  />
                ) : file?.type.startsWith('video/') ? (
                  <video
                    src={preview}
                    controls
                    className="max-h-64 rounded-md mx-auto w-full"
                  />
                ) : null}
                <button
                  type="button"
                  onClick={() => resetField("file")}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="file-input"
                className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer block"
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Drag and drop your file here, or <span className="text-primary font-medium">browse</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    {file ? file.name : "No file selected"}
                  </p>
                </div>
              </label>
            )}
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept="image/*,video/*"
              {...register("file")}
              onChange={(e) => setValue("file", e.target.files?.[0] as File ?? null)}
            />
            {formState.errors.file && (
              <p className="text-red-500 text-sm mt-1">{formState.errors.file.message}</p>
            )}
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button variant="outline" type="button" onClick={handleClose} disabled={uploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={!file || uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}