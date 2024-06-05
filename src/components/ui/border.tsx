import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const borderVariants = cva('rounded-2xl w-fit', {
  variants: {
    variant: {
      epic: 'bg-gradient-to-b from-[#CD76E9] to-[#772EB8] text-white',
      rare: 'bg-gradient-to-b from-[#97B6FF] to-[#2358A3] text-white',
      legendary: 'bg-gradient-to-b from-[#DDBA56] to-[#E26B06] text-white',
    },
  },
  defaultVariants: {
    variant: 'epic',
  },
})

export interface BorderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof borderVariants> {}

function Border({ className, variant, children, ...props }: BorderProps) {
  return (
    <div className={cn(borderVariants({ variant }), className)} {...props}>
      {children}
    </div>
  )
}

export { Border, borderVariants }
