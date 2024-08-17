'use client'

import Link from 'next/link'

import { logout } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <header className="">
      <div className="flex flex-col gap-3">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button asChild>
          <Link href="/posts/create">New Post</Link>
        </Button>
        <Button asChild>
          <Link href="/explore">Explore</Link>
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            logout()
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  )
}
