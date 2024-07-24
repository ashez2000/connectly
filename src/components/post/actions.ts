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
