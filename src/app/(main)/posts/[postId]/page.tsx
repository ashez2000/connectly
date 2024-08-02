import { notFound } from 'next/navigation'

import { validateRequest } from '@/lib/lucia'
import prisma, { postDisplayInclude } from '@/lib/prisma'
import PostCard from '@/components/post/post-card'

type Props = {
  params: {
    postId: string
  }
}

export default async function Page({ params: { postId } }: Props) {
  const { user } = await validateRequest()
  const post = await fetchPost(postId)

  if (!user) {
    return (
      <p className="text-destructive">
        You&apos;re not authorized to view this page.
      </p>
    )
  }

  return (
    <div>
      <PostCard post={post} />
    </div>
  )
}

const fetchPost = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: postDisplayInclude,
  })

  if (!post) {
    notFound()
  }

  return post
}
