import { handler } from '@/lib/handler'
import { NextResponse } from 'next/server'

export const GET = handler(async (req, ctx) => {
  return NextResponse.json('OK')
})
