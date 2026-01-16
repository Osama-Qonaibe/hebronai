'use client'

import React, { useRef, useState } from 'react'

import { Code, FileText, Image, Loader2, Paperclip, X } from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface FileUploadProps {
  onUploadComplete?: (files: string[]) => void
  disabled?: boolean
}

type FileType = 'document' | 'image' | 'code'

const FILE_TYPE_CONFIG = {
  document: {
    accept: '.pdf,.txt,.docx,.csv,.md',
    icon: FileText,
    label: 'Documents',
    description: 'PDF, TXT, DOCX, CSV, MD'
  },
  image: {
    accept: 'image/*',
    icon: Image,
    label: 'Images',
    description: 'JPG, PNG, WebP, GIF'
  },
  code: {
    accept: '.js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.go,.rs,.php,.rb,.swift',
    icon: Code,
    label: 'Code Files',
    description: 'JS, TS, PY, Java, etc.'
  }
}

export function FileUpload({ onUploadComplete, disabled }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [currentFileType, setCurrentFileType] = useState<FileType>('document')

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

  const handleFileTypeSelect = (type: FileType) => {
    setCurrentFileType(type)
    if (fileInputRef.current) {
      fileInputRef.current.accept = FILE_TYPE_CONFIG[type].accept
      fileInputRef.current.click()
    }
  }

  return (
    <>
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 mb-2">
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
              <Paperclip className="size-3 mr-1" />
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
        accept={FILE_TYPE_CONFIG[currentFileType].accept}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 px-3 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20 text-purple-600 dark:text-purple-400"
            disabled={disabled || uploading}
          >
            <Paperclip className="size-3.5 mr-1.5" />
            <span className="text-xs font-medium">Attach</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {(Object.keys(FILE_TYPE_CONFIG) as FileType[]).map(type => {
            const config = FILE_TYPE_CONFIG[type]
            const Icon = config.icon
            return (
              <DropdownMenuItem
                key={type}
                onClick={() => handleFileTypeSelect(type)}
                className="cursor-pointer"
              >
                <Icon className="size-4 mr-2" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{config.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {config.description}
                  </span>
                </div>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
