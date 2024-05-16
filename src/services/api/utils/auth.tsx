/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '../axios'
import { AxiosError } from 'axios'
import { AUTH_TOKEN_LOCAL_STORAGE_KEY, LOGIN_SIGN_MSG } from '@/lib/constants'
// import BigNumber from "bignumber.js";

import { useNavigate } from 'react-router-dom'
import { setModal } from '@/components/Modal/Modal'
import { Button } from '@/components/ui/button'
import { Region, User } from '@/services/state/currentUser/currentUserSlice'
import {
  ConnectWithOvio,
  isOvioWalletUser,
  getOvioWalletUserAddress,
  OvioWalletConnect,
  getIsUserConnected,
  connectWithOvio,
} from 'ovio-gg-web3'
import {
  closeSnacks,
  throwAxiosErrorSnack,
  throwSnack,
} from '@/components/SnackBar/SnackSimple'
import { disconnect, signMessage, getAccount } from '@wagmi/core'

type RegisterResponse = {
  first_name: string
  last_name: string
  email: string
  birth_date: string
  wallet_address: string
  username: string
  id: string
}

export const registerUser = async (
  email: string,
  wallet_address: string,
  sign: string,
  username: string,
  marketing_opt_in: boolean,
  referral_token: string | null,
  is_ovio_user: boolean
): Promise<string> => {
  try {
    // @ts-expect-error fzdfas
    const is_wombat_user = !!window.__wombat__ && window.ethereum.isWombat

    const res = await axios.post<RegisterResponse>(`/auth/register`, {
      email: email,
      wallet_address: wallet_address,
      sign: sign,
      username: username,
      marketing_opt_in,
      referral: referral_token,
      is_wombat_user,
      is_ovio_user,
    })

    return res.data.id
  } catch (err: any) {
    const message = err.response.data.error

    throw new Error(message)
  }
}

export const verifyToken = async (verify_token: string) => {
  const response = await axios.post(`/auth/verify`, {
    token: verify_token,
  })

  return response
}

export const login = async (
  wallet_address: string,
  sign: string
): Promise<string> => {
  try {
    const { data } = await axios.post<{ token: string }>(`/auth/login`, {
      wallet_address: wallet_address,
      sign: sign,
    })
    localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, data.token)
    axios.defaults.headers.common['Authorization'] = data.token
    return data.token
  } catch (err: any) {
    if (err instanceof AxiosError) {
      if (
        (
          err as AxiosError<{
            error: { message: string; name: string; code: string }
          }>
        ).response?.data.error.name === 'TokenExpiredError'
      ) {
        localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, '')
        axios.defaults.headers.common['Authorization'] = undefined
        return await login(wallet_address, sign)
      } else if (err.response?.status === 404) {
        const snack = throwSnack('error', 'User not found', <Subtitle />)

        // eslint-disable-next-line no-inner-declarations
        function Subtitle() {
          const navigate = useNavigate()
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <span>If you have not registered yet, please do so first.</span>
              <Button
                onClick={() => {
                  closeSnacks([snack as any])
                  setModal(undefined)
                  navigate('/register')
                }}
              >
                Register
              </Button>
            </div>
          )
        }

        // await disconnect()

        throw new Error('User not found')
      } else if (err.response?.status === 401) {
        throwSnack(
          'error',
          'You have not been verified',
          <div className="flex flex-col gap-4">
            <span>
              Verify your account by clicking the link in the email we sent you.
            </span>
            <Button
              // style={{ margin: 0 }}
              onClick={async () => {
                try {
                  const signed = await signMessageUniversal(
                    'Wallet verification'
                  )

                  await resendVerificationEmail(signed)
                } catch (err) {
                  console.log(err)
                }
              }}
            >
              Resend verification email
            </Button>
          </div>
        )

        throw new Error('You have not been verified')
      } else {
        // await disconnect()

        throwAxiosErrorSnack(err)

        throw new Error('Unknown error')
      }
    } else {
      throw err
    }
  }
}

export async function resendVerificationEmail(sign: string) {
  try {
    await axios.post<{ message: string }>('/auth/resend-verification-email', {
      sign,
    })

    throwSnack(
      'success',
      'Verification email sent successfully',
      'Check your inbox and spam folder for the verification email'
    )
  } catch (err) {
    if (err instanceof AxiosError) {
      throwAxiosErrorSnack(err)
    }
  }
}

export type HistoryDataItem = {
  transactionHash: string
  blockNumber: number
  data: ItemData
}

type ItemData =
  | {
      type: 'deposit' | 'withdrawal'
      amount: string
    }
  | {
      type: 'won' | 'lost'
      amount: string
      lobbyId?: string
    }

export type ReferralHistoryDataItem = {
  transactionHash: string
  blockNumber: number
  data: ReferralItemData
}
type ReferralItemData = {
  type: 'referral'
  amount: string
  forAccount: string
  lobbyId?: string | bigint
  forUsername?: string
}

export async function getMyWalletHistoryData() {
  const { data } = await axios.get<HistoryDataItem[]>('/me/wallet_history')
  return data
}

export async function getMyReferralWalletHistoryData() {
  const { data } = await axios.get<ReferralHistoryDataItem[]>('/me/referrals')
  return data
}

export async function getAmVIPLobbyEligible() {
  const { data } = await axios.get<{ eligible: boolean }>(
    '/me/vip-lobby-eligibility'
  )
  return data.eligible
}

export async function getUsernameByReferralString(referralString: string) {
  const { data } = await axios.get<{ username: string }>(
    `/auth/user-by-referral/${referralString}`
  )
  return data.username
}

export async function apiChangeMyRegion(region: Region) {
  const { data } = await axios.post<User>('/me/region', { region })

  return data
}

export async function signMessageUniversal(title: string) {
  const ovioWallet =
    getIsUserConnected() &&
    (await isOvioWalletUser()) &&
    (await getOvioWalletUserAddress())
  const { address, isConnected } = getAccount()

  const wallet = address || ovioWallet
  if (((!address || !isConnected) && !ovioWallet) || !wallet) {
    throw new Error("Message wasn't signed")
  }

  let signed = ''
  if (ovioWallet) {
    signed = await new Promise<string>((resolve, reject) => {
      setModal({
        title,
        justContent: true,
        onClose: reject,
        content: ({ onClose }) => (
          <div style={{ zIndex: 1000000 }} className="pointer-events-auto">
            <OvioWalletConnect
              isCustomGameDesign={true}
              message={LOGIN_SIGN_MSG}
              onCompleted={(signedMessage) => {
                resolve(signedMessage)
                onClose()
              }}
              onClose={onClose}
            />
          </div>
        ),
      })
    })
  } else {
    signed = await signMessage({
      message: LOGIN_SIGN_MSG,
    })
  }

  if (signed) {
    return signed
  }

  throw new Error("Message wasn't signed")
}
