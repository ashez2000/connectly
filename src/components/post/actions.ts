'use server'

import { validateRequest } from '@/lib/lucia'
import prisma from '@/lib/prisma'

export const createPost = async (content: string) => {
  const { user } = await validateRequest()
  if (!user) {
    throw new Error('Unauthorized')
  }

  await prisma.post.create({
    data: { content, userId: user.id },
  })
}

export const deletePost = async (id: string) => {
  const { user } = await validateRequest()
  if (!user) {
    throw new Error('Unauthorized')
  }

  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) {
    throw new Error('Post not found')
  }

  if (post.userId !== user.id) {
    throw new Error('Unauthorized to delete post')
  }

  await prisma.post.delete({ where: { id } })
}
