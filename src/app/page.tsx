import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <main>
      <Button asChild>
        <Link href="/signup">signup</Link>
      </Button>
    </main>
  )
}
