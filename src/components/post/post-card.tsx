import { Post } from '@prisma/client'
import PostDeleteBtn from './post-delete-btn'

type Props = {
  post: Post
}

export default function PostCard({ post }: Props) {
  return (
    <article>
      <code>{JSON.stringify(post)}</code>
      <PostDeleteBtn id={post.id} />
    </article>
  )
}
