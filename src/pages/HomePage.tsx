import { ArrowUpRight, ArrowRight } from 'lucide-react'
import mcrtIcon from '@/assets/images/mcrt-icon.webp'
import bulletIcon from '@/assets/icons/bullet.svg'
import gamepadIcon from '@/assets/icons/icon-gamepad2.svg'
import walletIcon from '@/assets/icons/icon-wallet.svg'
import peopleIcon from '@/assets/icons/icon-people.svg'
import bnbIcon from '@/assets/icons/icon-bnb.png'

import stakingCard from '@/assets/images/staking-card.webp'
import marketplaceCard from '@/assets/images/marketplace-card.webp'
import gamesCard from '@/assets/images/games-card.webp'

import { Link, useNavigate } from 'react-router-dom'
import { TypographyH1, TypographyH2 } from '@/components/Typography'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import {
  fetchMagicNfts,
  getRecentlySoldNfts,
} from '@/services/api/utils/magicNFT'
import {
  getCurrentPrice,
  getMCRTData,
  getNameBgColor,
  getThumbnailImage,
  numberWithCommas,
  returnClass,
  returnRarity,
  showAmount,
} from '@/lib/helpers'
import React from 'react'
import { VITE_GENESIS_CONTRACT_ADDRESS } from '@/lib/constants'
import nftImages from '@/assets/images/nft-Images.webp'
import { Border } from '@/components/ui/border'
import { Rarity } from './MarketplacePage'
// import { useMagicNFT } from '@/hooks/useContract'

export const utilities = [
  {
    title: 'Genesis Avatar',
    desc: 'Whitelisted users will have the first opportunity to purchase Genesis avatar NFTs during the pre-sale',
  },
  {
    title: 'No Second Chance',
    desc: 'There will be no second chances in MagicCraft to own magnificent Heroes from the Genesis Collection. Good Luck!',
  },
  {
    title: 'Whitelist Spot',
    desc: 'All Genesis NFT holders will be guaranteed a whitelist spot for any future NFT collections',
  },
]

