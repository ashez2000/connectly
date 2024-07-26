import { Prisma } from '@prisma/client'

/** Fields required for post display on feeds */
export const postDisplayInclude = {
  user: {
    select: {
      username: true,
      displayName: true,
      avatarUrl: true,
    },
  },
} satisfies Prisma.PostInclude

export type PostDisplay = Prisma.PostGetPayload<{
  include: typeof postDisplayInclude
}>

export type PostsPage = {
  posts: PostDisplay[]
  nextCursor: string | null
}
