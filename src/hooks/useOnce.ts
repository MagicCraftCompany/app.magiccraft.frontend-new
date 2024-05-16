// hook which only runs once
import { useEffect, useState } from 'react'

export const useOnce = (
  fn: (setAsExecuted: () => void) => void | (() => void),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: any[]
) => {
  const [hasRun, setHasRun] = useState(false)

  useEffect(() => {
    if (!hasRun) {
      return fn(() => setHasRun(true))
    }
  }, dependencies)
}
