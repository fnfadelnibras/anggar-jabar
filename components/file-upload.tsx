"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, FileText, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import Image from "next/image"

export type FileStatus = "idle" | "uploading" | "success" | "error"

export interface FileUploadProps {
  label: string
  accept: string
  maxSize?: number // in MB
  onFileSelect: (file: File) => void
  onFileRemove?: () => void
  className?: string
  helpText?: string
  error?: string
  value?: string
  required?: boolean
}

export function FileUpload({
  label,
  accept,
  maxSize = 5,
  onFileSelect,
  onFileRemove,
  className,
  helpText,
  error,
  value,
  required = false,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<FileStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setStatus("error")
      return false
    }

    // Check file type
    const fileType = file.type
    const acceptedTypes = accept.split(",").map((type) => type.trim())
    if (
      !acceptedTypes.some((type) => {
        if (type.includes("*")) {
          // Handle wildcards like "image/*"
          return fileType.startsWith(type.split("*")[0])
        }
        return type === fileType
      })
    ) {
      setStatus("error")
      return false
    }

    return true
  }

  const simulateUpload = (file: File) => {
    setStatus("uploading")
    setProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setStatus("success")
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (validateFile(droppedFile)) {
        setFile(droppedFile)
        onFileSelect(droppedFile)
        simulateUpload(droppedFile)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (validateFile(selectedFile)) {
        setFile(selectedFile)
        onFileSelect(selectedFile)
        simulateUpload(selectedFile)
      }
    }
  }

  const handleRemove = () => {
    setFile(null)
    setStatus("idle")
    setProgress(0)
    if (inputRef.current) inputRef.current.value = ""
    if (onFileRemove) onFileRemove()
  }

  const getFileIcon = () => {
    if (!file) return null

    if (file.type.startsWith("image/")) {
      return value || URL.createObjectURL(file)
    }

    return <FileText className="h-10 w-10 text-primary" />
  }

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <Check className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-destructive" />
      default:
        return null
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">
          {label} {required && <span className="text-destructive">*</span>}
        </div>
        {getStatusIcon()}
      </div>

      <div
        className={cn(
          "border-2 border-dashed rounded-md transition-colors",
          dragActive ? "border-primary bg-primary/5" : "border-border",
          status === "error" ? "border-destructive bg-destructive/5" : "",
          "relative",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="p-4 flex flex-col items-center">
            <div className="relative mb-2">
              {typeof getFileIcon() === "string" ? (
                <Image
                  src={(getFileIcon() as string) || "/placeholder.svg"}
                  alt={file.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 object-cover rounded-md"
                />
              ) : (
                getFileIcon()
              )}
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-background rounded-full p-1 shadow-sm border"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove file</span>
              </button>
            </div>
            <div className="text-sm truncate max-w-full">{file.name}</div>
            <div className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</div>

            {status === "uploading" && (
              <div className="w-full mt-2">
                <Progress value={progress} className="h-1" />
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 flex flex-col items-center justify-center">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-center text-muted-foreground mb-1">Drag and drop or click to upload</p>
            <p className="text-xs text-center text-muted-foreground">
              {accept.includes("image/") ? "PNG, JPG or WEBP" : "PDF, DOC, DOCX"} (max. {maxSize}MB)
            </p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => inputRef.current?.click()}>
              Select File
            </Button>
          </div>
        )}
      </div>

      {helpText && !error && <p className="text-xs text-muted-foreground">{helpText}</p>}

      {error && <p className="text-xs text-destructive">{error}</p>}

      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
    </div>
  )
}
