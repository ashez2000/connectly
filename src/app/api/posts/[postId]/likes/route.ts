import { validateRequest } from '@/lib/lucia'
import prisma, { LikeInfo } from '@/lib/prisma'

type Params = { params: { postId: string } }
type Handler = (req: Request, params: Params) => any

/**
 * Returns likes count and if liked by cur user
 * @route GET /api/posts/{postId}/likes
 */
export const GET: Handler = async (req, { params: { postId } }) => {
  try {
    const { user: curUser } = await validateRequest()
    if (!curUser) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        likes: {
          where: {
            userId: curUser.id,
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    })

    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 })
    }

    const data: LikeInfo = {
      likes: post._count.likes,
      isLikedByUser: !!post.likes.length,
    }

    return Response.json(data)
  } catch (err) {
    console.error(err)
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

/**
 * Like a post
 * @route POST /api/posts/{postId}/likes
 */
export const POST: Handler = async (req, { params: { postId } }) => {
  try {
    const { user: curUser } = await validateRequest()
    if (!curUser) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    })

    if (!post) {
      return Response.json({ message: 'Post not found' }, { status: 404 })
    }

    prisma.like.upsert({
      where: {
        userId_postId: {
          userId: curUser.id,
          postId: postId,
        },
      },
      create: {
        userId: curUser.id,
        postId: postId,
      },
      update: {},
    })

    return new Response()
  } catch (err) {
    console.error(err)
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

/**
 * Unlike a post
 * @route DELETE /api/posts/{postId}/likes
 */
export const DELETE: Handler = async (req, { params: { postId } }) => {
  try {
    const { user: curUser } = await validateRequest()
    if (!curUser) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await prisma.like.deleteMany({
      where: {
        userId: curUser.id,
        postId: postId,
      },
    })

    return new Response()
  } catch (err) {
    console.error(err)
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
