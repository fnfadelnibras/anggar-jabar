"use client"

import { useState, useRef, useCallback } from "react"
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { RotateCcw, RotateCw, ZoomIn, ZoomOut } from "lucide-react"

interface ImageCropperProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  onCropComplete: (croppedImageUrl: string) => void
  aspectRatio?: number
  cropShape?: "rect" | "round"
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export function ImageCropper({
  isOpen,
  onClose,
  imageSrc,
  onCropComplete,
  aspectRatio = 1,
  cropShape = "round"
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const imgRef = useRef<HTMLImageElement>(null)

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspectRatio) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspectRatio))
    }
  }, [aspectRatio])

  const getCroppedImg = useCallback(
    (imageSrc: string, crop: PixelCrop): Promise<string> => {
      return new Promise((resolve) => {
        const image = new Image()
        image.src = imageSrc
        image.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')

          if (!ctx) {
            resolve(imageSrc)
            return
          }

          // Get the actual displayed image dimensions
          const displayedWidth = imgRef.current?.width || image.width
          const displayedHeight = imgRef.current?.height || image.height

          // Calculate scale factors
          const scaleX = image.naturalWidth / displayedWidth
          const scaleY = image.naturalHeight / displayedHeight

          canvas.width = crop.width
          canvas.height = crop.height

          ctx.imageSmoothingQuality = 'high'

          ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
          )

          // Convert to blob and then to data URL
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              resolve(url)
            } else {
              resolve(imageSrc)
            }
          }, 'image/jpeg', 1.0)
        }
      })
    },
    [imgRef]
  )

  const handleCropComplete = useCallback(async () => {
    if (completedCrop && imgRef.current) {
      const croppedImageUrl = await getCroppedImg(imageSrc, completedCrop)
      onCropComplete(croppedImageUrl)
      onClose()
    }
  }, [completedCrop, imageSrc, onCropComplete, onClose, getCroppedImg])

  const handleRotate = (direction: 'left' | 'right') => {
    setRotation(prev => prev + (direction === 'left' ? -90 : 90))
  }

  const handleZoom = (direction: 'in' | 'out') => {
    setScale(prev => {
      const newScale = direction === 'in' ? prev * 1.1 : prev / 1.1
      return Math.min(Math.max(newScale, 0.5), 3)
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRotate('left')}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleZoom('out')}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Scale: {Math.round(scale * 100)}%
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleZoom('in')}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRotate('right')}
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>

          {/* Image Cropper */}
          <div className="flex justify-center">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
              circularCrop={cropShape === "round"}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imageSrc}
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                  maxHeight: '60vh',
                  maxWidth: '100%',
                  objectFit: 'contain'
                }}
                onLoad={onImageLoad}
                // eslint-disable-next-line @next/next/no-img-element
              />
            </ReactCrop>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCropComplete} disabled={!completedCrop}>
            Crop & Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 