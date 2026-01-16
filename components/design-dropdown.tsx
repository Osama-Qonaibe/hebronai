'use client'

import { useState } from 'react'

import { Palette } from 'lucide-react'

import { DesignTool } from '@/lib/types/tools'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface DesignDropdownProps {
  disabled?: boolean
  onSelect?: (tool: DesignTool) => void
}

const designTools = [
  {
    id: 'canva' as DesignTool,
    icon: '🎨',
    label: 'Canva Design',
    description: 'AI-powered design assistant'
  },
  {
    id: 'figma' as DesignTool,
    icon: '🖌️',
    label: 'Figma to Code',
    description: 'Convert designs to code'
  },
  {
    id: 'screenshot' as DesignTool,
    icon: '📸',
    label: 'Screenshot to Design',
    description: 'Clone any design'
  },
  {
    id: 'logo' as DesignTool,
    icon: '✨',
    label: 'Logo Generator',
    description: 'Create professional logos'
  }
]

export function DesignDropdown({
  disabled,
  onSelect
}: DesignDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTool, setSelectedTool] = useState<DesignTool | null>(null)

  const handleSelect = (tool: DesignTool) => {
    setSelectedTool(tool)
    onSelect?.(tool)
    setTimeout(() => setSelectedTool(null), 2000)
  }

  const isActive = isOpen || selectedTool !== null

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
          <Palette className="size-3.5 mr-1.5" />
          <span className="text-xs font-medium">Design</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {designTools.map(tool => (
          <DropdownMenuItem
            key={tool.id}
            onClick={() => handleSelect(tool.id)}
            className="cursor-pointer"
          >
            <span className="text-lg mr-2">{tool.icon}</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{tool.label}</span>
              <span className="text-xs text-muted-foreground">
                {tool.description}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
