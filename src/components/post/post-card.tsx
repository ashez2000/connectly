import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

import { PostDisplay } from '@/lib/prisma'
import { toRelativeDateFormat } from '@/lib/utils'

import { useSession } from '@/providers/session-provider'
import LikeBtn from './like-btn'

type Props = {
  post: PostDisplay
}

export default function PostCard({ post }: Props) {
  const { user } = useSession()

  return (
    <article className="space-y-3 p-3 border border-slate-400 rounded">
      <div className="text-sm text-slate-700">
        <Link href={`/users/${post.user.username}`}>
          {post.user.displayName} @{post.user.username} .{' '}
        </Link>
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
        <span className="px-1">.</span>
        <Link href={`/posts/${post.id}`}>
          <div className="flex items-center gap-3">
            <MessageCircle className="size-5" /> comments
          </div>
        </Link>
      </div>
    </article>
  )
}
