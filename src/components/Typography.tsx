import { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

export function TypographyH2({
  children,
  className,
}: { className?: string } & PropsWithChildren) {
  return (
    <h2
      className={cn(
        'text-balance bg-gradient-to-b from-white to-white/75 bg-clip-text text-center font-serif text-4xl text-transparent drop-shadow-xl',
        className
      )}
    >
      {children}
    </h2>
  )
}

export function TypographyH1({
  children,
  className,
}: { className?: string } & PropsWithChildren) {
  return (
    <h1
      className={cn(
        'text-balance bg-gradient-to-b from-white to-white/75 bg-clip-text text-center font-serif text-[54px] uppercase text-transparent drop-shadow-2xl  md:text-7xl',
        className
      )}
    >
      {children}
    </h1>
  )
}
