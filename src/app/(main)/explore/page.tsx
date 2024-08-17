'use client'

import { Input } from '@/components/ui/input'
import ExploreFeed from './explore-feed'
import { useEffect, useState } from 'react'

export default function Page() {
  const [search, setSearch] = useState('')
  const [_search, _setSearch] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => _setSearch(search), 300)
    return () => clearTimeout(timeoutId)
  }, [search])

  return (
    <div className="space-y-3 max-w-md mx-auto">
      <div className="mb-3">
        <Input
          value={search}
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ExploreFeed search={_search} />
    </div>
  )
}
