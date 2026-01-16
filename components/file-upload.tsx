'use client'

import React, { useRef, useState } from 'react'
import { FileUp, Loader2, X } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onUploadComplete?: (files: string[]) => void
  disabled?: boolean
}

export function FileUpload({ onUploadComplete, disabled }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles(prev => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    if (files.length === 0) return

    setUploading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Files uploaded successfully')
      if (onUploadComplete) {
        onUploadComplete(files.map(f => f.name))
      }
      setFiles([])
    } catch (error) {
      toast.error('Failed to upload files')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full px-4 mb-2">
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-muted px-2 py-1 rounded-md text-xs border"
            >
              <span className="truncate max-w-[150px]">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <Button
            type="button"
            size="sm"
            onClick={uploadFiles}
            disabled={uploading}
            className="h-7 px-2 text-[10px]"
          >
            {uploading ? (
              <Loader2 className="size-3 animate-spin mr-1" />
            ) : (
              <FileUp className="size-3 mr-1" />
            )}
            Process
          </Button>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        className="hidden"
        accept=".pdf,.txt,.docx,.csv"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 rounded-full"
        disabled={disabled || uploading}
        onClick={() => fileInputRef.current?.click()}
      >
        <FileUp className="size-5 text-muted-foreground" />
      </Button>
    </div>
  )
}
