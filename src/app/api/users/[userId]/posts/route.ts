import { NextRequest } from 'next/server'

import prisma, { getPostDataInclude } from '@/lib/prisma'
import { validateRequest } from '@/lib/lucia'

type Ctx = {
  params: {
    userId: string
  }
}

const PAGE_SIZE = 10

// route: GET /api/users/{userId}/posts
// returns posts associated with userId param
export async function GET(req: NextRequest, { params }: Ctx) {
  try {
    const { user } = await validateRequest()
    if (!user) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const cursor = req.nextUrl.searchParams.get('cursor') || undefined

    const posts = await prisma.post.findMany({
      where: {
        user: {
          id: params.userId,
        },
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
