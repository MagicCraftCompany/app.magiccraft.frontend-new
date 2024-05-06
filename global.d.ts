/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  ethereum?: {
    isMetaMask?: true
    isTrust?: true
    providers?: any[]
    request?: (...args: any[]) => Promise<void>
    setSelectedProvider: (provider: any) => Promise<void>
  }
}
