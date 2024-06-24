import { BigNumber } from 'ethers'
import magicNFTcontractJson from '@/abi/MagicNFT.json'
import multicall from '@/services/api/utils/multicall'

export const fetchMintStatus = async (contractAddress: string) => {
  const [isPublicSale, isWhiteListSale, publicPrice, whiteListPrice] =
    await multicall(magicNFTcontractJson.abi, [
      {
        address: contractAddress,
        name: 'isPublicSale',
        params: [],
      },
      {
        address: contractAddress,
        name: 'isWhiteListSale',
        params: [],
      },
      {
        address: contractAddress,
        name: 'publicMintPriceForEach',
        params: [],
      },
      {
        address: contractAddress,
        name: 'whiteListPriceForEach',
        params: [],
      },
    ])

  return {
    publicSale: isPublicSale[0],
    whitelistSale: isWhiteListSale[0],
    publicPrice: BigNumber.from(publicPrice[0]._hex),
    whiteListPrice: BigNumber.from(whiteListPrice[0]._hex),
  }
}
