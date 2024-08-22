'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { lucia, validateRequest } from '@/lib/lucia'

export const logout = async () => {
  const { session } = await validateRequest()

  if (!session) {
    throw new Error('Unauthorized')
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect('/signin')
}
