/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { fetchMintStatus } from './fetchMint'

type StateType = {
  publicSale: boolean
  whitelistSale: boolean
  publicPrice: number
  whiteListPrice: number
}
const initialState: StateType = {
  publicSale: false,
  whitelistSale: false,
  publicPrice: 0,
  whiteListPrice: 0,
}

export const StakingSlice = createSlice({
  name: 'NFTMINT',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.publicSale = action.payload.publicSale
      state.whitelistSale = action.payload.whitelistSale
      state.publicPrice = action.payload.publicPrice
      state.whiteListPrice = action.payload.whiteListPrice
    },
  },
})

// Actions
export const { setData } = StakingSlice.actions

export const fetchNFTMintAsync =
  (contractAddress: string) => async (dispatch: any) => {
    const { publicSale, whitelistSale, publicPrice, whiteListPrice } =
      await fetchMintStatus(contractAddress)

    dispatch(
      setData({
        publicSale: publicSale,
        whitelistSale: whitelistSale,
        publicPrice: publicPrice,
        whiteListPrice: whiteListPrice,
      })
    )
  }

export default StakingSlice.reducer
