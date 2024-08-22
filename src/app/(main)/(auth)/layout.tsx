import { redirect } from 'next/navigation'
import { validateRequest } from '@/lib/lucia'

export default async function Layout({ children }: any) {
  const { user } = await validateRequest()

  if (user) {
    redirect('/')
  }

  return <main className="px-3 mt-36">{children}</main>
}
