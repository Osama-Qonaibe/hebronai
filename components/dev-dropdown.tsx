'use client'

import { useState } from 'react'

import { Code2 } from 'lucide-react'

import { DevTool } from '@/lib/types/tools'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface DevDropdownProps {
  disabled?: boolean
  onSelect?: (tool: DevTool) => void
}

const devTools = [
  {
    id: 'github' as DevTool,
    icon: '🐙',
    label: 'GitHub Manager',
    description: 'Manage repos & issues'
  },
  {
    id: 'gmail' as DevTool,
    icon: '📧',
    label: 'Gmail Assistant',
    description: 'Smart email automation'
  },
  {
    id: 'api' as DevTool,
    icon: '🔌',
    label: 'API Testing',
    description: 'Test REST APIs'
  },
  {
    id: 'deploy' as DevTool,
    icon: '🚀',
    label: 'Quick Deploy',
    description: 'Deploy to Vercel/Netlify'
  }
]

export function DevDropdown({ disabled, onSelect }: DevDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTool, setSelectedTool] = useState<DevTool | null>(null)

  const handleSelect = (tool: DevTool) => {
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
          <Code2 className="size-3.5 mr-1.5" />
          <span className="text-xs font-medium">Dev</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {devTools.map(tool => (
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
