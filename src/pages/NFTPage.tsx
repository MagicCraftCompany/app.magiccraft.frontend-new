import { Border } from '@/components/ui/border'
import { Button } from '@/components/ui/button'
import { VITE_MARKETPLACE_BACK_URL } from '@/lib/constants'
import { fetchNftInfo } from '@/services/api/utils/magicNFT'
// import { useAppSelector } from '@/services/state/store'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const NFTPage = () => {
  const { id: tokenId, nft_address: contractAddress } = useParams()
  // const mcrtPrice = useAppSelector((state) => state.mcrtPrice.mcrtPrice)
  // const bnbPrice = useAppSelector((state) => state.bnbPrice.bnbPrice)

  const navigate = useNavigate()

  const { data: selectedNFT } = useQuery({
    queryKey: ['selectedNFT'],
    queryFn: async () => {
      if (!tokenId || !contractAddress) return null
      const data = await fetchNftInfo(tokenId, contractAddress)

      return data.selectedNft
    },
  })

  const { data: NFTData } = useQuery({
    queryKey: ['NFTData'],
    queryFn: async () => {
      const response = await axios.get(
        `${VITE_MARKETPLACE_BACK_URL}/auction?contractAddress=${contractAddress}&tokenID=${tokenId}`
      )

      if (response.data && response.data.items.length > 0) {
        return response.data.items[0]
      }
    },
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  console.log({ selectedNFT })

  console.log({ NFTData })

  const rarity = selectedNFT?.attributes?.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (it: any) => it.trait_type === 'rarity'
  )?.value

  return (
    <div className="relative mx-auto w-[95%] max-w-screen-xl">
      <div className="py-[30px]">
        <Button
          variant={'ghost'}
          size={'sm'}
          className="gap-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
          <span>Back to all NFTs</span>
        </Button>
      </div>

      <div className="flex items-start justify-between gap-[30px]">
        <div className="w-[35%]">
          {selectedNFT?.image.includes('mp4') ? (
            <video src={selectedNFT?.image} muted autoPlay loop />
          ) : (
            <Border variant={rarity?.toLowerCase()}>
              <img src={selectedNFT?.image} alt="NFT" />
            </Border>
          )}
        </div>

        <div className="w-[60%] "></div>
      </div>
    </div>
  )
}

export default NFTPage
