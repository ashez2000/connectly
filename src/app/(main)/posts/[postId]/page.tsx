import { notFound } from 'next/navigation'

import { validateRequest } from '@/lib/lucia'
import prisma, { getPostDataInclude } from '@/lib/prisma'
import { toRelativeDateFormat } from '@/lib/utils'
import PostDeleteBtn from '@/components/post/post-delete-btn'
import LikeBtn from '@/components/post/like-btn'
import CommentForm from '@/components/comment/CommentForm'
import CommentList from '@/components/comment/CommentList'

type Props = {
  params: {
    postId: string
  }
}

export default async function Page({ params: { postId } }: Props) {
  const { user } = await validateRequest()
  if (!user) {
    throw Error('Unauthorized')
  }

  const post = await fetchPost(postId, user.id)

  if (!user) {
    return <p className="text-destructive">You&apos;re not authorized to view this page.</p>
  }

  return (
    <div className="mt-3">
      <div className="text-sm text-zinc-600 mb-3">
        {post.user.displayName} @{post.user.username} . {toRelativeDateFormat(new Date(post.createdAt))}
      </div>
      <div>{post.content}</div>
      <br />
      <div className="flex space-x-3">
        <LikeBtn
          postId={post.id}
          initialState={{
            likes: post._count.likes,
            isLikedByUser: post.likes.some((like) => like.userId === user.id),
          }}
        />
        {post.userId === user.id && <PostDeleteBtn id={post.id} />}
      </div>

      <hr className="h-[2px] my-8 bg-black mb-3" />

      <CommentForm postId={post.id} />

      <hr className="h-[2px] my-8 bg-black mb-3" />

      <h2 className="mb-3">Comments</h2>

      <CommentList postId={postId} />
    </div>
  )
}

const fetchPost = async (postId: string, curUserId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: getPostDataInclude(curUserId),
  })

  if (!post) {
    notFound()
  }

  return post
}
