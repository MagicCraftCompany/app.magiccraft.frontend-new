import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-1 text-sm font-semibold transition-colors',
  {
    variants: {
      variant: {
        epic: 'bg-gradient-to-b from-[#CD76E9] to-[#772EB8] text-white hover:bg-slate-900/80',
        rare: 'bg-gradient-to-b from-[#97B6FF] to-[#2358A3] text-white hover:bg-slate-900/80',
        legendary:
          'bg-gradient-to-b from-[#DDBA56] to-[#E26B06] text-white hover:bg-slate-900/80',
        discount:
          'bg-gradient-to-b from-[#24A151] to-[#4EAF71] text-white hover:bg-slate-900/80',
        mint: 'bg-[#4312694D] text-white',
      },
    },
    defaultVariants: {
      variant: 'epic',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
