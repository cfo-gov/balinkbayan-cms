import api from "@/shared/data/api"
import { useQuery } from "@tanstack/react-query"
import { type MediaItem } from "../types"

export const useGetAllItems = (searchTerm?: string) => {
  return useQuery<MediaItem[]>({
    queryKey: ["all-media", searchTerm],
    queryFn: async () => {
      const url = searchTerm
        ? `/media?search=${encodeURIComponent(searchTerm)}`
        : "/media"
      const response = await api.get(url)

      return response.data
    },
    refetchOnWindowFocus: false,
  })
}