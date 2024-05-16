// hook which only runs once
import { useEffect } from 'react'

export const legalBannerKey = 'legalBannerDismissed'

export const useOnceEver = (
  key: string,
  fn: (setAsExecuted: () => void) => void | (() => void),
  dependencies: unknown[]
) => {
  useEffect(() => {
    const hasRun = localStorage.getItem(key)
    if (!hasRun) {
      return fn(() => localStorage.setItem(key, 'true'))
    }
  }, dependencies)
}
