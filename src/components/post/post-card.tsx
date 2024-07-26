import PostDeleteBtn from './post-delete-btn'
import { PostDisplay } from '@/lib/prisma'
import { toRelativeDateFormat } from '@/lib/utils'

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
      <div>
        <PostDeleteBtn id={post.id} />
      </div>
    </article>
  )
}
