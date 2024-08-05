import { Prisma } from '@prisma/client'

/** Fields required for post display on feeds */
export const getPostDataInclude = (curUserId: string) => {
  return {
    user: {
      select: {
        username: true,
        displayName: true,
        avatarUrl: true,
      },
    },
    likes: {
      where: {
        userId: curUserId,
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
  } satisfies Prisma.PostInclude
}

export type PostDisplay = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>
}>

export type PostsPage = {
  posts: PostDisplay[]
  nextCursor: string | null
}

export type FollowerInfo = {
  followers: number
  isFollowedByUser: boolean
}

export type LikeInfo = {
  likes: number
  isLikedByUser: boolean
}
