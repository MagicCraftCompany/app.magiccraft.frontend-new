/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract';
import { useWeb3React } from '@web3-react/core';
// import useWeb3 from './useWeb3'
import {
  getMCRTStakeAddress,
  getMCRTTokenAddress,
  getPointsAddress,
  getMarketplaceAddress,
  getNFTRedeemAddress,
  getRevelationAddress,
} from '@/lib/addressHelpers'

import stakingContractJson from '@/abi/MCRTStake.json'
import tokenContractJson from '@/abi/MCRTToken.json'
import pointContractJson from '@/abi/points.json'
import magicNFTContractJson from '@/abi/MagicNFT.json'
import marketplaceJson from '@/abi/Marketplace.json'
import nftRedeemJson from '@/abi/NFTRedeem.json'
import RevelationABIJson from '@/abi/Revelation.abi.json'
import DOGE_NFT_ABI from '@/abi/DogeNFT.json';

import { getWeb3NoAccount } from '@/lib/web3'
import {
  VITE_GENESIS_CONTRACT_ADDRESS,
  VITE_REVELATION_CONTRACT_ADDRESS,
} from '@/lib/constants'

// Doge NFT contract addresses by chain
const DOGE_NFT_ADDRESSES: { [chainId: number]: string } = {
  1: '0x...', // Mainnet
  56: '0x...', // BSC
  // Add other network addresses as needed
};

//web3
const web3 = (window as any).ethereum
  ? new Web3((window as any).ethereum)
  : getWeb3NoAccount()

console.log(web3)

const useContract = (abi: any, address: any, contractOptions = undefined) => {
  const [contract, setContract] = useState(
    new web3.eth.Contract(abi, address, contractOptions)
  )

  console.log(contract)

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useStakeContract = () => {
  return useContract(stakingContractJson.abi, getMCRTStakeAddress())
}

export const usePointContract = () => {
  return useContract(pointContractJson.abi, getPointsAddress())
}

export const useMCRT = () => {
  return useContract(tokenContractJson.abi, getMCRTTokenAddress())
}

export const useRevelation = () => {
  return useContract(RevelationABIJson, getRevelationAddress())
}

export const useMagicNFT = (contractAddress = null) => {
  const currentCollection = localStorage.getItem('collection')
  let address

  switch (currentCollection) {
    case 'genesis':
    default: {
      address = VITE_GENESIS_CONTRACT_ADDRESS
      break
    }
    case 'revelation':
      address = VITE_REVELATION_CONTRACT_ADDRESS
  }

  if (contractAddress) {
    address = contractAddress
  }

  return useContract(magicNFTContractJson.abi, address)
}

export const useMarketplaceContract = () => {
  return useContract(marketplaceJson.abi, getMarketplaceAddress())
}

export const useNFTRedeemContract = () => {
  return useContract(nftRedeemJson.abi, getNFTRedeemAddress())
}
export const useDogeNft = (): Contract | null => {
  const { chainId } = useWeb3React();
  const contractAddress = chainId ? DOGE_NFT_ADDRESSES[chainId] : undefined;

  if (!contractAddress) {
    console.error(`Doge NFT contract is not available on chain ${chainId}`);
    return null;
  }

  return useContract(DOGE_NFT_ABI, contractAddress);
};

export default useContract
