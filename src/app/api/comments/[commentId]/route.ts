import { validateRequest } from '@/lib/lucia'
import prisma from '@/lib/prisma'

type Params = { params: { commentId: string } }
type Handler = (req: Request, params: Params) => any

/**
 * Delete comment
 * @route DELETE /api/comments/{commentId}
 */
export const DELETE: Handler = async (req, { params: { commentId } }) => {
  try {
    const { user: curUser } = await validateRequest()
    if (!curUser) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    })

    if (!comment) {
      return Response.json({ message: 'Comment not found' }, { status: 404 })
    }

    if (comment.userId !== curUser.id) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await prisma.comment.delete({
      where: { id: commentId },
    })

    return Response.json(comment)
  } catch (err) {
    console.error(err)
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
