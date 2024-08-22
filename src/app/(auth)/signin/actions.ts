'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'

import prisma from '@/lib/prisma'
import { lucia } from '@/lib/lucia'
import { signinSchema, SigninInput } from '@/schemas/auth'

export const signin = async (input: SigninInput) => {
  try {
    const { username, password } = signinSchema.parse(input)

    const user = await prisma.user.findUnique({ where: { username } })
    if (!user || !user.passwordHash) {
      return { error: 'Invalid username or password' }
    }

    const isMatch = await bcrypt.compareSync(password, user.passwordHash)
    if (!isMatch) {
      return { error: 'Invalid username or password' }
    }

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return redirect('/')
  } catch (err) {
    console.error('signin:action', err)
    return {
      error: 'Something went wrong',
    }
  }
}
