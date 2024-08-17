import { PrismaClient } from '@prisma/client'
import { users } from './users.js'
import { posts } from './posts.js'
import { likes } from './likes.js'
import { comments } from './comments.js'
import { follow } from './follow.js'

const prisma = new PrismaClient()

const clearDb = async () => {
  await prisma.like.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.follow.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()
}

const main = async () => {
  await clearDb()

  await prisma.user.createMany({
    data: users,
  })

  await prisma.follow.createMany({
    data: follow,
  })

  await prisma.post.createMany({
    data: posts,
  })

  await prisma.like.createMany({
    data: likes,
  })

  await prisma.comment.createMany({
    data: comments,
  })

  await prisma.$disconnect()

  console.log('seed complete')
}

main()
