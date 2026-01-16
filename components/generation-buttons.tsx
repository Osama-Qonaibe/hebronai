'use client'

import { useState } from 'react'

import { Globe, Image, Mic, Video } from 'lucide-react'

import { GenerationMode } from '@/lib/types/generation'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface GenerationButtonsProps {
  disabled?: boolean
  onSelect?: (mode: GenerationMode) => void
}

export function GenerationButtons({
  disabled,
  onSelect
}: GenerationButtonsProps) {
  const [selectedMode, setSelectedMode] = useState<GenerationMode>('text')

  const handleModeSelect = (mode: GenerationMode) => {
    setSelectedMode(mode)
    onSelect?.(mode)
  }

  const buttons = [
    { mode: 'image' as GenerationMode, icon: Image, label: 'Image' },
    { mode: 'audio' as GenerationMode, icon: Mic, label: 'Audio' },
    { mode: 'video' as GenerationMode, icon: Video, label: 'Video' },
    { mode: 'webapp' as GenerationMode, icon: Globe, label: 'App' }
  ]

  return (
    <div className="flex items-center gap-1">
      {buttons.map(({ mode, icon: Icon, label }) => (
        <Button
          key={mode}
          type="button"
          variant={selectedMode === mode ? 'default' : 'ghost'}
          size="icon"
          className={cn(
            'size-8 rounded-full',
            selectedMode === mode && 'bg-primary text-primary-foreground'
          )}
          disabled={disabled}
          onClick={() => handleModeSelect(mode)}
          title={`Generate ${label}`}
        >
          <Icon className="size-4" />
        </Button>
      ))}
    </div>
  )
}
