// VITE_BETA_URL=http://localhost:4000
// #https://beta-api-magiccraft.herokuapp.com
// VITE_CHAIN_ID=56
// VITE_HACKLESS_KEY=710077b1f1f7f8c497724e39e5f17ade3ecd031a75ae0b06eead9d4fc772c435
// # VITE_MARKETPLACE_BACK_URL=http://localhost:3300
// VITE_MARKETPLACE_BACK_URL=https://api.magiccraft.io
// VITE_NFT_BACK_URL=https://magiccraft-mint.herokuapp.com/whitelist
// VITE_LOBBY_BACK_URL=https://lobby-api-prod.magiccraft.io
// # VITE_LOBBY_BACK_URL=http://localhost:3333
// VITE_GENESIS_CONTRACT_ADDRESS=0xbf4d4886554a5fdefff07aea90ec37d24260e7a7
// VITE_REVELATION_CONTRACT_ADDRESS=0xafc9f628220EB9EFc313dED8D131253F633F6bE9
// VITE_NODE_1=https://bsc-dataseed.binance.org/
// VITE_NODE_2=https://bsc-dataseed.binance.org/
// VITE_NODE_3=https://bsc-dataseed.binance.org/
// VITE_TREASURY_WALLET_ADDRESS=0xe03629571A6cC91c5c69758F310d9341a2932D53
// VITE_CMC_API_KEY=93cac65e-8bbb-4832-9384-014f2a7793f5
import BigNumber from 'bignumber.js'
export const TABLET_BREAKPOINT = 688
export const SMALL_MOBILE_BREAKPOINT = 375
export const DESKTOP_BREAKPOINT = 1100
import noviceShard from '@/assets/images/novice-shard.png'
import legendVault from '@/assets/images/legend-vault.png'
import heroHoard from '@/assets/images/hero-hoard.png'
import warriorCache from '@/assets/images/warrior-cache.png'
import apprenticeBundle from '@/assets/images/apprentice-bundle.png'

if (!import.meta.env.VITE_MARKETPLACE_BACK_URL) {
  throw new Error('VITE_MARKETPLACE_BACK_URL is not defined')
}

if (!import.meta.env.VITE_LOBBY_BACK_URL) {
  throw new Error('VITE_LOBBY_BACK_URL is not defined')
}

if (!import.meta.env.VITE_GENESIS_CONTRACT_ADDRESS) {
  throw new Error('VITE_GENESIS_CONTRACT_ADDRESS is not defined')
}

if (!import.meta.env.VITE_REVELATION_CONTRACT_ADDRESS) {
  throw new Error('VITE_REVELATION_CONTRACT_ADDRESS is not defined')
}

if (!import.meta.env.VITE_CHAIN_ID) {
  throw new Error('VITE_CHAIN_ID is not defined')
}

if (!import.meta.env.VITE_NODE_1) {
  throw new Error('VITE_NODE_1 is not defined')
}
if (!import.meta.env.VITE_NODE_2) {
  throw new Error('VITE_NODE_2 is not defined')
}
if (!import.meta.env.VITE_NODE_3) {
  throw new Error('VITE_NODE_3 is not defined')
}

if (!import.meta.env.VITE_SIGN_MSG) {
  throw new Error('VITE_SIGN_MSG is not defined')
}

export const VITE_MARKETPLACE_BACK_URL = import.meta.env
  .VITE_MARKETPLACE_BACK_URL

export const VITE_LOBBY_BACK_URL = import.meta.env.VITE_LOBBY_BACK_URL

export const VITE_GENESIS_CONTRACT_ADDRESS = import.meta.env
  .VITE_GENESIS_CONTRACT_ADDRESS

export const VITE_REVELATION_CONTRACT_ADDRESS = import.meta.env
  .VITE_REVELATION_CONTRACT_ADDRESS

export const VITE_CHAIN_ID = import.meta.env.VITE_CHAIN_ID

export const VITE_NODE_1 = import.meta.env.VITE_NODE_1
export const VITE_NODE_2 = import.meta.env.VITE_NODE_2
export const VITE_NODE_3 = import.meta.env.VITE_NODE_3

export const LOGIN_SIGN_MSG = import.meta.env.VITE_SIGN_MSG

export const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'authToken'

export const E18 = BigNumber(10).pow(18)
export const E9 = BigNumber(10).pow(9)

export const chainId = String(VITE_CHAIN_ID) || String(97)
export const COINGECKO_API_ENDPOINT = 'https://api.coingecko.com/api'
export const numberRegex = /^[0-9]*\.?[0-9]*$/
export const INVENTORY_SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/daisai3/magiccraft_nft'

export type GemPack = {
  id: number
  pack_name: string
  slug: string
  price_in_usd: number
  gems: number
  img: string
  discount: number
}

export const GEM_PACK_DATA: readonly GemPack[] = [
  {
    id: 1,
    pack_name: 'Novice Shard',
    slug: 'novice-shard',
    price_in_usd: 1,
    gems: 100,
    img: noviceShard,
    discount: 5,
  },
  {
    id: 2,
    pack_name: 'Apprentice Bundle',
    slug: 'apprentice-bundle',
    price_in_usd: 5,
    gems: 550,
    img: apprenticeBundle,
    discount: 10,
  },
  {
    id: 3,
    pack_name: "Warrior's Cache",
    slug: 'warriors-cache',
    price_in_usd: 10,
    gems: 1200,
    img: warriorCache,
    discount: 15,
  },
  {
    id: 4,
    pack_name: "Mage's Treasury",
    slug: 'mages-treasury',
    price_in_usd: 20,
    gems: 2500,
    img: warriorCache,
    discount: 20,
  },
  {
    id: 5,
    pack_name: "Hero's Hoard",
    slug: 'hero-hoard',
    price_in_usd: 50,
    gems: 6500,
    img: heroHoard,
    discount: 25,
  },
  {
    id: 6,
    pack_name: "Legend's Vault",
    slug: 'legends-vault',
    price_in_usd: 100,
    gems: 14000,
    img: legendVault,
    discount: 30,
  },
] as const

export const LOCAL_STORAGE_FIRST_VISIT_KEY = 'firstVisit'
export const LOCAL_STORAGE_LOGGING_IN_OVIO = 'logging-in-ovio'
