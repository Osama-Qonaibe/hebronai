'use client'

import { useState } from 'react'

import { Sparkles } from 'lucide-react'

import { GenerationMode } from '@/lib/types/generation'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface GenerationDropdownProps {
  disabled?: boolean
  onSelect?: (mode: GenerationMode) => void
}

const generationOptions = [
  {
    mode: 'image' as GenerationMode,
    icon: '🖼️',
    label: 'Generate Image',
    description: 'DALL-E 3'
  },
  {
    mode: 'audio' as GenerationMode,
    icon: '🎵',
    label: 'Generate Audio',
    description: 'ElevenLabs'
  },
  {
    mode: 'video' as GenerationMode,
    icon: '🎬',
    label: 'Generate Video',
    description: 'Runway/Kling'
  },
  {
    mode: 'webapp' as GenerationMode,
    icon: '🌐',
    label: 'Generate Web App',
    description: 'v0.dev style'
  }
]

export function GenerationDropdown({
  disabled,
  onSelect
}: GenerationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMode, setSelectedMode] = useState<GenerationMode | null>(
    null
  )

  const handleSelect = (mode: GenerationMode) => {
    setSelectedMode(mode)
    onSelect?.(mode)
    setTimeout(() => setSelectedMode(null), 2000)
  }

  const isActive = isOpen || selectedMode !== null

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn(
            'h-8 px-3 rounded-full transition-all duration-200',
            isActive
              ? 'bg-green-500/10 hover:bg-green-500/20 border-green-500/30 text-green-600 dark:text-green-400'
              : 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20 text-purple-600 dark:text-purple-400'
          )}
          disabled={disabled}
        >
          <Sparkles className="size-3.5 mr-1.5" />
          <span className="text-xs font-medium">Generate</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {generationOptions.map(option => (
          <DropdownMenuItem
            key={option.mode}
            onClick={() => handleSelect(option.mode)}
            className="cursor-pointer"
          >
            <span className="text-lg mr-2">{option.icon}</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{option.label}</span>
              <span className="text-xs text-muted-foreground">
                {option.description}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
