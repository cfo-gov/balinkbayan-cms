"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog"
import type React from "react"

interface CustomAlertDialogProps {
  title: string
  description: string
  onYes: () => void
  onNo?: () => void
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  yesText?: string
  noText?: string
}

export function CAlert({
  title,
  description,
  onYes,
  onNo,
  trigger,
  open,
  onOpenChange,
  yesText = "Yes",
  noText = "No",
}: CustomAlertDialogProps) {

  const handleNo = () => {
    if (onNo) {
      onNo()
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent className="bg-white dark:bg-gray-800">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleNo}>{noText}</AlertDialogCancel>
          <AlertDialogAction onClick={onYes}>{yesText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
