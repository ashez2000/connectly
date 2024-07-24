import { validateRequest } from '@/lib/lucia'
import prisma from '@/lib/prisma'

export const GET = async () => {
  try {
    const { user } = await validateRequest()
    if (!user) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const posts = await prisma.post.findMany({})

    return Response.json(posts)
  } catch (err) {
    console.error(err)
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
