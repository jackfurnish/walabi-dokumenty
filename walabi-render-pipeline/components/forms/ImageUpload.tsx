'use client'

import { useRef, useCallback } from 'react'
import { UploadCloud, X, ImageIcon, Plus } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const MAX_IMAGES = 4

interface ImageUploadProps {
  onImagesChange: (dataUrls: string[], fileNames: string[]) => void
  values: string[]
  fileNames: string[]
  error?: string
}

export function ImageUpload({ onImagesChange, values, fileNames, error }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // Compress image via Canvas: resize to max 1200px, JPEG 80%
  const compressImage = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const MAX_DIM = 1200
          let { width, height } = img
          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) { height = Math.round((height * MAX_DIM) / width); width = MAX_DIM }
            else { width = Math.round((width * MAX_DIM) / height); height = MAX_DIM }
          }
          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
          resolve(canvas.toDataURL('image/jpeg', 0.80))
        }
        img.onerror = reject
        img.src = e.target?.result as string
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  const processFiles = useCallback(
    (files: FileList) => {
      const remaining = MAX_IMAGES - values.length
      if (remaining <= 0) return

      const toProcess = Array.from(files).filter(f => f.type.startsWith('image/')).slice(0, remaining)
      if (toProcess.length === 0) return

      Promise.all(toProcess.map(f => compressImage(f)))
        .then(newUrls => {
          const newNames = toProcess.map(f => f.name)
          onImagesChange([...values, ...newUrls], [...fileNames, ...newNames])
        })
        .catch(console.error)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values, fileNames, onImagesChange]
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files) processFiles(e.dataTransfer.files)
  }

  const handleRemove = (index: number) => {
    const newUrls = values.filter((_, i) => i !== index)
    const newNames = fileNames.filter((_, i) => i !== index)
    onImagesChange(newUrls, newNames)
  }

  const canAddMore = values.length < MAX_IMAGES

  return (
    <div className="space-y-1.5">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {values.length === 0 ? (
        // Empty state — full drop zone
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={cn(
            'cursor-pointer rounded-xl border-2 border-dashed p-10 flex flex-col items-center gap-4 transition-all',
            'border-stone-200 hover:border-stone-300 bg-stone-50/50 hover:bg-stone-50'
          )}
        >
          <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-stone-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-stone-700 mb-1">Upload room photos</p>
            <p className="text-xs text-stone-400">
              Drag & drop or click · up to {MAX_IMAGES} photos · JPG, PNG, WEBP
            </p>
          </div>
        </div>
      ) : (
        // Grid of uploaded photos + optional "add more" slot
        <div className="grid grid-cols-2 gap-2">
          {values.map((url, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden border border-stone-200 group aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Room ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors" />
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/90 border border-stone-200 flex items-center justify-center shadow-sm text-stone-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="w-3 h-3" />
              </button>
              {i === 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900/50 to-transparent px-2 py-1.5">
                  <p className="text-[10px] text-white/90 font-medium">Primary · used for AI analysis</p>
                </div>
              )}
            </div>
          ))}

          {canAddMore && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="aspect-[4/3] rounded-xl border-2 border-dashed border-stone-200 hover:border-stone-300 bg-stone-50 hover:bg-stone-100 flex flex-col items-center justify-center gap-2 transition-all text-stone-400 hover:text-stone-500"
            >
              <Plus className="w-5 h-5" />
              <span className="text-xs font-medium">Add photo</span>
              <span className="text-[10px] text-stone-400">{values.length}/{MAX_IMAGES}</span>
            </button>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1.5">{error}</p>
      )}
    </div>
  )
}
