import { TypographyH1 } from '@/components/Typography'
import { Separator } from '@/components/ui/separator'
import { VITE_GENESIS_CONTRACT_ADDRESS } from '@/lib/constants'
import {
  getCurrentPrice,
  getNameBgColor,
  getThumbnailImage,
  nFormatter,
  numberWithCommas,
} from '@/lib/helpers'
import { fetchMagicNfts } from '@/services/api/utils/magicNFT'
import { useAppSelector } from '@/services/state/store'
import { useQuery } from '@tanstack/react-query'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import mcrtIcon from '@/assets/icons/icon-mcrt.png'
import bnbIcon from '@/assets/icons/icon-bnb.png'

type ListedNft = {
  contractAddress: string
  tokenID: number
  seller: string
  duration: number
  endingPrice: number
  isMCRT: boolean
  startAt: number
  startingPrice: number
  createdAt: string
  name: string
  description: string
  image: string
  attributes: {
    trait_type: string
    value: string
  }[]
}

type ListedNftArray = ListedNft[]

const MarketplacePage = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    collection: 'genesis',
    sort: 'desc',
  })

  console.log(searchParams)

  const collection = searchParams.get('collection')
  const sort = searchParams.get('sort')

  console.log(collection)

  const { data: listedNfts, status: listedNftStatus } =
    useQuery<ListedNftArray>({
      queryKey: ['listedNFTs'],
      queryFn: async () => {
        const data = await fetchMagicNfts(
          0,
          VITE_GENESIS_CONTRACT_ADDRESS,
          undefined,
          true
        )
        return data.listedNfts.length > 0 ? data.listedNfts : []
      },
    })

  console.log({ listedNfts })

  return (
    <section className="relative px-6">
      <div className="space-y-20 pt-10">
        <TypographyH1 className="md:text-5xl">Marketplace</TypographyH1>

        <div className="flex min-h-10 justify-between gap-10">
          <div className="sticky top-10 h-fit min-h-10 w-[20%] items-center rounded-[22px] bg-gradient-to-b from-primary-200 to-transparent p-px">
            <div className="rounded-[22px] bg-primary-600 ">
              Filter component Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Cupiditate perferendis quas harum explicabo
              eaque dolores eos numquam iusto esse ipsa quae dolore mollitia ad,
              voluptatibus velit ipsam recusandae quaerat minima dolorem
              voluptas distinctio? Perferendis ipsam repellat atque deleniti
              accusamus, consequatur voluptate odio eius numquam natus quas
              corrupti. Nisi, possimus?
            </div>
          </div>
          <div className=" w-[75%] flex-grow rounded-[22px] bg-gradient-to-b from-primary-200 to-transparent p-px">
            <div className="min-h-dvh space-y-16 rounded-[22px] bg-primary-600 px-11 py-[22px] ">
              <div className="flex w-full items-center justify-between">
                <p className="text-base text-white/60">
                  Showing {listedNfts?.length ?? 0} items
                </p>

                <div className=" text-secondary-100">
                  {sort === 'desc' || sort === '' ? (
                    <div
                      onClick={() =>
                        setSearchParams(
                          (prev) => {
                            prev.set('sort', 'asc')
                            return prev
                          },
                          { replace: true }
                        )
                      }
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <p className="font-semibold">Highest Price First</p>
                      <ArrowDown size={19} />
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        setSearchParams(
                          (prev) => {
                            prev.set('sort', 'desc')
                            return prev
                          },
                          { replace: true }
                        )
                      }
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <p className="font-semibold">Lowest Price First</p>
                      <ArrowUp size={19} />
                    </div>
                  )}
                </div>
              </div>
              {listedNftStatus === 'pending' ? (
                <div>Loading...</div>
              ) : (
                <div className="grid max-w-full grid-cols-5 gap-6">
                  {listedNfts?.map((nft) => <NFTCard nft={nft} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function NFTCard({ nft }: { nft: ListedNft }) {
  const isMcrtNFT = nft.isMCRT
  const mcrtPrice = useAppSelector((state) => state.mcrtPrice.mcrtPrice)
  const bnbPrice = useAppSelector((state) => state.bnbPrice.bnbPrice)

  const nftPrice = getCurrentPrice(nft)
  const nftPriceDollar =
    isMcrtNFT && mcrtPrice !== undefined
      ? nftPrice * mcrtPrice
      : bnbPrice !== undefined && nftPrice * bnbPrice

  return (
    <Link to={`/marketplace/${nft.contractAddress}/${nft.tokenID}`}>
      <div
        key={nft.tokenID}
        className=" max-w-full rounded-2xl border-2 border-secondary-200"
      >
        <div className="relative">
          <div className="min-h-[]">
            {getThumbnailImage(nft.image).includes('mp4') ? (
              <video
                className="rounded-t-2xl"
                autoPlay
                loop
                muted
                src={getThumbnailImage(nft.image)}
              />
            ) : (
              <img
                className="rounded-t-2xl"
                src={getThumbnailImage(nft.image)}
                alt="avatar"
                loading="lazy"
              />
            )}
          </div>

          <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-primary-400 px-6 py-4">
            <p className="pb-1 font-serif text-xl drop-shadow">
              {nft.name.split(',')[0]}
            </p>

            <div
              className="w-fit rounded-md px-2 text-sm"
              style={{ backgroundColor: getNameBgColor(nft.name) }}
            >
              {nft.name.split(',')[1]?.split('The').join('')}
            </div>
          </div>
        </div>

        <Separator className="via-secondary-100/50" />

        <div className="rounded-b-2xl bg-primary-500 px-3 py-6">
          <div className="flex items-center justify-between gap-2">
            <div className="rounded-full bg-secondary-100/10 px-2 py-1 font-serif">
              {isMcrtNFT ? (
                <div className="flex items-center gap-1">
                  <img className="h-4 w-4" src={mcrtIcon} alt="MCRT" />
                  <div>
                    <span className="pr-1 text-lg">
                      {numberWithCommas(nFormatter(nftPrice, 1))}
                    </span>
                    <span className="text-xs">MCRT</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <img className="h-4 w-4" src={bnbIcon} alt="BNB" />
                  <p className="text-xl">
                    {numberWithCommas(nFormatter(nftPrice, 2))}
                  </p>
                  <span className="text-xs">BNB</span>
                </div>
              )}
            </div>
            <div className="text-secondary-100">
              ${numberWithCommas(nFormatter(nftPriceDollar, 1))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MarketplacePage
