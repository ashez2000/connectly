import { Post } from '@prisma/client'

type Props = {
  post: Post
}

export default function PostCard({ post }: Props) {
  return (
    <article>
      <code>{JSON.stringify(post)}</code>
    </article>
  )
}
