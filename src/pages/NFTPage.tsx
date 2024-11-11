import { Border } from '@/components/ui/border'
import { Button } from '@/components/ui/button'
import { VITE_MARKETPLACE_BACK_URL } from '@/lib/constants'
import { fetchNftInfo } from '@/services/api/utils/magicNFT'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ArrowLeft, Wallet } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Rarity } from './MarketplacePage'
import mcrtIcon from '@/assets/icons/icon-mcrt.png'
import bnbIcon from '@/assets/icons/icon-bnb.png'
import { useAppSelector } from '@/services/state/store'
import {
  getCurrentPrice,
  getNameBgColor,
  getRarityBgColor,
  numberWithCommas,
} from '@/lib/helpers'
import { Separator } from '@/components/ui/separator'
import demoImg from '@/assets/images/defensive_stance.png'

interface Attribute {
  trait_type: string
  value: string
}

interface ISelectedNFT {
  _id: string
  contractAddress: string
  tokenID: number
  minter: string
  name: string
  description: string
  image: string
  attributes: Attribute[]
  __v: number
  owner: string
}

interface INFTData {
  contractAddress: string
  tokenID: number
  seller: string
  duration: number
  endingPrice: number
  isMCRT: boolean
  startAt: number
  startingPrice: number
  createdAt: string
}

