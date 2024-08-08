'use client'

import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import CommentCard from './CommentCard'

type Props = {
  postId: string
}

type Comment = {
  id: string
  content: string
  postId: string
  userId: string
  user: {
    username: string
  }
}

export default function CommentList({ postId }: Props) {
  const { isLoading, data } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => {
      return ky.get(`/api/posts/${postId}/comments`).json<Comment[]>()
    },
  })

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div className="space-y-3">
        {data?.map((c) => (
          <CommentCard key={c.id} comment={c} />
        ))}
      </div>
    </div>
  )
}
