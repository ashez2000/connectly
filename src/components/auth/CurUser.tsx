'use client'

import { useSession } from '@/providers/session-provider'

export default function CurUser() {
  const { user } = useSession()
  return (
    <div>
      <p className="text-sm text-slate-500">Logged In as</p>
      <p>
        {user.displayName} @{user.username}
      </p>
    </div>
  )
}
