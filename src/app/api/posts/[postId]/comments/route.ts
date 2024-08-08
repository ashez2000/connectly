import { validateRequest } from '@/lib/lucia'
import prisma from '@/lib/prisma'

type Params = { params: { postId: string } }
type Handler = (req: Request, params: Params) => any

/**
 * Get all comments for post
 * @route GET /api/posts/{postId}/comments
 */
export const GET: Handler = async (req, { params: { postId } }) => {
  try {
    const { user: curUser } = await validateRequest()
    if (!curUser) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    })

    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 })
    }

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            username: true,
            displayName: true,
          },
        },
      },
    })

    return Response.json(comments)
  } catch (err) {
    console.error(err)
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

/**
 * Create new comment
 * @route POST /api/posts/{postId}/comments
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
      return Response.json({ error: 'Post not found' }, { status: 404 })
    }

    const { content } = await req.json()

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId: curUser.id,
      },
      include: {
        user: {
          select: {
            username: true,
            displayName: true,
          },
        },
      },
    })

    return Response.json(comment)
  } catch (err) {
    console.error(err)
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
