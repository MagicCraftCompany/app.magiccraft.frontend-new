// import { setModal } from '@/components/Modal/Modal'
// import {
//   getOvioWalletUserAddress,
//   OvioWalletConnect,
//   // approveAndManageBalance,
// } from 'ovio-gg-web3'
// import { LOGIN_SIGN_MSG } from '@/lib/constants'
// import { login } from '../api/utils/auth'
// import { getUser } from '../components/W3ModalProvider'
// import { useState } from 'react'
// import { Input } from '../components/PasswordModal/PasswordModal.Styled'
// import { TailButton } from '../components/Button/TailBtn'

// export function throwSignMessageAndLoginOvio() {
//   setModal({
//     title: 'Confirm login with Ovio',
//     justContent: true,
//     content: ({ onClose }: { onClose: () => void }) => (
//       <div className="pointer-events-auto flex flex-col items-center">
//         <OvioWalletConnect
//           message={LOGIN_SIGN_MSG}
//           isCustomGameDesign={true}
//           onClose={onClose}
//           onCompleted={async (signature) => {
//             const wallet = await getOvioWalletUserAddress()
//             await login(wallet, signature)

//             await getUser()

//             onClose()
//           }}
//         />
//       </div>
//     ),
//   })
// }

// function EnterOvioPassword({
//   onConfirm,
// }: {
//   onConfirm: (password: string) => void
// }) {
//   const [pass, setPass] = useState('')

//   return (
//     <>
//       <Input
//         type="password"
//         value={pass}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//           setPass(e.target.value)
//         }
//       />
//       <TailButton onClick={() => onConfirm(pass)}>Confirm</TailButton>
//     </>
//   )
// }

// export async function throwEnterOvioPasswordModal() {
//   return await new Promise<string>((resolve, reject) => {
//     setModal({
//       title: 'Ovio wallet password',
//       onClose: reject,
//       content: ({ onClose }: { onClose: () => void }) => (
//         <div className="pointer-events-auto flex flex-col items-stretch justify-self-center">
//           <EnterOvioPassword
//             onConfirm={(pass) => {
//               resolve(pass)
//               onClose()
//             }}
//           />
//         </div>
//       ),
//     })
//   })
// }
