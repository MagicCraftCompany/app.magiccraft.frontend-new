import { Play, ArrowUpRight, ArrowRight } from 'lucide-react'
import { roadmapData } from '@/data/roadmapData'
import FaqAccordion from '@/components/Accordion/FaqAccordion'
import RoadmapCard from '@/components/Cards/RoadmapCard'

import mcrtIcon from '@/assets/images/mcrt-icon.webp'
import mcEcosystem from '@/assets/images/ecosystem.webp'
import magiccraftCard from '@/assets/images/magiccraft-card.webp'
import magic8ballCard from '@/assets/images/magic-8-ball-card.webp'
import magicRunnerCard from '@/assets/images/magic-runner-card.webp'
import magiccraftText from '@/assets/images/magiccraft-text.png'
import bulletIcon from '@/assets/icons/bullet.svg'
import gamepadIcon from '@/assets/icons/icon-gamepad2.svg'
import walletIcon from '@/assets/icons/icon-wallet.svg'
import peopleIcon from '@/assets/icons/icon-people.svg'

import stakingCard from '@/assets/images/staking-card.webp'
import marketplaceCard from '@/assets/images/marketplace-card.webp'
import gamesCard from '@/assets/images/games-card.webp'

import strength1 from '@/assets/images/strength1.png'
import strength2 from '@/assets/images/strength2.png'
import strength3 from '@/assets/images/strength3.png'

import bybit from '@/assets/icons/bybit.svg'
import huobi from '@/assets/icons/huobi.svg'
import gateio from '@/assets/icons/gateio.svg'
import bitget from '@/assets/icons/bitget.svg'
import bitmart from '@/assets/icons/bitmart.svg'
import pancakeswap from '@/assets/icons/pancakeswap.svg'
import mexc from '@/assets/icons/mexc.svg'
import uniswap from '@/assets/icons/uniswap.svg'
import wingswap from '@/assets/icons/wingswap.svg'
import bitrue from '@/assets/icons/bitrue.svg'
import raydium from '@/assets/icons/raydium.svg'
import spookyswap from '@/assets/icons/spookyswap.svg'
import { Link } from 'react-router-dom'
import { TypographyH1, TypographyH2 } from '@/components/Typography'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchMagicNfts } from '@/services/api/utils/magicNFT'
import {
  getCurrentPrice,
  getNameBgColor,
  getThumbnailImage,
  returnClass,
  returnRarity,
} from '@/lib/helpers'
import React from 'react'

const foundation = [
  {
    title: 'Scouting Top Talent:',
    desc: 'Join our quest to attract industry-leading minds, ensuring our development team is second to none in skill and innovation.',
  },
  {
    title: 'Transitioning to a Full-fledged Game Development Studio:',
    desc: "We're transforming into a comprehensive game development studio, capable of producing a consistent stream of high-quality titles.",
  },
  {
    title: 'Harnessing In-House Innovation:',
    desc: "With a robust in-house team, we'll iterate quickly, test new concepts, and bring groundbreaking games to market faster than ever before.",
  },
]

const strengths = [
  {
    title: 'Diversified Revenue Streams:',
    desc: 'We understand the cyclical nature of markets and proactively diversify our revenue channels for stability and growth.',
    image: strength1,
  },

  {
    title: 'Prudent Financial Management:',
    desc: 'Our commitment to fiscal responsibility ensures lean operations and strategic expenditures for a solid foundation.',
    image: strength2,
  },
  {
    title: 'Adaptive Game Development Strategy:',
    desc: 'We adapt to player behavior shifts and economic trends to ensure consistent engagement.',
    image: strength3,
  },
]

const partners = [
  {
    name: 'Bybit',
    icon: bybit,
  },
  {
    name: 'Huobi',
    icon: huobi,
  },
  {
    name: 'Gate.io',
    icon: gateio,
  },
  {
    name: 'Bitget',
    icon: bitget,
  },
  {
    name: 'Bitmart',
    icon: bitmart,
  },
  {
    name: 'Pancakeswap',
    icon: pancakeswap,
  },
  {
    name: 'Mexc Global',
    icon: mexc,
  },
  {
    name: 'Uniswap',
    icon: uniswap,
  },
  {
    name: 'Wingswap',
    icon: wingswap,
  },
  {
    name: 'Bitrue',
    icon: bitrue,
  },
  {
    name: 'Raydium',
    icon: raydium,
  },
  {
    name: 'Spookyswap',
    icon: spookyswap,
  },
]

