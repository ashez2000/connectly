import { validateRequest } from '@/lib/lucia'
import prisma, { FollowerInfo } from '@/lib/prisma'

type Params = { params: { userId: string } }
type Handler = (req: Request, params: Params) => any

/**
 * Returns follwers count of give userId along if curUser is following or not
 * @route GET /api/users/{userId}/followers
 */
export const GET: Handler = async (req, { params: { userId } }) => {
  try {
    const { user: curUser } = await validateRequest()
    if (!curUser) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followers: {
          where: {
            followerId: curUser.id,
          },
          select: {
            followerId: true,
          },
        },
        _count: {
          select: {
            followers: true,
          },
        },
      },
    })

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 })
    }

    const data: FollowerInfo = {
      followers: user._count.followers,
      isFollowedByUser: !!user.followers.length,
    }

    return Response.json(data)
  } catch (err) {
    console.error(err)
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

/**
 * Follow user
 * @route POST /api/users/{userId}/followers
 */
export const POST: Handler = async (req, { params: { userId } }) => {
  try {
    const { user: curUser } = await validateRequest()
    if (!curUser) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await prisma.follow.upsert({
      where: {
        followerId_followingId: {
          followerId: curUser.id,
          followingId: userId,
        },
      },
      create: {
        followerId: curUser.id,
        followingId: userId,
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
 * Unfollow user
 * @route DELETE /api/users/{userId}/followers
 */
export const DELETE: Handler = async (req, { params: { userId } }) => {
  try {
    const { user: curUser } = await validateRequest()
    if (!curUser) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await prisma.follow.deleteMany({
      where: {
        followerId: curUser.id,
        followingId: userId,
      },
    })

    return new Response()
  } catch (err) {
    console.error(err)
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
