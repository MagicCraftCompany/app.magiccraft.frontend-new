import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const region = {
  Europe: 'Europe',
  Asia: 'Asia',
} as const

export type Region = (typeof region)[keyof typeof region]

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
}

export type User = {
  id: string
  username: string
  first_name: string
  last_name: string
  email: string
  created_at: string
  is_verified: boolean
  wallet_address: `0x${number}`
  external_id: string
  birth_date: string
  roles: UserRole[]
  referral_token: string
  is_ovio_user: boolean
  is_wombat_user: boolean
  preferred_region: Region
  gems: number
  mcrt: number
}

const initialState: { user: User | null } = { user: null }

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = currentUserSlice.actions

export default currentUserSlice.reducer
