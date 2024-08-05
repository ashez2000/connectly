'use client'

import { Session, User } from 'lucia'
import { createContext, useContext } from 'react'

type ServerSession = {
  user: User
  session: Session
}

const SessionContext = createContext<ServerSession | null>(null)

export const SessionProvider = (
  props: React.PropsWithChildren<{ value: ServerSession }>
) => {
  return (
    <SessionContext.Provider value={props.value}>
      {props.children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}
