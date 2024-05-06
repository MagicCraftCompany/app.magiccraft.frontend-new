import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toPx(value: number | string) {
  if (value || value === 0) {
    return value + (typeof value === 'number' && value !== 0 ? 'px' : '')
  }
  return undefined
}
