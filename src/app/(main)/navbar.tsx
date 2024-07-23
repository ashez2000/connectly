'use client'

import Link from 'next/link'

import { logout } from '@/app/(auth)/actions'
import SearchField from '@/components/seach-field'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <header className="border border-black rounded p-3">
      <div className="flex items-center gap-3">
        <Button asChild>
          <Link href="/">home</Link>
        </Button>
        <SearchField />
        <Button
          onClick={() => {
            logout()
          }}
        >
          logout
        </Button>
      </div>
    </header>
  )
}
