"use client"

import { useState } from "react"
import { Download, Eye, Trash2, FileText, FileImage, FileArchive, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export interface Document {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadDate: string
  category: "photo" | "id-card" | "family-card" | "birth-certificate" | "other"
}

interface DocumentManagerProps {
  documents: Document[]
  onDelete: (id: string) => void
  onDownload: (document: Document) => void
  className?: string
  category?: string
  userRole?: string
  userRegion?: string
}

export function DocumentManager({
  documents,
  onDelete,
  onDownload,
  className,
  category,
  userRole,
  userRegion,
}: DocumentManagerProps) {
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null)

  const getDocumentIcon = (document: Document) => {
    if (document.type.startsWith("image/")) {
      return <FileImage className="h-5 w-5" />
    } else if (document.type.includes("pdf")) {
      return <FileText className="h-5 w-5" />
    } else if (document.type.includes("zip") || document.type.includes("rar")) {
      return <FileArchive className="h-5 w-5" />
    } else {
      return <File className="h-5 w-5" />
    }
  }

  const getCategoryLabel = (category: Document["category"]) => {
    switch (category) {
      case "photo":
        return "Photo"
      case "id-card":
        return "ID Card"
      case "family-card":
        return "Family Card"
      case "birth-certificate":
        return "Birth Certificate"
      default:
        return "Other"
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const handlePreview = (document: Document) => {
    setPreviewDocument(document)
  }

  const canPreview = (document: Document) => {
    return document.type.startsWith("image/") || document.type.includes("pdf")
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-medium">Documents</h3>

      {documents.length === 0 ? (
        <div className="text-center p-6 border rounded-md bg-muted/20">
          <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {documents.map((document) => (
            <div
              key={document.id}
              className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                {getDocumentIcon(document)}
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{document.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{getCategoryLabel(document.category)}</span>
                    <span>•</span>
                    <span>{formatFileSize(document.size)}</span>
                    <span>•</span>
                    <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <span className="sr-only">Open menu</span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                    >
                      <path
                        d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {canPreview(document) && (
                    <DropdownMenuItem onClick={() => handlePreview(document)}>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>Preview</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => onDownload(document)}>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(document.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      )}

      {/* Document Preview Dialog */}
      <Dialog open={!!previewDocument} onOpenChange={(open) => !open && setPreviewDocument(null)}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{previewDocument?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex justify-center">
            {previewDocument?.type.startsWith("image/") ? (
              <img
                src={previewDocument.url || "/placeholder.svg"}
                alt={previewDocument.name}
                className="max-h-[500px] max-w-full object-contain rounded-md"
              />
            ) : previewDocument?.type.includes("pdf") ? (
              <iframe
                src={previewDocument.url}
                title={previewDocument.name}
                className="w-full h-[500px] rounded-md border"
              />
            ) : (
              <div className="text-center p-8">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p>This file type cannot be previewed</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => previewDocument && onDownload(previewDocument)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
