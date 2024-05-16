import { getMCRTPrice } from '@/services/api/utils/mcrt'
import { useQuery } from '@tanstack/react-query'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import BigNumber from 'bignumber.js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toPx(value: number | string) {
  if (value || value === 0) {
    return value + (typeof value === 'number' && value !== 0 ? 'px' : '')
  }
  return undefined
}

export const sleep = async (timeout: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

export const getMetamaskEthereum = (): unknown => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (window as any).ethereum
  }

  return undefined
}

export function useMcrtDollarValue(amount: BigNumber.Value) {
  const { data, isLoading } = useQuery({
    queryKey: ['mcrtPrice'],
    queryFn: async () => {
      const response = await getMCRTPrice()

      return response
    },
    staleTime: 180_000,
    refetchInterval: 180_000,
  })

  if (isLoading) {
    return undefined
  }

  if (!data) {
    return null
  }

  let usdValue = BigNumber(amount).times(data)

  if (BigNumber(amount).gt(1e9)) {
    usdValue = usdValue.div(1e9)
  }

  return usdValue.decimalPlaces(2)
}
