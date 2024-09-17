import fs from 'node:fs'
import { PrismaClient } from '@prisma/client'

function readJson(name) {
  return JSON.parse(fs.readFileSync(`./data/${name}.json`, 'utf-8'))
}

const prisma = new PrismaClient()
const users = readJson('users')

async function clearDb() {
  await prisma.like.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.follow.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()
}

async function main() {
  await clearDb()
  await prisma.user.createMany({ data: users })
  await prisma.$disconnect()
}

main()
