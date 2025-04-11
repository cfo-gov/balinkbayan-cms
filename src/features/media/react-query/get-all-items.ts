import { useQuery } from "@tanstack/react-query"
import { type MediaItem } from "../types"

export const useGetAllItems = (searchTerm?: string) => {
  return useQuery<MediaItem[]>({
    queryKey: ["all-media", searchTerm],
    queryFn: async () => {
      const url = searchTerm
        ? `/api/media?search=${encodeURIComponent(searchTerm)}`
        : "/api/media"
      const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    },
    refetchOnWindowFocus: false,
  })
}