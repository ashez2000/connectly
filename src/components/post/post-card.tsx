import Link from 'next/link'

import { PostDisplay } from '@/lib/prisma'
import { toRelativeDateFormat } from '@/lib/utils'

import { useSession } from '@/providers/session-provider'
import { Button } from '../ui/button'
import LikeBtn from './like-btn'

type Props = {
  post: PostDisplay
}

export default function PostCard({ post }: Props) {
  const { user } = useSession()

  return (
    <article className="space-y-3 p-3 border border-slate-400 rounded">
      <div className="text-sm text-slate-700">
        {post.user.displayName} @{post.user.username} .{' '}
        {toRelativeDateFormat(new Date(post.createdAt))}
      </div>
      <div>{post.content}</div>
      <div className="flex space-x-3">
        <LikeBtn
          postId={post.id}
          initialState={{
            likes: post._count.likes,
            isLikedByUser: post.likes.some((like) => like.userId === user.id),
          }}
        />
        <Link href={`/posts/${post.id}`}>comments</Link>
      </div>
    </article>
  )
}
