"use client"

import { Button } from "@/shared/components/ui/button"
import { CAlert } from "@/shared/components/utilities/alert"
import { ChevronLeft, ChevronRight, Link, Plus, Trash2, X } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { useDeleteImage } from "../react-query/delete-image"
import { useGetAllItems } from "../react-query/get-all-items"
import { useUploadImage } from "../react-query/upload-image"
import { type MediaItem, type MediaUploadType } from "../types"
import { UploadNewMediaModal } from "./upload-new-media-modal"

export function MediaGallery() {
  const upload = useUploadImage()
  const deleteitem = useDeleteImage()

  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const params = useSearchParams()

  const searchParams = params.get("search") || ""
  const { data: mediaItems } = useGetAllItems(searchParams)

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(window.location.origin + link).then(() => {
      toast("Link copied to clipboard!", {
        position: "bottom-right"
      })
    }).catch((err) => {
      toast.error(`Failed to copy: ${err}`)
    })
  }

  const openModal = (item: MediaItem) => {
    setSelectedItem(item)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedItem(null)
    document.body.style.overflow = "auto"
  }

  const navigateGallery = useCallback((direction: "next" | "prev") => {
    if (!selectedItem) return

    const currentIndex = mediaItems!.findIndex((item) => item.id === selectedItem.id)
    let newIndex

    if (direction === "next") {
      newIndex = (currentIndex + 1) % mediaItems!.length
    } else {
      newIndex = (currentIndex - 1 + mediaItems!.length) % mediaItems!.length
    }

    setSelectedItem(mediaItems![newIndex])
  }, [selectedItem, mediaItems])


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedItem) return

      if (event.key === "ArrowLeft") {
        navigateGallery("prev")
      } else if (event.key === "ArrowRight") {
        navigateGallery("next")
      } else if (event.key === "Escape") {
        closeModal()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [navigateGallery, selectedItem])


  const handleUpload = async (newItem: MediaUploadType) => {
    const fd = new FormData()
    fd.append("file", newItem.file as Blob)

    upload.mutate(fd, {
      onSuccess: () => {
        toast.success("Image uploaded successfully")
        setShowUploadDialog(false)
      },
      onError: (error) => {
        toast.error(`Error uploading image: ${error}`)
      }
    })
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <div
          className="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
          onClick={() => setShowUploadDialog(true)}
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Plus className="h-6 w-6 text-gray-500" />
            </div>
            <span className="text-sm font-medium">Add Media</span>
          </div>
        </div>
        {mediaItems && mediaItems.map((item) => (
          <div
            key={item.id}
            className="relative group overflow-hidden rounded-lg border border-dashed border-gray-300 cursor-pointer transition-all duration-300 hover:shadow-lg"
            onClick={() => openModal(item)}
          >
            <div className="aspect-square relative">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
              <CAlert
                trigger={
                  <Button variant="ghost" className="absolute  right-0 mr-2.5 mt-1 bg-white border border-dotted border-black px-1 py-1.5 hover:bg-white/70">
                    <span className="sr-only">Delete</span>
                    <Trash2 className="h-6 w-6 text-black text-shadow-lg text-shadow-white" />
                  </Button>}
                title={`Delete ${item.title}`}
                description="Are you sure you want to delete this image? This action cannot be undone."
                onYes={() => deleteitem.mutate(item.id, {
                  onSuccess: () => {
                    toast.success("Image deleted successfully")
                    closeModal()
                  },
                  onError: (error) => {
                    toast.error(`Error deleting image: ${error}`)
                  }
                })}
                onNo={() => closeModal()}
                onOpenChange={() => closeModal()}
                noText="Cancel"
                yesText="Delete"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-shadow-md text-shadow-black">
                <h3 className="font-medium text-lg">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>


      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>

            <button
              onClick={() => navigateGallery("prev")}
              className="absolute left-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </button>

            <button
              onClick={() => navigateGallery("next")}
              className="absolute right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="relative max-h-[80vh] max-w-full">
              <Image
                src={selectedItem.src || "/placeholder.svg"}
                alt={selectedItem.alt}
                width={1200}
                height={800}
                className="object-contain min-h-[683px] max-h-[80vh]"
              />
              <div className="relative">
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white">
                  <h2 className="text-xl font-bold">{selectedItem.title}</h2>
                  <p className="text-sm opacity-90">{selectedItem.description}</p>
                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button variant="ghost" className="hover:bg-black/70"
                    onClick={() => copyLink(selectedItem.src || "")}
                  >
                    <span className="sr-only">Copy link</span>
                    <Link className="h-6 w-6 text-white" />
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <UploadNewMediaModal open={showUploadDialog} setClose={() => setShowUploadDialog(false)} onUpload={handleUpload} />
    </div>
  )
}
