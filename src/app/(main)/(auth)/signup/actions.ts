'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'

import prisma from '@/lib/prisma'
import { lucia } from '@/lib/lucia'
import { SignupInput, signupSchema } from '@/schemas/auth'

export const signup = async (input: SignupInput) => {
  try {
    const { username, email, password } = signupSchema.parse(input)

    const emailTaken = await prisma.user.findUnique({ where: { email } })
    if (emailTaken) {
      return { error: 'Email already taken' }
    }

    const usernameTaken = await prisma.user.findUnique({ where: { username } })
    if (usernameTaken) {
      return { error: 'Username already taken' }
    }

    const passwordHash = bcrypt.hashSync(password)

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        displayName: username,
      },
    })

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return redirect('/')
  } catch (err) {
    console.error('signup:action', err)
    return {
      error: 'Something went wrong',
    }
  }
}
