import { validateRequest } from '@/lib/lucia'
import { redirect } from 'next/navigation'

import { SessionProvider } from '@/providers/session-provider'
import Navbar from './navbar'

type Props = { children: React.ReactNode }

export default async function Layout({ children }: Props) {
  const session = await validateRequest()

  if (!session.user) {
    redirect('/login')
  }

  return (
    <SessionProvider value={session}>
      <div className="max-w-7xl mx-auto p-3 space-y-3">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  )
}