const NFTPage = () => {
  const { id: tokenId, nft_address: contractAddress } = useParams()
  const navigate = useNavigate()
  const mcrtPrice = useAppSelector((state) => state.mcrtPrice.mcrtPrice)
  const bnbPrice = useAppSelector((state) => state.bnbPrice.bnbPrice)

  const [nftPrice, setNftPrice] = useState<number | null>(null)
  const [nftPriceDollar, setNftPriceDollar] = useState<number | null>(null)

  const { data: selectedNFT, isLoading: isSelectedNFTLoading } =
    useQuery<ISelectedNFT>({
      queryKey: ['selectedNFT', tokenId, contractAddress],
      queryFn: async () => {
        if (!tokenId || !contractAddress) return null
        const data = await fetchNftInfo(tokenId, contractAddress)

        return data.selectedNft
      },
      enabled: !!tokenId && !!contractAddress,
    })

  const { data: NFTData, isLoading: isNFTDataLoading } = useQuery<INFTData>({
    queryKey: ['NFTData', tokenId, contractAddress],
    queryFn: async () => {
      const response = await axios.get(
        `${VITE_MARKETPLACE_BACK_URL}/auction?contractAddress=${contractAddress}&tokenID=${tokenId}`
      )

      if (response.data && response.data.items.length > 0) {
        return response.data.items[0]
      }
    },
    enabled: !!tokenId && !!contractAddress,
  })

  useEffect(() => {
    if (NFTData) {
      const isMcrtNFT = NFTData.isMCRT
      const nftPrice = getCurrentPrice(NFTData)
      let nftPriceDollar = null

      if (isMcrtNFT && mcrtPrice !== undefined) {
        nftPriceDollar = nftPrice * mcrtPrice
      } else if (bnbPrice !== undefined) {
        nftPriceDollar = nftPrice * bnbPrice
      }

      setNftPrice(nftPrice)
      setNftPriceDollar(nftPriceDollar)
    }
  }, [NFTData, mcrtPrice, bnbPrice])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tokenId, contractAddress])

  const attributes = useMemo(() => {
    const attrs = []
    if (selectedNFT?.attributes) {
      const attributeMap = new Map()

      // Categorize attributes into a map for quick lookup
      selectedNFT.attributes.forEach((attr) => {
        attributeMap.set(attr.trait_type, attr.value)
      })

      for (let i = 1; i <= 3; i++) {
        const defNameKey = `default_ability_name_${i}`
        const defValueKey = `default_description_${i}`
        const specNameKey = `special_name_${i}`
        const specValueKey = `special_description_${i}`

        if (attributeMap.has(defNameKey) && attributeMap.has(defValueKey)) {
          attrs.push({
            name: attributeMap.get(defNameKey),
            value: attributeMap.get(defValueKey),
          })
        }

        if (attributeMap.has(specNameKey) && attributeMap.has(specValueKey)) {
          attrs.push({
            name: attributeMap.get(specNameKey),
            value: attributeMap.get(specValueKey),
          })
        }
      }
    }
    return attrs
  }, [selectedNFT])

  const rarity = useMemo(() => {
    return selectedNFT?.attributes?.find((it) => it.trait_type === 'rarity')
      ?.value as Rarity
  }, [selectedNFT])

  const isLoading = isSelectedNFTLoading || isNFTDataLoading

  if (isLoading) {
    return (
      <div className="relative grid min-h-dvh w-full place-items-center">
        <h2 className="font-serif text-2xl">Loading...</h2>
      </div>
    )
  }

  return (
    <div className="relative z-10 min-h-dvh w-full bg-gradient-to-b from-[#0D021B7A] to-primary-600 pb-6 md:pb-12">
      <div className="mx-auto min-h-dvh w-full max-w-screen-xl px-4 md:px-6">
        <div className="py-4 md:py-[30px]">
          <Button
            variant={'ghost'}
            size={'sm'}
            className="gap-1"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4"  />
            <span className=" sm:inline">Back to all NFTs</span>
          </Button>
        </div>
        
        < div className="flex flex-col lg:flex-row lg:gap-[30px] ">
          <div className="mb-6 flex justify-center lg:mb-0">
            {selectedNFT?.image.includes('mp4') ? (
              <video src={selectedNFT?.image} muted autoPlay loop />
            ) : (
              <Border
                className="h-[300px] w-[300px] md:h-[400px] md:w-[400px] p-[3px]"
                variant={rarity?.toLowerCase() as Rarity}
              >
                <img
                  src={selectedNFT?.image}
                  className="h-full w-full rounded-2xl bg-primary-500 object-cover"
                />
              </Border>
            )}
          </div>

          <div className="flex-1 space-y-6 md:space-y-12 ">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-[30px]">
              <div className="grow">
                <p className="text-sm text-tertiary-100">Owner</p>
                <p className="text-sm text-white/60">{selectedNFT?.owner}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 md:h-11 md:w-11 place-items-center">
                  {NFTData?.isMCRT ? (
                    <img src={mcrtIcon} />
                  ) : (
                    <img src={bnbIcon} />
                  )}
                </div>

                <div>
                  <p className="text-lg md:text-[24px]">
                    {numberWithCommas(nftPrice?.toString() ?? '')}
                  </p>
                  <p className="text-right text-sm text-tertiary-100">
                    $ {numberWithCommas(nftPriceDollar?.toFixed(2) ?? '')}
                  </p>
                </div>
              </div>

              <Button className="min-h-[50px] md:min-h-[60px] gap-2 md:gap-[10px] w-full sm:w-auto">
               <Wallet className="h-5 w-5" />
                <p className="text-lg md:text-[22px]">Buy Item</p>
              </Button>
            </div>

            <div className="space-y-5 rounded-[20px] bg-primary-400 p-4 md:p-10 shadow-xl shadow-black">
               <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl md:text-[30px]">
                    {' '}
                    {selectedNFT?.name.split(',')[0]}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {selectedNFT?.name && (
                      <div
                        className="w-fit rounded-md px-2 text-sm md:text-base"
                        style={{
                          backgroundColor: getNameBgColor(
                            selectedNFT?.name ?? null
                          ),
                        }}
                      >
                        {selectedNFT?.name.split(',')[1]?.split('The').join('')}
                      </div>
                    )}

                    <div
                      className="w-fit rounded-md px-2 text-sm md:text-base"
                      style={{
                        backgroundColor: getRarityBgColor(rarity ?? 'epic'),
                      }}
                    >
                      {rarity}
                    </div>
                  </div>
                </div>

                <div className="rounded-[30px] bg-primary-200 px-3 py-1 text-sm text-primary-100">
                  #{selectedNFT?.tokenID}
                </div>
              </div>

              <Separator className="via-secondary-100/50" />

              <div className="space-y-4">
                <h5 className="text-xl md:text-2xl text-tertiary-100">Description</h5>

                <p className="text-balance text-base md:text-lg">
                  {selectedNFT?.description}
                </p>
              </div>

              {attributes?.length > 0 && (
                <>
                  <Separator className="via-secondary-100/50" />
                  <div className="space-y-4">
                    <h5 className="text-xl md:text-2xl text-tertiary-100">Abilities</h5>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {attributes.map((attr) => {
                        return (
                          <div
                            key={attr.name}
                             className="flex items-center gap-4 rounded-2xl bg-[#0C0C29] p-4 md:p-5"
                          >
                            <img src={demoImg} alt="Attribute" className="w-12 h-12 md:w-16 md:h-16" />

                            <div>
                         <h6 className="text-lg md:text-[22px]">{attr.name}</h6>
                            <p className="text-balance text-sm text-white/60">
                                {attr?.value}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
      
      </div>
      </div>
    </div>
  )
}

export default NFTPage




