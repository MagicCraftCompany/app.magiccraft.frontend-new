import { TypographyH1 } from '@/components/Typography'
import { Separator } from '@/components/ui/separator'
import {
  GEM_PACK_DATA,
  GemPack,
  VITE_GENESIS_CONTRACT_ADDRESS,
  VITE_REVELATION_CONTRACT_ADDRESS,
} from '@/lib/constants'
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
import { Link, useSearchParams } from 'react-router-dom'
import mcrtIcon from '@/assets/icons/icon-mcrt.png'
import bnbIcon from '@/assets/icons/icon-bnb.png'
import { cn } from '@/lib/utils'
import charactersTabIcon from '@/assets/images/characters-tab-icon.png'
import itemsTabIcon from '@/assets/images/items-tab-icon.png'
import landsTabIcon from '@/assets/images/lands-tab-icon.png'

import rareNftIcon from '@/assets/images/rare-nft-icon.png'
import epicNftIcon from '@/assets/images/epic-nft-icon.png'
import legendaryNftIcon from '@/assets/images/legendary-nft-icon.png'

import { GiBloodySword, GiBroadheadArrow, GiMagicSwirl } from 'react-icons/gi'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Border } from '@/components/ui/border'

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

type Rarity = 'rare' | 'epic' | 'legendary'

