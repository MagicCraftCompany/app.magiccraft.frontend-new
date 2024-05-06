import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import { chainId } from '@/config'
import { VITE_NODE_1, VITE_NODE_2, VITE_NODE_3 } from './constants'
import random from 'lodash/random'

// mainnet
export const nodes = [VITE_NODE_1, VITE_NODE_2, VITE_NODE_3]

export const testNetNodes = [
  'https://data-seed-prebsc-1-s3.binance.org:8545/',
  'https://data-seed-prebsc-1-s3.binance.org:8545/',
  'https://data-seed-prebsc-1-s3.binance.org:8545/',
]

const getRpcUrl = () => {
  const _nodes = chainId === '97' ? testNetNodes : nodes
  const randomIndex = random(0, _nodes.length - 1)
  return _nodes[randomIndex]
}

const RPC_URL = getRpcUrl() || ''
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, {
  timeout: 10000,
} as HttpProviderOptions)
const web3NoAccount = new Web3(httpProvider)

/**
 * Provides a web3 instance using our own private provider httpProver
 */
const getWeb3 = () => {
  const web3 = new Web3(httpProvider)
  return web3
}
const getContract = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abi: any,
  address: string,
  contractOptions?: ContractOptions
) => {
  const web3 = getWeb3()
  return new web3.eth.Contract(
    abi as unknown as AbiItem,
    address,
    contractOptions
  )
}

const getWeb3NoAccount = () => {
  return web3NoAccount
}

export { getWeb3, getContract, httpProvider, getWeb3NoAccount }
