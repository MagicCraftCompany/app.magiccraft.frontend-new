// import { useAccount, useConnect } from 'wagmi'
// // import { connect } from '@wagmi/core'
// import { useWeb3Modal } from '@web3modal/react'
// import { MoonLoader } from 'react-spinners'
// import {
//   isDisabledLoginOnConnect,
//   setDisableLoginOnConnect,
//   useAppSelector,
// } from '@/services/state/store'
// import { useState } from 'react'
// import { loginCallback } from '../W3ModalProvider'
// // import { InjectedConnector } from 'wagmi/connectors/injected'
// import { cn, getMetamaskEthereum, sleep } from '@/lib/utils'
// import { setModal } from '@/components/Modal/Modal'
// import wombat from '../../assets/wallets/wombat.webp'
// import ovioImg from '../../assets/ovio.png'
// import {
//   connectWithOvio,
//   isOvioWalletUser,
//   getIsUserConnected,
// } from 'ovio-gg-web3'
// // import { throwSignMessageAndLoginOvio } from '../../services/ovio'
// import { throwSnack } from '../SnackBar/SnackSimple'
// import { Link } from 'react-router-dom'
// // import useLocalStorage from '../../hooks/useLocalStorage'
// // import { LOCAL_STORAGE_LOGGING_IN_OVIO } from '../../utils/constants'
// // import { TailButton } from '../Button/TailBtn'
// import { LuWallet } from 'react-icons/lu'

// export function ConnectWalletBtn({
//   withLogin = false,
//   render,
//   onConnect,
//   onDisconnect,
//   label,
//   className,
// }: {
//   withLogin?: boolean
//   render?: (props: { loading: boolean; onOpen: () => void }) => JSX.Element
//   onConnect?: (props: { address: string }) => void
//   onDisconnect?: () => void
//   label?: string
//   className?: string
// }) {
//   // todo allow injected wallet connection for phones
//   const [loading, setLoading] = useState(false)
//   const user = useAppSelector((state) => state.currentUser.user)
//   const { address, isConnecting } = useAccount({
//     onConnect: async ({ address }) => {
//       // console.log(label, onConnect);
//       // if (address) {
//       //   onConnect?.({ address });
//       // }

//       if (isDisabledLoginOnConnect()) {
//         setLoading(false)
//       }
//     },
//     onDisconnect: () => {
//       onDisconnect?.()
//     },
//   })
//   const { isOpen, open, close } = useWeb3Modal()
//   // const navigate = useNavigate()
//   // const [loggingInOvio, setLoggingInOvio] = useLocalStorage(
//   //   LOCAL_STORAGE_LOGGING_IN_OVIO,
//   //   false
//   // )

//   const connector = useConnect({
//     // chainId: 56,
//     onError: (error: any) => {
//       if (error.name === 'ConnectorNotFoundError') {
//         throwSnack('error', 'No metamask connector found')
//       } else {
//         throwSnack('error', error.details)
//       }
//     },
//     connector: new InjectedConnector({
//       options: {
//         name: (detectedName: string | string[]) =>
//           `Browser wallet (${
//             typeof detectedName === 'string'
//               ? detectedName
//               : detectedName.join(', ')
//           })`,
//       },
//       onError: (error: any) => {
//         if (error.name === 'ConnectorNotFoundError') {
//           throwSnack('error', 'No metamask connector found')
//         } else {
//           throwSnack('error', error.details)
//         }
//       },
//     }),
//   })

//   function onOpen() {
//     //@ts-ignore
//     const isWombat = window.ethereum?.isWombat as boolean
//     // const isWombat = false;

//     const isBrowserWallet = getMetamaskEthereum()

//     setModal({
//       title: 'Connect wallet',
//       content: ({ onClose }) => {
//         return (
//           <div className="flex flex-col items-stretch justify-center gap-4">
//             {connector.connectors.length && !address ? (
//               <TailButton
//                 variant={'secondary'}
//                 className="h-14"
//                 onClick={() => {
//                   onClose()

//                   const connect = async () => {
//                     const res = await connector.connectAsync({ connector: connector.connectors[0] })
//                     onConnect?.({ address: res.accounts[0] })
//                   }

//                   if (!withLogin) {
//                     setDisableLoginOnConnect(true)

//                     connect()

//                     setTimeout(() => {
//                       setDisableLoginOnConnect(false)
//                     }, 1000)
//                   } else {
//                     connect()
//                   }
//                 }}
//               >
//                 {isWombat ? (
//                   <>
//                     <div className="flex items-center gap-4">
//                       <img className="w-16" src={wombat} />
//                       <span>Wombat</span>
//                     </div>
//                   </>
//                 ) : (
//                   connector.connectors[0]?.name || 'Browser wallet'
//                 )}
//               </TailButton>
//             ) : null}
//             <TailButton
//               className="h-14"
//               variant={'secondary'}
//               onClick={() => {
//                 onClose()
//                 open()
//               }}
//             >
//               Wallet Connect
//             </TailButton>
//             {withLogin && (
//               <TailButton
//                 variant={'secondary'}
//                 className="h-14"
//                 onClick={async () => {
//                   if (getIsUserConnected()) {
//                     if (!(await isOvioWalletUser())) {
//                       throwSnack('error', 'User is not user of Ovio Wallet')
//                       return
//                     }
//                     throwSignMessageAndLoginOvio()
//                   } else {
//                     setLoggingInOvio(true)
//                     sleep(100)
//                     connectWithOvio()
//                   }
//                 }}
//               >
//                 <img className="h-8" src={ovioImg} />
//               </TailButton>
//             )}
//             {withLogin && (
//               <Link className="contents" to="/register">
//                 <button
//                   onClick={onClose}
//                   className="h-14"
//                 >
//                   Register
//                 </TailButton>
//               </Link>
//             )}
//           </div>
//         )
//       },
//     })
//   }

//   if (render) {
//     return render({ loading, onOpen })
//   }

//   if (isConnecting && isOpen) {
//     return (
//       <TailButton className={className} onClick={close}>
//         <MoonLoader
//           size={'15px'}
//           loading={true}
//           color="#fff"
//           className="loader"
//         />
//       </TailButton>
//     )
//   }

//   return (
//     <>
//       <TailButton
//         className={cn(className, 'font-sans')}
//         loading={loading}
//         onClick={
//           address && !user && withLogin ? () => loginCallback({}) : onOpen
//         }
//       >
//         <div className="flex items-center gap-2">
//           <LuWallet />
//           {label || 'Login'}
//         </div>
//       </TailButton>
//     </>
//   )
// }

// export function useConnectWallet() {}

