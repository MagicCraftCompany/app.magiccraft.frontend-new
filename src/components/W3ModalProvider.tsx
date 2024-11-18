// import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
// import { PropsWithChildren } from 'react'
// import { configureChains, createConfig, WagmiConfig } from 'wagmi'

// import {
//   arbitrum,
//   avalanche,
//   bsc,
//   fantom,
//   gnosis,
//   mainnet,
//   optimism,
//   polygon,
// } from 'wagmi/chains'
// import { Web3Modal } from '@web3modal/react'
// import { useAccount } from 'wagmi'
// import store, { isDisabledLoginOnConnect } from '@/services/state/store'
// import { getAccount, signMessage } from '@wagmi/core'
// import { AUTH_TOKEN_LOCAL_STORAGE_KEY, LOGIN_SIGN_MSG } from '@/lib/constants'
// import { login } from '@/services/api/utils/auth'
// import { getCurrentUser } from '@/services/api/utils/user'
// import { setUser } from '@/services/state/currentUser/currentUserSlice'
// import wombat from '../assets/wallets/wombat.webp'
// import { sleep } from '@/lib/utils'

// // 1. Get projectID at https://cloud.walletconnect.com
// const projectId = '9a5fbacd6fe4bbba1b1bcf56a6f0ef89'

// // 2. Configure wagmi client
// const chains = [
//   bsc,
//   mainnet,
//   polygon,
//   avalanche,
//   arbitrum,
//   gnosis,
//   optimism,
//   fantom,
// ]

// // const { provider } = configureChains(chains, [w3mProvider({ projectId })]);

// const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: w3mConnectors({
//     chains,
//     projectId,
//   }),
//   publicClient,
// })

// // 3. Configure modal ethereum client
// const ethereumClient = new EthereumClient(wagmiConfig, chains)
// export default function W3ModalProvider({ children }: PropsWithChildren) {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const isWombat = (window as any).ethereum?.isWombat as boolean

//   return (
//     <>
//       <Web3Modal
//         themeVariables={{
//           '--w3m-z-index': '10000',
//         }}
//         // themeColor="blue"
//         projectId={projectId}
//         ethereumClient={ethereumClient}
//         defaultChain={bsc}
//         walletImages={
//           isWombat
//             ? {
//                 metaMask: wombat,
//               }
//             : undefined
//         }
//       />
//       <WagmiConfig config={wagmiConfig}>
//         <ConnectHandler />
//         {children}
//       </WagmiConfig>
//     </>
//   )
// }

// function ConnectHandler() {
//   useAccount({
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     onConnect: async ({ address }) => {
//       setTimeout(async () => {
//         if (isDisabledLoginOnConnect()) {
//           return

//           // fail case : connect wallet at register page and refresh site .. you will be prompted for login
//         }
//         console.log('on connect handler')

//         try {
//           await loginCallback({})
//         } catch {
//           console.log('in catch block')
//         }
//       }, 0)
//     },
//     onDisconnect: () => {
//       // onDisconnect?.();
//     },
//   })

//   return <></>
// }
// export async function getUser() {
//   try {
//     const user = await getCurrentUser()
//     store.dispatch(setUser(user))
//     return true
//   } catch (e) {}

//   return false
// }

// export async function loginCallback({
//   afterLogin,
// }: {
//   afterLogin?: () => void
// }) {
//   if (localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY)) {
//     if (await getUser()) return
//   }

//   // const account = getAccount()
//   if (!account.address) return

//   await sleep(1500)
//   try {
//     const signed = await signMessage({
//       message: LOGIN_SIGN_MSG,
//     })

//     await login(account.address, signed)

//     await getUser()

//     await afterLogin?.()
//   } catch (err: any) {
//     console.log(err)
//   }
// }



