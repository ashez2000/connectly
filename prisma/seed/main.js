import { PrismaClient } from '@prisma/client'
import { users } from './users.js'
import { posts } from './posts.js'

const prisma = new PrismaClient()

const clearDb = async () => {
  await prisma.post.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()
}

const main = async () => {
  await clearDb()

  await prisma.user.createMany({
    data: users,
  })

  await prisma.post.createMany({
    data: posts,
  })

  await prisma.$disconnect()

  console.log('seed complete')
}

main()
