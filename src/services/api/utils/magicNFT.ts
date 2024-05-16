/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  VITE_GENESIS_CONTRACT_ADDRESS,
  VITE_MARKETPLACE_BACK_URL,
} from '@/lib/constants'
import axios from 'axios'

export const fetchMagicNfts = async (
  pageNumber: number,
  contractAddress: string,
  rarity?: string[],
  latestCall?: boolean
) => {
  // const contractAddress = getNftContractAddress()
  // const contractAddress = VITE_REVELATION_CONTRACT_ADDRESS

  // const contractAddress = VITE_GENESIS_CONTRACT_ADDRESS

  let listedNfts: any[] = []

  const val = localStorage.getItem('filterlist')

  let fieldType
  let tempFilter

  if (!latestCall) {
    if (val === 'Highest Price First') {
      fieldType = 'startingPrice'
      tempFilter = -1
    } else if (val === 'Lowest Price First') {
      fieldType = 'startingPrice'
      tempFilter = 1
    } else if (val === 'Latest First') {
      fieldType = 'startAt'
      tempFilter = -1
    } else {
      fieldType = 'startingPrice'
      tempFilter = -1
    }
  } else {
    fieldType = 'startAt'
    tempFilter = -1
  }

  try {
    listedNfts = await getMagicCraftListedNfts(
      pageNumber,
      fieldType,
      contractAddress,
      tempFilter,
      rarity
    )
  } catch (error) {
    listedNfts = []
  }

  let nftMetadata: any[] = []

  try {
    nftMetadata = await getMagicCraftNfts(
      contractAddress,
      listedNfts.map((it: any) => it.tokenID)
    )
  } catch (error) {
    nftMetadata = []
  }

  if (listedNfts.length) {
    for (let i = 0; i < listedNfts.length; i++) {
      const metadata = nftMetadata.find(
        (it) => it.tokenID === listedNfts[i].tokenID
      )
      listedNfts[i].name = metadata.name
      listedNfts[i].description = metadata.description
      listedNfts[i].image = metadata.image
      listedNfts[i].attributes = [...metadata.attributes]
    }
  }

  return {
    listedNfts,
  }
}

export const getMagicCraftListedNfts = async (
  pageNumber: number,
  sortField: string,
  contractAddress: string,
  filter: number,
  rarity?: string[],
  account?: string
) => {
  const { data } = await axios.get(
    `${VITE_MARKETPLACE_BACK_URL}/auction?contractAddress=${contractAddress}${
      account ? `&address=${account.toLowerCase()}&` : '&'
    }page=${pageNumber}&sortField=${sortField}&filter=${filter}${
      rarity && rarity?.length > 0 ? `&rarity=${rarity.toString()}` : ''
    }
`
  )

  if (data && data.items.length === 0) return []

  return data.items
}

export const getMagicCraftNfts = async (
  contractAddress: string | undefined,
  ids: Array<string>
) => {
  const { data } = await axios.post(`${VITE_MARKETPLACE_BACK_URL}/getNFT`, {
    contractAddress,
    ids: ids,
  })

  if (data && data.items.length === 0) return []

  data.items = data.items.map((it: any) => {
    const { holder: ownerAddr } = data.holders.find(
      (holder: any) => holder.tokenID == it.tokenID
    )
    return { ...it, owner: ownerAddr }
  })

  return data.items
}

export const getMagicCraftAccountWithNfts = async (
  pageNumber: number,
  sortField: string,
  contractAddress: string,
  filter: number,
  account: string,
  rarity?: string[]
) => {
  const { data } = await axios.post('/getNFT', {
    address: account,
  })

  const listedData = await getMagicCraftListedNfts(
    pageNumber,
    sortField,
    contractAddress,
    filter,
    rarity,
    account
  )

  const listedMeta = await getMagicCraftNfts(
    contractAddress,
    listedData.map((it: any) => it.tokenID)
  )

  for (let i = 0; i < listedData.length; i++) {
    const metadata = listedMeta.find(
      (it: any) => it.tokenID == listedData[i].tokenID
    )
    listedData[i].name = metadata.name
    listedData[i].description = metadata.description
    listedData[i].image = metadata.image
    listedData[i].attributes = [...metadata.attributes]
  }

  if (data && data.items.length === 0 && listedData.length == 0) return []

  return [...listedData, ...data.items]
}

export const getRecentlySoldNfts = async (contractAddress: string) => {
  const { data } = await axios.get(
    `${VITE_MARKETPLACE_BACK_URL}/recent-sold?contractAddress=${contractAddress}`
  )

  if (data && data.items.length === 0) return []

  return data.items
}

export const getNFTAmountHolders = async (contractAddress: string) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_MARKETPLACE_BACK_URL}/nft-holder-count?contractAddress=${contractAddress}`
  )

  return data
}
