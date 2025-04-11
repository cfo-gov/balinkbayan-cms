"use client"

import { Button } from "@/shared/components/ui/button"
import { useState } from "react"

type FilterProps = {
  categories: string[]
  onFilterChange: (category: string) => void
}

export function MediaFilter({ categories, onFilterChange }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const handleFilterClick = (category: string) => {
    setActiveFilter(category)
    onFilterChange(category)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={activeFilter === "all" ? "default" : "outline"}
        onClick={() => handleFilterClick("all")}
        className="rounded-full"
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeFilter === category ? "default" : "outline"}
          onClick={() => handleFilterClick(category)}
          className="rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
