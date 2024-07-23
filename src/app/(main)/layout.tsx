import { validateRequest } from '@/lib/lucia'
import { redirect } from 'next/navigation'

import { SessionProvider } from '@/providers/session-provider'

type Props = { children: React.ReactNode }

export default async function Layout({ children }: Props) {
  const session = await validateRequest()

  if (!session.user) {
    redirect('/login')
  }

  return <SessionProvider value={session}>{children}</SessionProvider>
}
