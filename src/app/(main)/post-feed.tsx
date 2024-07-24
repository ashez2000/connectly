'use client'

import { Post } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import PostCard from '@/components/post/post-card'

export default function PostFeed() {
  const query = useQuery<Post[]>({
    queryKey: ['post-feed'],
    queryFn: async () => {
      const res = await fetch('/api/posts/feed')
      if (!res.ok) {
        throw new Error('Request failed')
      }
      return res.json()
    },
  })

  if (query.isPending) {
    return <div>Loading ...</div>
  }

  if (query.error) {
    return <div> Error loading post feed</div>
  }

  return (
    <div className="space-y-3">
      {query.data.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  )
}
