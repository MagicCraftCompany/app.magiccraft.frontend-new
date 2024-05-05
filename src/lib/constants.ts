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

if (!import.meta.env.VITE_MARKETPLACE_BACK_URL) {
  throw new Error('VITE_MARKETPLACE_BACK_URL is not defined')
}

if (!import.meta.env.VITE_GENESIS_CONTRACT_ADDRESS) {
  throw new Error('VITE_GENESIS_CONTRACT_ADDRESS is not defined')
}

if (!import.meta.env.VITE_REVELATION_CONTRACT_ADDRESS) {
  throw new Error('VITE_REVELATION_CONTRACT_ADDRESS is not defined')
}

export const VITE_MARKETPLACE_BACK_URL = import.meta.env
  .VITE_MARKETPLACE_BACK_URL

export const VITE_GENESIS_CONTRACT_ADDRESS = import.meta.env
  .VITE_GENESIS_CONTRACT_ADDRESS

export const VITE_REVELATION_CONTRACT_ADDRESS = import.meta.env
  .VITE_REVELATION_CONTRACT_ADDRESS

export const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'authToken'
