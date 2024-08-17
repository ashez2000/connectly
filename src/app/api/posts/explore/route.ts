import { NextRequest } from 'next/server'
import { validateRequest } from '@/lib/lucia'
import prisma, { getPostDataInclude } from '@/lib/prisma'

const PAGE_SIZE = 8

export const GET = async (req: NextRequest) => {
  try {
    const { user } = await validateRequest()
    if (!user) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const cursor = req.nextUrl.searchParams.get('cursor') || undefined
    const search = req.nextUrl.searchParams.get('search') || ''

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            content: { contains: search },
          },
          {
            user: {
              username: { contains: search },
            },
          },
          {
            user: {
              displayName: { contains: search },
            },
          },
        ],
      },
      include: getPostDataInclude(user.id),
      orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
      take: PAGE_SIZE,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
    })

    const nextCursor = posts.at(-1)?.id

    const data = {
      posts,
      nextCursor,
    }

    return Response.json(data)
  } catch (err) {
    console.error(err)
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
