import { NextRequest, NextResponse } from 'next/server'

/** Type for NextJs route handler */
export type HandlerFn<T> = (req: NextRequest, ctx: T) => Promise<NextResponse>

/** Simple wrapper around try/catch block for route handlers */
export function handler<T>(fn: HandlerFn<T>) {
  return (req: NextRequest, ctx: T) => {
    try {
      return fn(req, ctx)
    } catch (err) {
      console.error(err)
      return NextResponse.json('Internal Server Error')
    }
  }
}
