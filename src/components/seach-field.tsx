'use client'

import { useRouter } from 'next/navigation'
import { Input } from './ui/input'

/** SearchField for Navbar */
export default function SearchField() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget

    const q = (form.q as HTMLInputElement).value.trim()
    if (!q) return

    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    // progressive enhancement
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <Input placeholder="search" />
    </form>
  )
}
