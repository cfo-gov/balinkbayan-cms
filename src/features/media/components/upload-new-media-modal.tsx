import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Progress } from "@/shared/components/ui/progress";
import { Textarea } from "@/shared/components/ui/textarea";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface UploadNewMediaModalProps {
  open: boolean;
  setClose: () => void;
  onUpload: (data: { title: string; description: string; file: File | null }) => void;
}

export function UploadNewMediaModal({ open, setClose, onUpload }: UploadNewMediaModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Clean up the URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    // Simulate upload progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate upload delay
    setTimeout(() => {
      clearInterval(timer);
      setProgress(100);
      onUpload({ title, description, file });
      resetForm();
      setUploading(false);
    }, 3000);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setPreview(null);
    setProgress(0);
  };

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter media title"
              disabled={uploading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Enter media description"
              disabled={uploading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="file" className="block text-sm font-medium">
              Media File
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
                  onClick={() => setFile(null)}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer"
                onClick={() => !uploading && document.getElementById("file-input")?.click()}
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
              </div>
            )}
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              disabled={uploading}
            />
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