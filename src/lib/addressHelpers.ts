import stakingContractJson from '@/abi/MCRTStake.json'
import tokenContractJson from '@/abi/MCRTToken.json'
import pointContractJson from '@/abi/points.json'
import multiCallContractJson from '@/abi/MultiCall.json'
import magicNFTContractJson from '@/abi/MagicNFT.json'
import marketplaceContractJson from '@/abi/Marketplace.json'
import nftRedeemJson from '@/abi/NFTRedeem.json'
import { VITE_REVELATION_CONTRACT_ADDRESS, chainId } from '@/lib/constants'

export const getMCRTStakeAddress = () => {
  return stakingContractJson.contract[
    chainId as keyof typeof stakingContractJson.contract
  ]
}

export const getRevelationAddress = () => {
  return VITE_REVELATION_CONTRACT_ADDRESS
}

export const getMCRTTokenAddress = () => {
  return tokenContractJson.contract[
    chainId as keyof typeof tokenContractJson.contract
  ]
}

export const getPointsAddress = () => {
  return pointContractJson.contract[
    chainId as keyof typeof pointContractJson.contract
  ]
}

export const getMulticallAddress = () => {
  return multiCallContractJson.contract[
    chainId as keyof typeof multiCallContractJson.contract
  ]
}

export const getMagicNFTAddress = () => {
  return magicNFTContractJson.contract[
    chainId as keyof typeof magicNFTContractJson.contract
  ]
}

export const getMarketplaceAddress = () => {
  return marketplaceContractJson.contract[
    chainId as keyof typeof marketplaceContractJson.contract
  ]
}

export const getNFTRedeemAddress = () => {
  return nftRedeemJson.contract[chainId as keyof typeof nftRedeemJson.contract]
}

export const getShortenAddress = (address: string) => {
  return `${address.slice(0, 6)} ... ${address.slice(-6)}`
}
