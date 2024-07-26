import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDate, formatDistanceToNowStrict } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Converts a date to relative date for display */
export const toRelativeDateFormat = (from: Date): string => {
  const curDate = new Date()

  if (curDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000 /* 24 hrs */) {
    return formatDistanceToNowStrict(from, { addSuffix: true })
  }

  if (curDate.getFullYear() === from.getFullYear()) {
    return formatDate(from, 'MMM d')
  }

  return formatDate(from, 'MMM d, yyyy')
}
