import Link from 'next/link'

import { PostDisplay } from '@/lib/prisma'
import { toRelativeDateFormat } from '@/lib/utils'

import PostDeleteBtn from './post-delete-btn'
import { Button } from '../ui/button'

type Props = {
  post: PostDisplay
}

export default function PostCard({ post }: Props) {
  return (
    <article className="space-y-3 p-3 border border-black rounded">
      <div>
        {post.user.displayName} @{post.user.username}
        <br />
        {toRelativeDateFormat(new Date(post.createdAt))}
      </div>
      <div>{post.content}</div>
      <div className="space-x-3">
        <PostDeleteBtn id={post.id} />
        <Button variant="secondary" size="sm" asChild>
          <Link href={`/posts/${post.id}`}>View</Link>
        </Button>
      </div>
    </article>
  )
}
