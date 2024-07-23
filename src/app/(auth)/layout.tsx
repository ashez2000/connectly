import { validateRequest } from '@/lib/lucia'
import { redirect } from 'next/navigation'

type Props = { children: React.ReactNode }

export default async function Layout({ children }: Props) {
  const { user } = await validateRequest()

  if (user) {
    redirect('/')
  }

  return <>{children}</>
}
