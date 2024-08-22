import { Prisma } from '@prisma/client'

export function getUserProfileDataInclude(curUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true,
    createdAt: true,
    followers: {
      where: {
        followerId: curUserId,
      },
      select: {
        followerId: true,
      },
    },
    _count: {
      select: {
        posts: true,
        followers: true,
        following: true,
      },
    },
  } satisfies Prisma.UserSelect
}

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
        comments: true,
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
