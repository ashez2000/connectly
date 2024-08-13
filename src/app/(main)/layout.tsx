import { validateRequest } from '@/lib/lucia'
import { redirect } from 'next/navigation'

import { SessionProvider } from '@/providers/session-provider'
import Navbar from './navbar'
import CurUser from '@/components/auth/CurUser'

type Props = { children: React.ReactNode }

export default async function Layout({ children }: Props) {
  const session = await validateRequest()

  if (!session.user) {
    redirect('/signin')
  }

  return (
    <SessionProvider value={session}>
      <div className="max-w-5xl mx-auto mt-5 p-3 space-y-3">
        <div className="grid grid-cols-5 gap-3">
          <Navbar />
          <main className="col-span-3">{children}</main>
          <aside>
            <CurUser />
          </aside>
        </div>
      </div>
    </SessionProvider>
  )
}
