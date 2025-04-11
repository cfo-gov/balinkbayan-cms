import api from "@/shared/data/api"
import { useQuery } from "@tanstack/react-query"
import { type MediaItem } from "../types"

export const useGetAllItems = (searchTerm?: string) => {
  return useQuery<MediaItem[]>({
    queryKey: ["all-media", searchTerm],
    queryFn: async () => {
      console.log("Fetching media items...", searchTerm)

      const url = searchTerm
        ? `/media?search=${encodeURIComponent(searchTerm)}`
        : "/media"
      const response = await api.get(url)
      if (response.statusText !== "OK") {
        throw new Error("Network response was not ok")
      }
      return response.data
    },
    refetchOnWindowFocus: false,
  })
}