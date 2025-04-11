import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useDeleteImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      if (!id) {
        throw new Error("No ID provided")
      }

      const response = await fetch(`/api/media/delete`, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        cache: "no-store",
      })
      if (!response.ok) {
        throw new Error("Failed to delete image")
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-media"] })
    },
    onError: (error) => {
      toast.error(`Error deleting image: ${error.message}`, {
        position: "bottom-left"
      })

    }
  })
}