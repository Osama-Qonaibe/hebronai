'use client'

import { useState } from 'react'

import { TrendingUp } from 'lucide-react'

import { FinanceTool } from '@/lib/types/tools'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface FinanceDropdownProps {
  disabled?: boolean
  onSelect?: (tool: FinanceTool) => void
}

const financeTools = [
  {
    id: 'crypto' as FinanceTool,
    icon: '₿',
    label: 'Crypto Prices',
    description: 'Live cryptocurrency data'
  },
  {
    id: 'stocks' as FinanceTool,
    icon: '📈',
    label: 'Stock Market',
    description: 'Real-time stock analysis'
  },
  {
    id: 'currency' as FinanceTool,
    icon: '💱',
    label: 'Currency Exchange',
    description: 'Convert currencies'
  },
  {
    id: 'calculator' as FinanceTool,
    icon: '🧮',
    label: 'Financial Calculator',
    description: 'ROI, Interest, etc.'
  }
]

export function FinanceDropdown({
  disabled,
  onSelect
}: FinanceDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTool, setSelectedTool] = useState<FinanceTool | null>(null)

  const handleSelect = (tool: FinanceTool) => {
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
          <TrendingUp className="size-3.5 mr-1.5" />
          <span className="text-xs font-medium">Finance</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {financeTools.map(tool => (
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
