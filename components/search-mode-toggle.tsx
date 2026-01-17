'use client'

import { useEffect, useState } from 'react'

import { Globe } from 'lucide-react'

import { cn } from '@/lib/utils'
import { getCookie, setCookie } from '@/lib/utils/cookies'

import { Button } from './ui/button'

export function SearchModeToggle() {
  const [isSearchMode, setIsSearchMode] = useState(true)

  useEffect(() => {
    const savedMode = getCookie('search-mode')
    if (savedMode !== null) {
      setIsSearchMode(savedMode === 'true')
    } else {
      setCookie('search-mode', 'true')
    }
  }, [])

  const handleToggle = () => {
    const newMode = !isSearchMode
    setIsSearchMode(newMode)
    setCookie('search-mode', newMode.toString())
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className={cn(
        'h-8 px-3 rounded-full transition-all duration-200',
        isSearchMode
          ? 'bg-green-500/10 hover:bg-green-500/20 border-green-500/30 text-green-600 dark:text-green-400'
          : 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/20 text-purple-600 dark:text-purple-400'
      )}
    >
      <Globe className="size-3.5 mr-1.5" />
      <span className="text-xs font-medium">Search</span>
    </Button>
  )
}
