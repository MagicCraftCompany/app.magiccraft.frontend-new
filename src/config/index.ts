import { VITE_CHAIN_ID } from '@/lib/constants'
import { BigNumber } from 'ethers'

export const chainId = String(VITE_CHAIN_ID) || String(97)
export const E18 = BigNumber.from(10).pow(18)
export const E9 = BigNumber.from(10).pow(9)
export const COINGECKO_API_ENDPOINT = 'https://api.coingecko.com/api'
export const numberRegex = /^[0-9]*\.?[0-9]*$/
export const INVENTORY_SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/daisai3/magiccraft_nft'

export const GEM_PACK_DATA = [
  {
    id: 1,
    pack_name: 'Novice Shard',
    price_in_usd: 1,
    gems: 100,
  },
  {
    id: 2,
    pack_name: 'Apprentice Bundle',
    price_in_usd: 5,
    gems: 550,
  },
  {
    id: 3,
    pack_name: "Warrior's Cache",
    price_in_usd: 10,
    gems: 1200,
  },
  {
    id: 4,
    pack_name: "Mage's Treasury",
    price_in_usd: 20,
    gems: 2500,
  },
  {
    id: 5,
    pack_name: "Hero's Hoard",
    price_in_usd: 50,
    gems: 6500,
  },
  {
    id: 6,
    pack_name: "Legend's Vault",
    price_in_usd: 100,
    gems: 14000,
  },
]
