export type MediaItem = {
  id: string
  title: string
  description: string
  type: "image" | "video"
  src: string
  alt: string
}

export type MediaUploadType = {
  title: string
  description: string
  file: File | null
}