const HeroSection = () => {
  return (
    <section className="relative h-[700px] bg-cover bg-center">
      <div className="grid w-full grid-cols-1 place-items-center gap-2 pb-5 pt-32 md:gap-4">
        <TypographyH1 className="max-w-4xl">Welcome to web3</TypographyH1>
      </div>
      <div className="mx-auto mb-14 h-px w-full max-w-screen-xl bg-gradient-to-r from-transparent via-tertiary-200 to-transparent"></div>

      <div className="bg-primary-600 relative mx-auto  max-w-min rounded-4xl pb-9 pl-6 pr-4 pt-5">
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
          <div className="flex h-full flex-row items-center justify-between rounded-4xl  bg-[#0f0625] p-8">
            <div className="space-y-2">
              <p className="text-lg text-primary-100 opacity-60">
                Total amount of players
              </p>
              <p className="font-serif text-xl text-secondary-100">16000</p>
            </div>
            <div className={dividerClass} />

            <div className="space-y-2">
              <p className="text-lg text-primary-100 opacity-60">
                Total amount of players
              </p>
              <p className="font-serif text-xl text-secondary-100">16000</p>
            </div>

            <div className={dividerClass} />

            <div className="space-y-2">
              <p className="text-lg text-primary-100 opacity-60">
                Total amount of players
              </p>
              <p className="font-serif text-xl text-secondary-100">16000</p>
            </div>

            <div className={dividerClass} />

            <div className="space-y-2">
              <p className="text-lg text-primary-100 opacity-60">
                Total amount of players
              </p>
              <p className="font-serif text-xl text-secondary-100">16000</p>
            </div>
            <div className={dividerClass} />

            <div className="space-y-2">
              <p className="text-lg text-primary-100 opacity-60">
                Total amount of players
              </p>
              <p className="font-serif text-xl text-secondary-100">16000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const dividerClass =
  'h-[60px] w-px  bg-gradient-to-b from-transparent via-primary-100 to-transparent'

const HomePage = () => {
  const { data: recentlyListedNfts, status: recentlyListedNftStatus } =
    useQuery({
      queryKey: ['recentlyListedNFTs'],
      queryFn: async () => {
        const data = await fetchMagicNfts(0)
        return data.listedNfts.length > 0 ? data.listedNfts : []
      },
    })

  const queryClient = useQueryClient()

  queryClient.invalidateQueries({ queryKey: ['recentlyListedNFTs'] })
  console.log({ recentlyListedNfts, recentlyListedNftStatus })
  console.log(recentlyListedNfts)
  return (
    <>
      <HeroSection />

      <div className="space-y-32 pt-60 md:pt-96 lg:pt-40">
        <section className="relative mx-auto mt-0 w-11/12 max-w-screen-xl">
          <div className="space-y-20">
            <TypographyH2 className="text-balance bg-gradient-to-b from-white to-white/75 bg-clip-text text-center font-serif text-4xl text-transparent drop-shadow-xl">
              THIS WEEK
            </TypographyH2>

            <div className="grid grid-cols-3 gap-10">
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
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-8 rounded-4xl bg-primary-400 p-4">
                <div className="min-h-[500px] rounded-[20px] bg-primary-300 px-5 py-5">
                  <div className="pb-5">
                    <h4 className="text-center font-inter text-lg font-semibold tracking-wider text-white/90">
                      Recently Listed
                    </h4>
                  </div>
                  {recentlyListedNftStatus === 'error' ? (
                    <div>Something went wrong</div>
                  ) : recentlyListedNftStatus === 'pending' ? (
                    <div>Loading...</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-tertiary-200/40 to-transparent"></div>
                      {recentlyListedNfts?.slice(0, 10)?.map((nft, idx) => {
                        const rarity = returnRarity(nft)
                        const isVideo = nft.image.includes('mp4')
                        const _class = returnClass(nft)
                        console.log(_class)
                        return (
                          <React.Fragment key={idx}>
                            <div className="flex justify-between gap-3">
                              <div className="flex gap-2">
                                <div>
                                  {isVideo ? (
                                    <video
                                      loop
                                      muted
                                      autoPlay
                                      src={getThumbnailImage(nft.image)}
                                      className="h-16 w-16"
                                    />
                                  ) : (
                                    <img
                                      src={getThumbnailImage(nft.image)}
                                      alt="nft"
                                      className="h-16 w-16"
                                    />
                                  )}
                                </div>
                                <div className="space-y-1 font-inter">
                                  <p className="text-base font-bold text-white">
                                    {nft?.name?.split(',')[0]}
                                  </p>
                                  {_class && (
                                    <div
                                      className="p-1 text-xs font-semibold text-white"
                                      style={{
                                        backgroundColor: getNameBgColor(
                                          nft.name
                                        ),
                                      }}
                                    >
                                      {_class}
                                    </div>
                                  )}
                                  {rarity && (
                                    <p className="text-sm text-[#76779A]">
                                      {rarity}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-1">
                                <p className="text-sm text-tertiary-100 opacity-50">
                                  Seller
                                </p>

                                <p>
                                  {nft.seller.substring(0, 4).concat('..') +
                                    nft.seller.substring(nft.seller.length - 3)}
                                </p>
                              </div>

                              <div className="space-y-1">
                                <p className="text-sm text-tertiary-100 opacity-50">
                                  Price
                                </p>

                                <div className="">
                                  {/* {nft.isMCRT ? (
                                    <img src={mcrtLogo} alt="mcrt-logo" />
                                  ) : (
                                    <img src={bnbLogo} alt="bnb-logo" />
                                  )} */}
                                  <h2>
                                    {/* {getCurrentPrice(nft) === 0
                                      ? null
                                      : breakpoint.sm
                                        ? numberWithCommas(
                                            getCurrentPrice(nft).toFixed(0)
                                          )
                                        : numberWithCommas(
                                            nFormatter(
                                              getCurrentPrice(nft).toFixed(0),
                                              1
                                            )
                                          )} */}
                                  </h2>
                                </div>

                                <p></p>
                              </div>
                            </div>
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-tertiary-200/40 to-transparent"></div>
                          </React.Fragment>
                        )
                      })}
                    </div>
                  )}
                </div>
                <div className="grid place-items-center">
                  <Button variant={'ghost'} className="gap-2">
                    <ArrowRight size={18} color="#fff" />
                    <p className="text-lg">View more on Marketplace</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto w-11/12 max-w-screen-xl">
          <div className="space-y-20">
            <h2 className="text-balance bg-gradient-to-b from-white to-white/75 bg-clip-text text-center font-serif text-4xl text-transparent drop-shadow-xl md:text-[54px] md:leading-[3.5rem]">
              COMPLETE OVERHAUL OF THE MAGICCRAFT GAME
            </h2>
            <div className="flex flex-col items-center md:flex-row">
              <div className="w-4/5 md:w-2/5">
                <div className=" grid grid-cols-1 place-items-center gap-2 rounded-t-4xl border-x border-t border-[#3F3F7A] bg-[#11113A] p-10 shadow-lg md:rounded-l-4xl md:rounded-r-none md:border-y md:border-l md:border-r-0 ">
                  <div className="max-w-10 md:max-w-20">
                    <img src={mcrtIcon} alt="MCRT" />
                  </div>

                  <div className="max-w-[350px]">
                    <img src={magiccraftText} alt="" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-3/5">
                <div className="rounded-4xl bg-gradient-to-b from-[#B591F2] to-transparent p-px">
                  <div className="rounded-4xl bg-gradient-to-r  from-[#2A0D4E] to-[#57186D] to-90%">
                    <div className="bg-black/20 px-12 py-8">
                      <h3 className="font-serif text-3xl">Features</h3>
                    </div>

                    <div className="space-y-6 px-12 py-10">
                      <div>
                        <p className="text-xl">
                          Let&apos;s dive into the exciting changes and new
                          features coming to the MagicCraft game:
                        </p>
                      </div>

                      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C09AFF] to-transparent" />

                      <div className="grid grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <img src={bulletIcon} alt="List item" />
                          <p className="text-[22px] text-[#C09AFF]">
                            <span className="font-bold text-[#ECE0FF]">
                              Elevated UI/UX:&nbsp;
                            </span>
                            Immerse yourself in an enhanced interface for a
                            seamless gaming experience.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src={bulletIcon} alt="List item" />
                          <p className="text-[22px] text-[#C09AFF]">
                            <span className="font-bold text-[#ECE0FF]">
                              Multiplayer System:&nbsp;
                            </span>
                            A 5v5 quick play mode with automated matchmaking is
                            coming to MagicCraft.
                          </p>
                        </div>{' '}
                        <div className="flex items-center gap-2">
                          <img src={bulletIcon} alt="List item" />
                          <p className="text-[22px] text-[#C09AFF]">
                            <span className="font-bold text-[#ECE0FF]">
                              Seasonal Progression:&nbsp;
                            </span>
                            New league system, daily tasks, and ranked play to
                            enable progression.
                          </p>
                        </div>{' '}
                        <div className="flex items-center gap-2">
                          <img src={bulletIcon} alt="List item" />
                          <p className="text-[22px] text-[#C09AFF]">
                            <span className="font-bold text-[#ECE0FF]">
                              Dynamic In-game Market:&nbsp;
                            </span>
                            A new in-game store packed with utilities for MCRT.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto w-11/12 max-w-screen-xl space-y-20">
          <div className="space-y-8">
            <h2 className="text-balance bg-gradient-to-b from-white to-white/75 bg-clip-text text-center font-serif text-4xl text-transparent drop-shadow-xl md:text-[54px] md:leading-[3.5rem]">
              Strengthening Our Foundation
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {[
                'Industry-leading minds',
                'Comprehensive game development studio',
                'High-quality titles',
                'In-house team',
                'Groundbreaking games',
              ].map((val) => (
                <div
                  key={val}
                  className="flex items-center gap-3 whitespace-nowrap rounded-4xl bg-[#4312694D] px-5 py-2 backdrop-blur-md"
                >
                  <img
                    className="shrink-0 "
                    src={bulletIcon}
                    alt="List item "
                  />
                  <p className="text-lg md:text-2xl">{val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
            {foundation.map((item, i) => {
              return (
                <div
                  key={i}
                  className="rounded-4xl bg-gradient-to-b  from-[#3F3F7A] to-transparent p-px"
                >
                  <div className="rounded-4xl  bg-[#11113A] p-10">
                    {/* <div>
                          <p className="rotate-180 whitespace-nowrap text-lg uppercase leading-none tracking-widest text-[#bd6ae182] [writing-mode:vertical-lr]">
                            Approach
                          </p>
                        </div> */}
                    <div className="space-y-4">
                      <h4 className="font-serif text-[21px] text-[#C09AFF]">
                        {item.title}
                      </h4>
                      <p className="text-balance text-xl">{item.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center">
            <button>
              <a
                rel="noreferrer noopener"
                href="https://magiccraft.io/contact-us"
              >
                <div className="rounded-md border border-[#98FFF9] px-9 py-4 text-[22px] text-[#98FFF9] transition hover:bg-[#98FFF9] hover:text-[#03082F]">
                  Contact us
                </div>
              </a>
            </button>
          </div>
        </section>

        <section className="relative mx-auto w-11/12 max-w-screen-xl space-y-20">
          <h2 className="text-balance bg-gradient-to-b from-white to-white/75 bg-clip-text text-center font-serif text-4xl text-transparent drop-shadow-xl md:text-[54px] md:leading-[3.5rem]">
            our strengths
          </h2>

          <div className="grid snap-x snap-mandatory auto-cols-auto grid-flow-col items-stretch gap-6 overflow-x-auto overscroll-x-contain md:gap-8">
            {strengths.map((item, i) => {
              return (
                <div
                  key={i}
                  className="min-w-80 snap-start rounded-4xl bg-gradient-to-b from-[#3F3F7A]  to-transparent p-px md:w-full "
                >
                  <div className="relative gap-8 overflow-y-auto rounded-4xl bg-[#11113A] px-8 pb-8 pt-36 shadow-xl lg:px-10 lg:pb-10 lg:pt-52">
                    <div className="absolute left-0 top-0 -z-0">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-[#11113A] to-55%"></div>
                    <div className="relative z-10 space-y-6 lg:space-y-8">
                      <h3 className="bg-gradient-to-b from-white to-white/75 bg-clip-text font-serif text-[25px] text-transparent lg:text-[32px]">
                        {item.title}
                      </h3>

                      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#98FFF9] to-transparent" />

                      <p className="text-balance text-2xl lg:text-3xl">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="relative mx-auto w-11/12 max-w-screen-xl space-y-10 md:space-y-20">
          <h2 className="text-balance bg-gradient-to-b from-white to-white/75 bg-clip-text text-center font-serif text-4xl text-transparent drop-shadow-xl md:text-[54px] md:leading-[3.5rem]">
            Global Horizons
          </h2>

          <div className="space-y-20 md:space-y-8">
            <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
              <div className="rounded-4xl bg-gradient-to-b  from-[#3F3F7A] to-transparent p-px ">
                <div className="relative gap-8 overflow-hidden rounded-4xl bg-[#11113A] px-10 pb-10 pt-20 shadow-xl">
                  <div className="absolute left-5 top-5 z-10 rounded-full bg-black/60 px-4 py-[5px] text-[#98FFF9]">
                    Step #1
                  </div>
                  <div className="space-y-4 md:space-y-[18px]">
                    <h3 className="font-serif text-3xl text-[#C09AFF] md:text-[32px]">
                      Strategic Partnerships
                    </h3>
                    <p className="text-base md:text-lg">
                      We aim to forge alliances with regional influencers,
                      gaming communities, and distribution platforms to amplify
                      our presence.
                    </p>

                    <a
                      className="flex cursor-pointer items-center gap-2 text-[#98FFF9]"
                      rel="noreferrer noopener"
                      href="https://magiccraft.io/partnership"
                    >
                      <span>Become a partner</span>
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="rounded-4xl bg-gradient-to-b  from-[#3F3F7A] to-transparent p-px ">
                <div className="relative gap-8 overflow-hidden rounded-4xl bg-[#11113A] px-10 pb-10 pt-20 shadow-xl">
                  <div className="absolute left-5 top-5 z-10 rounded-full bg-black/60 px-4 py-[5px] text-[#98FFF9]">
                    Step #2
                  </div>
                  <div className="space-y-4 md:space-y-[18px]">
                    <h3 className="font-serif text-3xl text-[#C09AFF] md:text-[32px]">
                      Focus on High-Growth Regions
                    </h3>
                    <p className="text-base md:text-lg">
                      Our primary attention is on promising markets in Asia,
                      South Asia, and South East Asia, aligning with our
                      expansion strategy.
                    </p>

                    <a
                      className="flex cursor-pointer items-center gap-2 text-[#98FFF9]"
                      rel="noreferrer noopener"
                      href="https://magiccraft.io/partnership"
                    >
                      <span>Collaborate</span>
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-balance bg-gradient-to-b from-white to-white/75 bg-clip-text text-center font-serif text-4xl text-transparent drop-shadow-xl">
                Join them
              </h3>
              <div className="grid grid-cols-3 gap-5 md:grid-cols-4">
                {partners.map((item) => {
                  return (
                    <div
                      key={item.name}
                      className="grid h-20 place-items-center bg-[#161E4A]  md:h-36"
                    >
                      <img className="px-2 " src={item.icon} alt={item.name} />
                    </div>
                  )
                })}
              </div>

              <div className="block h-px w-full bg-gradient-to-r from-transparent via-[#9255E0] to-transparent md:hidden" />
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="absolute -top-40 left-0 right-0 -z-10 mx-auto aspect-square max-h-[700px] w-full max-w-[700px]  rounded-full bg-[#1E025B] opacity-30 blur-[170px]" />

          <div className="space-y-20">
            <div className="space-y-8">
              <h2 className="text-balance bg-gradient-to-b from-white to-white/75 bg-clip-text text-center font-serif text-4xl text-transparent drop-shadow-xl md:text-[54px] md:leading-[3.5rem]">
                Roadmap
              </h2>
              <div className="mx-auto w-fit rounded-full bg-[#4457B84D] px-5 py-3 text-lg text-[#98FFF9] backdrop-blur">
                2024
              </div>
            </div>

            <div className="mx-auto grid snap-x snap-mandatory scroll-p-4 auto-cols-auto grid-flow-col gap-8 overflow-x-auto overscroll-x-contain px-4 lg:max-w-screen-xl">
              {roadmapData.map((data) => (
                <RoadmapCard data={data} key={data.quarter} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default HomePage
