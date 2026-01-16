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
          variant="outline"
          size="sm"
          className="h-8 px-3 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 hover:from-pink-500/20 hover:via-purple-500/20 hover:to-indigo-500/20 border-purple-500/20 text-purple-600 dark:text-purple-400"
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
