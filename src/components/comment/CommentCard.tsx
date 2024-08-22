'use client'

import { useSession } from '@/providers/session-provider'
import CommentDeleteBtn from './CommentDeleteBtn'

type Props = {
  comment: {
    id: string
    content: string
    postId: string
    userId: string
    user: {
      username: string
    }
  }
}

export default function CommentCard({ comment }: Props) {
  const { user } = useSession()

  return (
    <div className="flex justify-between items-center gap-3">
      <p>
        <span className="font-semibold">@{comment.user.username}</span> {comment.content}
      </p>
      {comment.userId === user.id && <CommentDeleteBtn postId={comment.postId} commentId={comment.id} />}
    </div>
  )
}
