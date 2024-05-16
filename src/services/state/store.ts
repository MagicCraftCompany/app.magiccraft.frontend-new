import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from './currentUser/currentUserSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Atom, swap, deref } from '@dbeining/react-atom'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// import { createAppAsyncThunk } from './helpers'
// import { getBalance } from '../services/blockchain'
// import { E9 } from '@/lib/constants'

const initialState: {
  mcrtPrice: number | undefined
} = {
  mcrtPrice: 0,
}

const mcrtSlice = createSlice({
  name: 'mcrtPrice',
  initialState,
  reducers: {
    setMcrtPrice: (state, action: PayloadAction<number>) => {
      state.mcrtPrice = action.payload
    },
  },
})

export const { setMcrtPrice } = mcrtSlice.actions

const initialStateBnb: {
  bnbPrice: number | undefined
} = {
  bnbPrice: 0,
}

const bnbSlice = createSlice({
  name: 'bnbPrice',
  initialState: initialStateBnb,
  reducers: {
    setBnbPrice: (state, action: PayloadAction<number>) => {
      state.bnbPrice = action.payload
    },
  },
})

export const { setBnbPrice } = bnbSlice.actions

// export const updateBalanceAction = createAppAsyncThunk(
//   'mcrt/updateBalanceAction',
//   async (_, { dispatch, getState }) => {
//     const walletAddress = getState().currentUser.user?.wallet_address

//     if (!walletAddress) return

//     const { total, locked, unlocked } = await getBalance(walletAddress)

//     dispatch(
//       mcrtSlice.actions.setBalance({
//         balance: total.div(E9).toNumber(),
//         lockedBalance: locked.div(E9).toNumber(),
//         unlockedBalance: unlocked.div(E9).toNumber(),
//       })
//     )
//   }
// )

export const disableLoginOnConnectAtom = Atom.of<boolean>(false)
export const setDisableLoginOnConnect = (value: boolean) => {
  swap(disableLoginOnConnectAtom, () => value)
}

export function isDisabledLoginOnConnect() {
  return deref(disableLoginOnConnectAtom)
}

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    mcrtPrice: mcrtSlice.reducer,
    bnbPrice: bnbSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