const MarketplacePage = () => {
  const mcrtPrice = useAppSelector((state) => state.mcrtPrice.mcrtPrice)
  const bnbPrice = useAppSelector((state) => state.bnbPrice.bnbPrice)

  const [searchParams, setSearchParams] = useSearchParams({
    collection: 'genesis',
    sort: 'desc',
    tab: 'characters',
    type: 'all',
    games: 'all',
  })

  const [rarity, setRarity] = useState<Rarity[]>(() => [
    'rare',
    'epic',
    'legendary',
  ])

  const currentCollection = searchParams.get('collection')
  const currentSort = searchParams.get('sort')
  const currentTab = searchParams.get('tab')
  const currentType = searchParams.get('type')
  const currentGame = searchParams.get('games')

  const toggleRarity = (rarityValue: Rarity) => {
    setRarity((prevRarity) => {
      const hasRarity = prevRarity.includes(rarityValue)
      if (hasRarity) {
        return prevRarity.filter((r) => r !== rarityValue)
      } else {
        return [...prevRarity, rarityValue]
      }
    })
  }

  const { data: genesisNfts, status: genesisNftStatus } =
    useQuery<ListedNftArray>({
      queryKey: ['genesisNFTs'],
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

  const { data: revelationNFTs, status: revelationNftStatus } =
    useQuery<ListedNftArray>({
      queryKey: ['revelationNFTs'],
      queryFn: async () => {
        const data = await fetchMagicNfts(
          0,
          VITE_REVELATION_CONTRACT_ADDRESS,
          undefined,
          true
        )
        return data.listedNfts.length > 0 ? data.listedNfts : []
      },
    })

  const [filteredRevelationNFTs, setFilteredRevelationNFTs] = useState(
    revelationNFTs ?? []
  )
  const [filteredGenesisNFTs, setFilteredGenesisNFTs] = useState(
    genesisNfts ?? []
  )

  useEffect(() => {
    const filteredNFTs = revelationNFTs?.filter((nft) =>
      rarity.includes(
        nft.attributes
          .find((attr) => attr.trait_type === 'rarity')
          ?.value.toLowerCase() as Rarity
      )
    )

    if (filteredNFTs) setFilteredRevelationNFTs(filteredNFTs)
  }, [rarity, revelationNFTs])

  useEffect(() => {
    const filteredNFTs = genesisNfts?.filter((nft) =>
      rarity.includes(
        nft.attributes
          .find((attr) => attr.trait_type === 'rarity')
          ?.value.toLowerCase() as Rarity
      )
    )

    if (filteredNFTs) setFilteredGenesisNFTs(filteredNFTs)
  }, [rarity, genesisNfts])

  // useEffect(() => {
  //   const sortedNFTs = [...filteredRevelationNFTs].sort((a, b) => {
  //     const nftPriceA = getCurrentPrice(a)
  //     const nftPriceDollarA = mcrtPrice !== undefined && nftPriceA * mcrtPrice

  //     const nftPriceB = getCurrentPrice(b)
  //     const nftPriceDollarB = mcrtPrice !== undefined && nftPriceB * mcrtPrice

  //     if (currentSort === 'asc') {
  //       return (nftPriceDollarA as number) - (nftPriceDollarB as number) // Ascending order
  //     } else {
  //       return (nftPriceDollarB as number) - (nftPriceDollarA as number) // Descending order
  //     }
  //   })

  //   setFilteredRevelationNFTs(sortedNFTs)
  // }, [currentSort, mcrtPrice])

  // useEffect(() => {
  //   const sortedNFTs = [...filteredGenesisNFTs].sort((a, b) => {
  //     const isMcrtNFTA = a.isMCRT
  //     const isMcrtNFTB = b.isMCRT

  //     const nftPriceA = getCurrentPrice(a)
  //     const nftPriceDollarA =
  //       bnbPrice &&
  //       mcrtPrice &&
  //       (isMcrtNFTA ? nftPriceA * mcrtPrice : nftPriceA * bnbPrice)

  //     const nftPriceB = getCurrentPrice(b)
  //     const nftPriceDollarB =
  //       bnbPrice &&
  //       mcrtPrice &&
  //       (isMcrtNFTB ? nftPriceB * mcrtPrice : nftPriceB * bnbPrice)

  //     if (currentSort === 'asc') {
  //       return (nftPriceDollarA as number) - (nftPriceDollarB as number) // Ascending order
  //     } else {
  //       return (nftPriceDollarB as number) - (nftPriceDollarA as number) // Descending order
  //     }
  //   })

  //   setFilteredGenesisNFTs(sortedNFTs)
  // }, [currentSort, bnbPrice, mcrtPrice])

  const sortNFTs = () => {
    if (currentSort === 'asc') {
      setSearchParams(
        (prev) => {
          prev.set('sort', 'desc')
          return prev
        },
        { replace: true }
      )
    } else {
      setSearchParams(
        (prev) => {
          prev.set('sort', 'asc')
          return prev
        },
        { replace: true }
      )
    }

    if (currentCollection === 'genesis') {
      const sortedNFTs = [...filteredGenesisNFTs].sort((a, b) => {
        const isMcrtNFTA = a.isMCRT
        const isMcrtNFTB = b.isMCRT

        const nftPriceA = getCurrentPrice(a)
        const nftPriceDollarA =
          bnbPrice &&
          mcrtPrice &&
          (isMcrtNFTA ? nftPriceA * mcrtPrice : nftPriceA * bnbPrice)

        const nftPriceB = getCurrentPrice(b)
        const nftPriceDollarB =
          bnbPrice &&
          mcrtPrice &&
          (isMcrtNFTB ? nftPriceB * mcrtPrice : nftPriceB * bnbPrice)

        if (currentSort === 'desc') {
          return (nftPriceDollarA as number) - (nftPriceDollarB as number) // Ascending order
        } else {
          return (nftPriceDollarB as number) - (nftPriceDollarA as number) // Descending order
        }
      })

      setFilteredGenesisNFTs(sortedNFTs)
    } else {
      const sortedNFTs = [...filteredRevelationNFTs].sort((a, b) => {
        const nftPriceA = getCurrentPrice(a)
        const nftPriceDollarA = mcrtPrice !== undefined && nftPriceA * mcrtPrice

        const nftPriceB = getCurrentPrice(b)
        const nftPriceDollarB = mcrtPrice !== undefined && nftPriceB * mcrtPrice

        if (currentSort === 'desc') {
          return (nftPriceDollarA as number) - (nftPriceDollarB as number) // Ascending order
        } else {
          return (nftPriceDollarB as number) - (nftPriceDollarA as number) // Descending order
        }
      })

      setFilteredRevelationNFTs(sortedNFTs)
    }
  }

  console.log('here')
  return (
    <section className="relative px-6">
      <div className="space-y-12 pt-10">
        <TypographyH1 className="md:text-5xl">Marketplace</TypographyH1>

        <div className="mx-auto flex min-h-10 w-full max-w-screen-2xl justify-between gap-6">
          <div className="sticky top-10 h-fit w-[25%] rounded-[22px] bg-gradient-to-b from-primary-200 to-transparent p-px shadow-xl">
            <div className="self-start rounded-[22px] bg-primary-600">
              <div className="relative top-[2px] z-10 flex items-center justify-center gap-1 px-6 pt-2">
                <div
                  onClick={() =>
                    setSearchParams(
                      (prev) => {
                        prev.set('tab', 'characters')
                        return prev
                      },
                      { replace: true }
                    )
                  }
                  className={cn(
                    'flex cursor-pointer items-center gap-1 rounded-t-[20px] border-x border-t border-transparent  px-3 py-3',
                    {
                      'border-primary-200 bg-primary-400':
                        currentTab === 'characters',
                    }
                  )}
                >
                  <img
                    width={23}
                    height={29}
                    src={charactersTabIcon}
                    alt="Characters"
                  />
                  <span className="text-sm">Characters</span>
                </div>
                <div
                  onClick={() =>
                    setSearchParams(
                      (prev) => {
                        prev.set('tab', 'items')
                        return prev
                      },
                      { replace: true }
                    )
                  }
                  className={cn(
                    'flex cursor-pointer items-center gap-1 rounded-t-[20px] border-x border-t border-transparent px-3 py-3',
                    {
                      ' border-primary-200 bg-primary-400':
                        currentTab === 'items',
                    }
                  )}
                >
                  <img width={27} height={30} src={itemsTabIcon} alt="Items" />
                  <span className="text-sm">Items</span>
                </div>
                <div
                  onClick={() =>
                    setSearchParams(
                      (prev) => {
                        prev.set('tab', 'lands')
                        return prev
                      },
                      { replace: true }
                    )
                  }
                  className={cn(
                    'flex cursor-pointer items-center gap-1 rounded-t-[20px] border-x border-t border-transparent px-3 py-3',
                    {
                      ' border-primary-200 bg-primary-400':
                        currentTab === 'lands',
                    }
                  )}
                >
                  <img width={27} height={30} src={landsTabIcon} alt="Lands" />
                  <span className="text-sm">Lands</span>
                </div>
              </div>
              <div className="h-[500px] rounded-[20px] border-t border-primary-200 bg-primary-400 px-6 py-[30px]">
                <p className="pb-5 font-sans text-2xl font-bold tracking-wider text-white">
                  Filter
                </p>
                {currentTab === 'characters' ? (
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <p>Collection</p>
                      <div className="flex flex-wrap items-center gap-1.5 rounded-[30px] border-2 border-[#202660] p-1.5">
                        <div
                          onClick={() =>
                            setSearchParams(
                              (prev) => {
                                prev.set('collection', 'genesis')
                                return prev
                              },
                              { replace: true }
                            )
                          }
                          className={cn(
                            'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
                            {
                              'bg-secondary-100 text-primary-500':
                                currentCollection === 'genesis',
                            }
                          )}
                        >
                          <GiBloodySword size={20} />
                          <span>Genesis</span>
                        </div>
                        <div
                          onClick={() =>
                            setSearchParams(
                              (prev) => {
                                prev.set('collection', 'revelation')
                                return prev
                              },
                              { replace: true }
                            )
                          }
                          className={cn(
                            'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
                            {
                              'bg-secondary-100 text-primary-500':
                                currentCollection === 'revelation',
                            }
                          )}
                        >
                          <GiBroadheadArrow size={20} />
                          <span>Revelation</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <p>Rarity</p>
                      <div className="flex flex-wrap items-center gap-1.5 rounded-[30px] border-2 border-[#202660] p-1.5">
                        <div
                          onClick={() => toggleRarity('rare')}
                          className={cn(
                            'flex cursor-pointer flex-wrap items-center gap-1 rounded-full px-2 py-2 text-secondary-100',
                            {
                              'bg-secondary-100 text-primary-500':
                                rarity.includes('rare'),
                            }
                          )}
                        >
                          <img
                            className="w-4"
                            src={rareNftIcon}
                            alt="Rare NFT"
                          />
                          <span>Rare</span>
                        </div>

                        <div
                          onClick={() => toggleRarity('epic')}
                          className={cn(
                            'flex cursor-pointer items-center gap-1 rounded-full px-2 py-2 text-secondary-100',
                            {
                              'bg-secondary-100 text-primary-500':
                                rarity.includes('epic'),
                            }
                          )}
                        >
                          <img
                            className="w-4"
                            src={epicNftIcon}
                            alt="Epic NFT"
                          />
                          <span>Epic</span>
                        </div>

                        <div
                          onClick={() => toggleRarity('legendary')}
                          className={cn(
                            'flex cursor-pointer items-center gap-1 rounded-full px-2 py-2 text-secondary-100',
                            {
                              'bg-secondary-100 text-primary-500':
                                rarity.includes('legendary'),
                            }
                          )}
                        >
                          <img
                            className="w-4"
                            src={legendaryNftIcon}
                            alt="Legendary NFT"
                          />
                          <span>Legendary</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : currentTab === 'items' ? (
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <p>Type</p>
                      <div className="flex flex-wrap items-center gap-1.5 rounded-[30px] border-2 border-[#202660] p-1.5">
                        <div
                          onClick={() =>
                            setSearchParams(
                              (prev) => {
                                prev.set('type', 'all')
                                return prev
                              },
                              { replace: true }
                            )
                          }
                          className={cn(
                            'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
                            {
                              'bg-secondary-100 text-primary-500':
                                currentType === 'all',
                            }
                          )}
                        >
                          <GiBloodySword size={20} />
                          <span>All</span>
                        </div>
                        <div
                          className={cn(
                            'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100 opacity-30'
                          )}
                        >
                          <GiBroadheadArrow size={20} />
                          <span>Coins</span>
                        </div>

                        <div
                          className={cn(
                            'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100 opacity-30'
                          )}
                        >
                          <GiBroadheadArrow size={20} />
                          <span>Skins</span>
                        </div>

                        <div
                          className={cn(
                            'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100 opacity-30'
                          )}
                        >
                          <GiBroadheadArrow size={20} />
                          <span>Weapons</span>
                        </div>

                        <div
                          onClick={() =>
                            setSearchParams(
                              (prev) => {
                                prev.set('type', 'gems')
                                return prev
                              },
                              { replace: true }
                            )
                          }
                          className={cn(
                            'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
                            {
                              'bg-secondary-100 text-primary-500':
                                currentType === 'gems',
                            }
                          )}
                        >
                          <GiBroadheadArrow size={20} />
                          <span>Gems</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <p>Games</p>
                      <div className="flex flex-wrap items-center gap-1.5 rounded-[30px] border-2 border-[#202660] p-1.5">
                        <div
                          onClick={() =>
                            setSearchParams(
                              (prev) => {
                                prev.set('games', 'all')
                                return prev
                              },
                              { replace: true }
                            )
                          }
                          className={cn(
                            'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
                            {
                              'bg-secondary-100 text-primary-500':
                                currentGame === 'all',
                            }
                          )}
                        >
                          <GiBloodySword size={20} />
                          <span>All</span>
                        </div>
                        <div
                          onClick={() =>
                            setSearchParams(
                              (prev) => {
                                prev.set('games', 'magiccraft')
                                return prev
                              },
                              { replace: true }
                            )
                          }
                          className={cn(
                            'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
                            {
                              'bg-secondary-100 text-primary-500':
                                currentGame === 'magiccraft',
                            }
                          )}
                        >
                          <GiBroadheadArrow size={20} />
                          <span>MagicCraft</span>
                        </div>

                        <div
                          onClick={() =>
                            setSearchParams(
                              (prev) => {
                                prev.set('games', 'magicrunner')
                                return prev
                              },
                              { replace: true }
                            )
                          }
                          className={cn(
                            'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
                            {
                              'bg-secondary-100 text-primary-500':
                                currentGame === 'magicrunner',
                            }
                          )}
                        >
                          <GiMagicSwirl size={20} />
                          <span>MagicRunner</span>
                        </div>

                        <div
                          onClick={() =>
                            setSearchParams(
                              (prev) => {
                                prev.set('games', 'magic8ball')
                                return prev
                              },
                              { replace: true }
                            )
                          }
                          className={cn(
                            'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
                            {
                              'bg-secondary-100 text-primary-500':
                                currentGame === 'magic8ball',
                            }
                          )}
                        >
                          <GiMagicSwirl size={20} />
                          <span>Magic8Ball</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid  place-items-center text-2xl font-bold">
                    Coming Soon
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-[75%] rounded-[22px] bg-gradient-to-b from-primary-200 to-transparent p-px shadow-xl">
            <div className="min-h-dvh space-y-16 rounded-[22px] bg-primary-600 px-11 py-[22px] ">
              <div className="flex w-full items-center justify-between">
                <p className="text-base text-white/60">
                  Showing{' '}
                  {currentTab === 'characters' ? (
                    <>
                      {currentCollection === 'genesis' ? (
                        <span>{filteredGenesisNFTs?.length ?? 0}</span>
                      ) : currentCollection === 'revelation' ? (
                        <span>{filteredRevelationNFTs?.length ?? 0}</span>
                      ) : (
                        0
                      )}
                    </>
                  ) : currentTab === 'items' ? (
                    GEM_PACK_DATA.length
                  ) : (
                    0
                  )}{' '}
                  items
                </p>

                {currentTab === 'characters' && (
                  <div className="text-secondary-100">
                    {currentSort === 'desc' || currentSort === '' ? (
                      <div
                        onClick={() => sortNFTs()}
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <p className="font-semibold">Highest Price First</p>
                        <ArrowDown size={19} />
                      </div>
                    ) : (
                      <div
                        onClick={() => sortNFTs()}
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <p className="font-semibold">Lowest Price First</p>
                        <ArrowUp size={19} />
                      </div>
                    )}
                  </div>
                )}
              </div>
              {currentTab === 'characters' ? (
                <>
                  {' '}
                  {currentCollection === 'genesis' ? (
                    <div>
                      {genesisNftStatus === 'pending' ? (
                        <div>Loading...</div>
                      ) : filteredGenesisNFTs.length === 0 ? (
                        <div>
                          <p className="text-center font-sans text-2xl text-slate-200">
                            No NFTs match your filter.
                          </p>
                        </div>
                      ) : (
                        <div className="grid max-w-full grid-cols-4 gap-6 lg:grid-cols-4">
                          {filteredGenesisNFTs?.map((nft) => (
                            <NFTCard nft={nft} />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      {revelationNftStatus === 'pending' ? (
                        <div>Loading...</div>
                      ) : filteredRevelationNFTs.length === 0 ? (
                        <div>
                          <p className="text-center font-sans text-2xl text-slate-200">
                            No NFTs match your filter.
                          </p>
                        </div>
                      ) : (
                        <div className="grid max-w-full auto-cols-fr auto-rows-min gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                          {filteredRevelationNFTs?.map((nft) => (
                            <NFTCard nft={nft} />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : currentTab === 'items' ? (
                <div className="grid max-w-full grid-cols-4 gap-6 lg:grid-cols-4">
                  {GEM_PACK_DATA?.map((item) => <GemPackCard item={item} />)}
                </div>
              ) : (
                <div className="grid place-items-center font-serif text-2xl text-slate-300">
                  Coming Soon
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

  const rarity = nft.attributes.find(
    (val) => val.trait_type === 'rarity'
  )?.value

  return (
    <Link to={`/nft/${nft.contractAddress}/${nft.tokenID}`}>
      <Border
        className="h-fit"
        variant={rarity?.toLowerCase() as Rarity | null | undefined}
      >
        <div key={nft.tokenID} className="h-full rounded-2xl  p-[2px]">
          <div className="relative">
            <div className="w-full">
              {getThumbnailImage(nft.image).includes('mp4') ? (
                <video
                  height={240}
                  className="min-h-[240px] rounded-t-2xl bg-primary-500"
                  autoPlay
                  loop
                  muted
                  src={getThumbnailImage(nft.image)}
                />
              ) : (
                <img
                  height={240}
                  width={240}
                  className="min-h-[220px] rounded-t-2xl bg-primary-500"
                  src={getThumbnailImage(nft.image)}
                  alt="avatar"
                  loading="lazy"
                />
              )}
            </div>

            <Badge
              className="absolute left-4 top-4"
              variant={rarity?.toLowerCase() as Rarity | null | undefined}
            >
              {rarity}
            </Badge>

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
      </Border>
    </Link>
  )
}

function GemPackCard({ item }: { item: GemPack }) {
  const mcrtPrice = useAppSelector((state) => state.mcrtPrice.mcrtPrice)
  const itemPriceDollar = item.price_in_usd

  let itemPrice
  if (mcrtPrice === null || mcrtPrice === undefined || mcrtPrice === 0) {
    itemPrice = 0
  } else {
    itemPrice = itemPriceDollar / mcrtPrice
  }
  return (
    <Link to={`/item/${item.id}`}>
      <Border className="h-fit" variant={'rare'}>
        <div key={item.id} className="h-full  rounded-2xl  p-[2px]">
          <div className="relative">
            <div className="w-full">
              <img
                className="min-h-[240px] rounded-t-2xl bg-primary-500 object-cover"
                src={item.img}
                alt="avatar"
                loading="lazy"
              />
            </div>

            <Badge className="absolute left-4 top-4" variant="discount">
              {item.discount}% OFF
            </Badge>

            <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-primary-400 px-6 py-4">
              <p className="pb-1 font-serif text-xl drop-shadow">
                {item.gems} GEMS
              </p>

              <div className="w-fit rounded-md bg-[#3044F8] px-2 text-sm">
                All games
              </div>
            </div>
          </div>

          <Separator className="via-secondary-100/50" />

          <div className="rounded-b-2xl bg-primary-500 px-3 py-6">
            <div className="flex items-center justify-between gap-2">
              <div className="rounded-full bg-secondary-100/10 px-2 py-1 font-serif">
                <div className="flex items-center gap-1">
                  <img className="h-4 w-4" src={mcrtIcon} alt="MCRT" />
                  <div>
                    <span className="pr-1 text-lg">
                      {numberWithCommas(nFormatter(itemPrice, 1))}
                    </span>
                    <span className="text-xs">MCRT</span>
                  </div>
                </div>
              </div>
              <div className="text-secondary-100">
                ${numberWithCommas(nFormatter(itemPriceDollar, 1))}
              </div>
            </div>
          </div>
        </div>
      </Border>
    </Link>
  )
}

export default MarketplacePage