type RecentlyListedNft = {
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

type RecentlyListedNftArray = RecentlyListedNft[]

type NftItem = {
  _id: string
  contractAddress: string
  tokenID: number
  minter: string
  name: string
  description: string
  image: string
  attributes: {
    trait_type: string
    value: string
  }[]
  __v: number
}

type RecentlySoldNft = {
  contractAddress: string
  tokenID: number
  seller: string
  buyer: string
  isMCRT: boolean
  price: number
  soldAt: number
  nftItem: NftItem
}

type RecentlySoldNftsArray = RecentlySoldNft[]

const HeroSection = () => {
  // const ctNFT = useMagicNFT()

  const { data: mcrtData } = useQuery({
    queryKey: ['mcrtData'],
    queryFn: async () => {
      const data = await getMCRTData()

      const finalData = {
        marketCap: data.market_data.market_cap.usd,
        totalVolume: data.market_data.total_volume.usd,
      }
      return finalData
    },
  })

  // useEffect(() => {
  //   async function getMcrtHolders() {
  //     const mcrtHolders = await ctNFT.methods.totalSupply().call()
  //     setMcrtHolders(mcrtHolders)
  //   }

  //   getMcrtHolders()
  // }, [])

  return (
    <section className="relative h-[700px] bg-cover bg-center">
      <div className="grid w-full grid-cols-1 place-items-center gap-2 pb-5 pt-32 md:gap-4">
        <TypographyH1 className="max-w-4xl">Welcome to web3</TypographyH1>
      </div>
      <div className="mx-auto mb-14 h-px w-full max-w-screen-xl bg-gradient-to-r from-transparent via-tertiary-200 to-transparent"></div>

      <div className="relative mx-auto max-w-min  rounded-4xl bg-primary-600 pb-9 pl-6 pr-4 pt-5">
        <div className=" grid snap-x snap-mandatory auto-cols-min grid-flow-col gap-6 overflow-x-auto overscroll-contain overscroll-x-contain">
          <Link to={'/pledging'}>
            <div className="w-56 select-none snap-start">
              <img
                className="pointer-events-none select-none"
                src={stakingCard}
                alt="MagicCraft Pledging"
              />
            </div>
          </Link>

          <Link to={'/marketplace'}>
            <div className="w-56 select-none snap-start ">
              <img
                className="pointer-events-none select-none"
                src={marketplaceCard}
                alt="MagicCraft Marketplace"
              />
            </div>
          </Link>

          <Link to={'https://lobby.magiccraft.io'} rel="noreferrer noopener">
            <div className="w-56 select-none snap-start">
              <img
                className="pointer-events-none select-none"
                src={gamesCard}
                alt="MagicCraft Games"
              />
            </div>
          </Link>
        </div>
      </div>

      <div className="mx-auto w-11/12 max-w-screen-xl rounded-4xl pt-8">
        <div className="rounded-4xl bg-gradient-to-b from-primary-200 to-transparent p-px">
          <div className="h-full space-y-6 rounded-4xl bg-[#0f0625] p-8">
            <div className="text-center md:hidden md:text-left">
              <p className="text-lg text-primary-100 opacity-60">
                Total volume
              </p>
              <p className="font-serif text-2xl text-secondary-100">
                {numberWithCommas(mcrtData?.totalVolume)}
              </p>
            </div>

            {/* Stats Grid for mobile and flex for desktop */}
            <div className="grid grid-cols-2 gap-4 md:flex md:justify-between">
              <div className="hidden space-y-2 md:block">
                <p className="text-lg text-primary-100 opacity-60">
                  Total volume
                </p>
                <p className="font-serif text-xl text-secondary-100">
                  {numberWithCommas(mcrtData?.totalVolume)}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-lg text-primary-100 opacity-60">
                  Total amount of players
                </p>
                <p className="font-serif text-xl text-secondary-100">16,000</p>
              </div>

              <div className="space-y-2">
                <p className="text-lg text-primary-100 opacity-60">
                  Total $MCRT earned
                </p>
                <p className="font-serif text-xl text-secondary-100">657,000</p>
              </div>

              <div className="space-y-2">
                <p className="text-lg text-primary-100 opacity-60">
                  Lobbies created
                </p>
                <p className="font-serif text-xl text-secondary-100">64,000</p>
              </div>

              <div className="space-y-2">
                <p className="text-lg text-primary-100 opacity-60">
                  Total $MCRT holders
                </p>
                <p className="font-serif text-xl text-secondary-100">20,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// const dividerClass =
//   'h-[60px] w-px  bg-gradient-to-b from-transparent via-primary-100 to-transparent'

const HomePage = () => {
  const { data: recentlyListedNfts, status: recentlyListedNftStatus } =
    useQuery<RecentlyListedNftArray>({
      queryKey: ['recentlyListedNFTs'],
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

  const { data: recentlySoldNfts, status: recentlySoldNftStatus } =
    useQuery<RecentlySoldNftsArray>({
      queryKey: ['recentlySoldNFTs'],
      queryFn: async () => {
        const data = await getRecentlySoldNfts(VITE_GENESIS_CONTRACT_ADDRESS)
        return data
      },
    })

  return (
    <>
      <HeroSection />

      <div className="space-y-32 pt-60 md:pt-96 lg:pt-40">
        <section className="relative mx-auto mt-0 w-11/12 max-w-screen-xl">
          <div className="mt-8 space-y-20 md:mt-0">
            <TypographyH2>THIS WEEK</TypographyH2>

            <div className="grid gap-10 md:grid-cols-3">
              <div className="relative rounded-[20px] shadow-xl">
                <div className="absolute -top-8 left-0 right-0 mx-auto grid w-fit place-items-center rounded-4xl bg-tertiary-300 p-[15px]">
                  <img
                    className="h-14 w-14"
                    src={peopleIcon}
                    alt="New players"
                  />
                </div>

                <div className="rounded-[20px] bg-gradient-to-b from-primary-200 to-transparent p-px">
                  <div className="rounded-[20px] bg-primary-400 px-[30px] pb-[30px] pt-[80px]">
                    <div className="w-full space-y-5">
                      <div className="space-y-4">
                        <p className="text-center font-serif text-2xl ">
                          +1233
                        </p>

                        <Separator orientation="horizontal" />

                        <p className="text-center font-sans text-[22px]">
                          New Players
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Button variant={'ghost'}>
                          <div className="flex items-center gap-1.5">
                            <p className="text-[#8EFF49]">Join MagicVerse</p>
                            <ArrowUpRight size={18} color="#8EFF49" />
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative rounded-[20px] shadow-xl">
                <div className="absolute -top-8 left-0 right-0 mx-auto grid w-fit place-items-center rounded-4xl bg-tertiary-300 p-[15px]">
                  <img
                    className="h-14 w-14"
                    src={gamepadIcon}
                    alt="New rounds played"
                  />
                </div>

                <div className="rounded-[20px] bg-gradient-to-b from-primary-200 to-transparent p-px">
                  <div className="rounded-[20px] bg-primary-400 px-[30px] pb-[30px] pt-[80px]">
                    <div className="w-full space-y-5">
                      <div className="space-y-4">
                        <p className="text-center font-serif text-2xl ">
                          +14,239
                        </p>

                        <Separator orientation="horizontal" />

                        <p className="text-center font-sans text-[22px]">
                          New rounds played
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Button variant={'ghost'}>
                          <div className="flex items-center gap-1.5">
                            <p className="text-[#8EFF49]">Play a round</p>
                            <ArrowUpRight size={18} color="#8EFF49" />
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative rounded-[20px] shadow-xl">
                <div className="absolute -top-8 left-0 right-0 mx-auto grid w-fit place-items-center rounded-4xl bg-tertiary-300 p-[15px]">
                  <img
                    className="h-14 w-14"
                    src={walletIcon}
                    alt="Earned by players"
                  />
                </div>

                <div className="rounded-[20px] bg-gradient-to-b from-primary-200 to-transparent p-px">
                  <div className="rounded-[20px] bg-primary-400 px-[30px] pb-[30px] pt-[80px]">
                    <div className="w-full space-y-5">
                      <div className="space-y-4">
                        <p className="text-center font-serif text-2xl ">
                          +130,000
                        </p>

                        <Separator orientation="horizontal" />

                        <p className="text-center font-sans text-[22px]">
                          Earned by players
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <Button variant={'ghost'}>
                          <div className="flex items-center gap-1.5">
                            <p className="text-secondary-100">Start earning</p>
                            <ArrowUpRight size={18} color="#98FFF9" />
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto mt-0 w-11/12 max-w-screen-xl">
          <div className="space-y-14">
            <TypographyH2>Recent transactions</TypographyH2>
            <div className="grid gap-2.5 lg:grid-cols-2">
              <div className="space-y-8 rounded-4xl bg-primary-400 p-4">
                <div className="min-h-[500px] rounded-[20px] bg-primary-300 px-5 py-5">
                  <div className="pb-5">
                    <h4 className="text-center font-serif text-lg font-semibold tracking-wider text-white/90">
                      Recently Listed
                    </h4>
                  </div>
                  {recentlyListedNftStatus === 'error' ? (
                    <div className="w-full pt-5 text-center">
                      Something went wrong
                    </div>
                  ) : recentlyListedNftStatus === 'pending' ? (
                    <div className="w-full pt-5 text-center">Loading...</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-tertiary-200/40 to-transparent"></div>
                      {recentlyListedNfts
                        ?.slice(0, 10)
                        ?.map((nft) => (
                          <RecentlyListedNftItem key={nft.tokenID} {...nft} />
                        ))}
                    </div>
                  )}
                </div>
                <div className="grid place-items-center">
                  <Button asChild variant={'ghost'} className="gap-2">
                    <Link to={'/marketplace'}>
                      <ArrowRight size={18} color="#fff" />
                      <p className="text-lg">View more on Marketplace</p>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Recently sold */}
              <div className="space-y-8 rounded-4xl bg-primary-400 p-4">
                <div className="min-h-[500px] rounded-[20px] bg-primary-300 px-5 py-5">
                  <div className="pb-5">
                    <h4 className="text-center font-serif text-lg font-semibold tracking-wider text-white/90">
                      Recently Sold
                    </h4>
                  </div>
                  {recentlySoldNftStatus === 'error' ? (
                    <div className="w-full pt-5 text-center">
                      Something went wrong
                    </div>
                  ) : recentlySoldNftStatus === 'pending' ? (
                    <div className="w-full pt-5 text-center">Loading...</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-tertiary-200/40 to-transparent"></div>
                      {recentlySoldNfts
                        ?.slice(0, 10)
                        ?.map((nft) => (
                          <RecentlySoldNftItem key={nft.tokenID} {...nft} />
                        ))}
                    </div>
                  )}
                </div>
                <div className="grid place-items-center">
                  <Button asChild variant={'ghost'} className="gap-2">
                    <Link to={'/marketplace'}>
                      <ArrowRight size={18} color="#fff" />
                      <p className="text-lg">View more on Marketplace</p>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <img src={nftImages} alt="" />
        </section>

        <section className="relative mx-auto w-11/12 max-w-screen-xl space-y-20">
          <div className="space-y-8">
            <TypographyH2>NFT Utilities</TypographyH2>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {[
                'Unique skills, spells and abilities',
                'Access to realms, events and raids',
                'Access to additional Summoning Portal features',
                'Access to the Hall of Ancients',
                'Access to VIP Play-To-Earn lobbies',
              ].map((val) => (
                <div
                  key={val}
                  className="flex items-center gap-3 whitespace-nowrap rounded-4xl bg-tertiary-300/30 px-5 py-2 backdrop-blur-md"
                >
                  <img
                    className="shrink-0 "
                    src={bulletIcon}
                    alt="List item "
                  />
                  <p className="text-lg md:text-[22px]">{val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
            {utilities.map((item, i) => {
              return (
                <div
                  key={i}
                  className="rounded-4xl bg-gradient-to-b from-primary-200 to-transparent p-px shadow-2xl"
                >
                  <div className="rounded-4xl  bg-primary-400 p-10">
                    {/* <div>
                          <p className="rotate-180 whitespace-nowrap text-lg uppercase leading-none tracking-widest text-[#bd6ae182] [writing-mode:vertical-lr]">
                            Approach
                          </p>
                        </div> */}
                    <div className="space-y-4">
                      <h4 className="font-serif text-[21px] text-tertiary-100">
                        {item.title}
                      </h4>
                      <p className="text-xl">{item.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center">
            <button>
              <Link to="/marketplace">
                <div className="rounded-md border border-[#98FFF9] px-9 py-4 text-[22px] text-[#98FFF9] transition hover:bg-[#98FFF9] hover:text-[#03082F]">
                  Go to marketplace
                </div>
              </Link>
            </button>
          </div>
        </section>

       
      </div>
    </>
  )
}

const RecentlyListedNftItem = (nft: RecentlyListedNft) => {
  const navigate = useNavigate()

  const rarity = returnRarity(nft)
  const isVideo = nft?.image?.includes('mp4')
  const _class = returnClass(nft)

  const goToNftDetail = () => {
    navigate(`/nft/${nft.contractAddress}/${nft.tokenID}`)
  }

  return (
    <React.Fragment>
      <div
        onClick={goToNftDetail}
        className="grid cursor-pointer grid-cols-2 gap-3 rounded-lg bg-[#16182d] p-4 hover:bg-[#1d1f3d]"
      >
        <div className="flex gap-3">
          <div>
            {isVideo ? (
              <video
                loop
                muted
                autoPlay
                src={getThumbnailImage(nft?.image)}
                className="h-16 w-16 rounded-sm"
              />
            ) : (
              <Border
                className="h-fit w-fit rounded-sm p-1"
                variant={rarity?.toLowerCase() as Rarity}
              >
                <img
                  src={getThumbnailImage(nft?.image)}
                  alt="nft"
                  className="h-14 w-14 rounded-sm"
                />
              </Border>
            )}
          </div>
          <div className="space-y-1 font-inter">
            <p className="text-base font-bold text-white">
              {nft?.name?.split(',')[0]}
            </p>
            {_class && (
              <div
                className="w-fit rounded p-1 text-xs font-semibold text-white"
                style={{
                  backgroundColor: getNameBgColor(nft.name),
                }}
              >
                {_class}
              </div>
            )}
            {rarity && <p className="text-sm text-[#76779A]">{rarity}</p>}
          </div>
        </div>

        <div className="flex flex-col xl:flex-row justify-between">
          <div className="space-y-1">
            <p className="text-xs text-tertiary-100 opacity-50">Seller</p>
            <p className="text-sm text-white">
              {nft.seller.substring(0, 7).concat('..') +
                nft.seller.substring(nft.seller.length - 3)}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-tertiary-100 opacity-50">Price</p>
            <div className="flex items-center gap-2">
              {nft.isMCRT ? (
                <img className="h-4 w-4" src={mcrtIcon} alt="mcrt-logo" />
              ) : (
                <img className="h-4 w-4" src={bnbIcon} alt="bnb-logo" />
              )}
              <p className="text-sm text-white">
                {numberWithCommas(getCurrentPrice(nft)?.toFixed(0))}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-2 via-tertiary-200/40" />
    </React.Fragment>
  )
}

const RecentlySoldNftItem = (nft: RecentlySoldNft) => {
  const navigate = useNavigate()
  const isVideo = nft?.nftItem?.image?.includes('mp4')
  const rarity = returnRarity(nft?.nftItem)
  const _class = returnClass(nft?.nftItem)

  const goToNftDetail = () => {
    navigate(`/nft/${nft.contractAddress}/${nft.tokenID}`)
  }

  
  return (
    <React.Fragment>
      <div
        onClick={goToNftDetail}
        className="cursor-pointer p-4 bg-[#16182d] rounded-lg hover:bg-[#1d1f3d] grid md:grid-cols-3 lg:gap-0  xl:gap-4 items-center lg:grid-cols-recently-sold  " // Three-column grid for mobile
      >
        {/* NFT Image and Details */}
        <div className="flex gap-3  ">
          <div>
            {isVideo ? (
              <video
                loop
                muted
                autoPlay
                src={getThumbnailImage(nft?.nftItem?.image)}
                className="h-16 w-16 rounded-sm"
              />
            ) : (
              <Border
                className="h-fit w-fit rounded-sm p-1"
                variant={rarity?.toLowerCase() as Rarity}
                            >
                <img
                  src={getThumbnailImage(nft?.nftItem?.image)}
                  alt="nft"
                  className="h-14 w-14 rounded-sm"
                />
              </Border>
            )}
          </div>
          <div className="space-y-1 font-inter">
            <p className="text-base font-bold text-white">
              {nft?.nftItem?.name?.split(',')[0]}
            </p>
            {_class && (
              <div
                className="w-fit rounded p-1 text-xs font-semibold text-white"
                style={{
                  backgroundColor: getNameBgColor(nft.nftItem.name),
                }}
              >
                {_class}
              </div>
            )}
            {rarity && <p className="text-sm text-[#76779A]">{rarity}</p>}
          </div>
        </div>

        {/* Buyer Section */}
        <div className='flex md:flex-col  gap-4 ml-10 mt-4 md:mt-0 '>
        <div className="space-y-1 col-span-1">
          <p className="text-xs text-tertiary-100 opacity-50">Buyer</p>
          <p className="text-sm text-white">
            {nft.buyer.substring(0, 4).concat('..') +
              nft.buyer.substring(nft.buyer.length - 3)}
          </p>
        </div>

        {/* Seller Section */}
        <div className="space-y-1 col-span-1">
          <p className="text-xs text-tertiary-100 opacity-50">Seller</p>
          <p className="text-sm text-white">
            {nft.seller.substring(0, 4).concat('..') +
              nft.seller.substring(nft.seller.length - 3)}
          </p>
        </div>
        </div>

        {/* Price Section */}
        <div className="space-y-1 col-span-1 ml-10 ">
          <p className="text-xs text-tertiary-100 opacity-50">Price</p>
          <div className="flex items-center gap-2">
            {nft.isMCRT ? (
              <img className="h-4 w-4" src={mcrtIcon} alt="mcrt-logo" />
            ) : (
              <img className="h-4 w-4" src={bnbIcon} alt="bnb-logo" />
            )}
            <p className="text-sm text-white">
              {numberWithCommas(showAmount(nft?.price, nft?.isMCRT).toFixed(0))}
            </p>
          </div>
        </div>
      </div>
      <Separator className="my-2 via-tertiary-200/40" />
    </React.Fragment>
  )
}

export default HomePage
