'use client'

import { SiFacebook, SiGithub, SiInstagram } from 'react-icons/si'
import Link from 'next/link'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

const externalLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/virallinkup',
    icon: <SiFacebook className="mr-2 h-4 w-4" />
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/virallinkup_services',
    icon: <SiInstagram className="mr-2 h-4 w-4" />
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Osama-Qonaibe',
    icon: <SiGithub className="mr-2 h-4 w-4" />
  }
]

export function ExternalLinkItems() {
  return (
    <>
      {externalLinks.map(link => (
        <DropdownMenuItem key={link.name} asChild>
          <Link href={link.href} target="_blank" rel="noopener noreferrer">
            {link.icon}
            <span>{link.name}</span>
          </Link>
        </DropdownMenuItem>
      ))}
    </>
  )
}
