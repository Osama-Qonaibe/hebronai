'use client'

import { Sparkles } from 'lucide-react'

import { GenerationMode } from '@/lib/types/generation'

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 rounded-full"
          disabled={disabled}
        >
          <Sparkles className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {generationOptions.map(option => (
          <DropdownMenuItem
            key={option.mode}
            onClick={() => onSelect?.(option.mode)}
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
