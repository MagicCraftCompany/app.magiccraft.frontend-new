import { useEffect, useState } from 'react'
import { TypographyH1, TypographyH2 } from '@/components/Typography'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { HelpCircle, Play } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import mintNFT from '@/assets/images/mint-nft.webp'
import { useRevelation } from '@/hooks/useContract'
import { cn } from '@/lib/utils'
import {  useSelector } from 'react-redux'
import { fetchNFTMintAsync } from '@/services/state/nftmint'
import {
  // E18,
  VITE_GENESIS_CONTRACT_ADDRESS,
  VITE_REVELATION_CONTRACT_ADDRESS,
} from '@/lib/constants'
import { BigNumber } from 'ethers'
import * as revelationImages from '@/assets/images/mint-page/revelation'
import * as genesisImages from '@/assets/images/mint-page/genesis'
import bulletIcon from '@/assets/icons/bullet.svg'
import { utilities } from './HomePage'
import bnbIcon from '@/assets/icons/ic_bnb.svg'
import nftImages from '@/assets/images/nft-Images.webp'
import nftRarityLevels from '@/assets/images/nft-rarity-levels.webp'

const genesisCollection = [
  {
    id: 1,
    name: 'Karas',
    image: genesisImages.karas,
  },
  {
    id: 2,
    name: 'Trueshot',
    image: genesisImages.trueshot,
  },
  {
    id: 1,
    name: 'Bjorn',
    image: genesisImages.bjorn,
  },
]

const revelationCollection = [
  {
    id: 1,
    name: 'Blazy',
    image: revelationImages.blazy,
  },
  {
    id: 2,
    name: 'Amun',
    image: revelationImages.amun,
  },
  {
    id: 3,
    name: 'Bjorn',
    image: revelationImages.bjorn,
  },
  {
    id: 4,
    name: 'Brienne',
    image: revelationImages.brienne,
  },
  {
    id: 5,
    name: 'Callie',
    image: revelationImages.callie,
  },
  {
    id: 6,
    name: 'Drlutz',
    image: revelationImages.drlutz,
  },
  {
    id: 7,
    name: 'Druid',
    image: revelationImages.druid,
  },
  {
    id: 8,
    name: 'Frigard',
    image: revelationImages.frigard,
  },
  {
    id: 9,
    name: 'Gail',
    image: revelationImages.gail,
  },
  {
    id: 10,
    name: 'Jean',
    image: revelationImages.jean,
  },
  {
    id: 11,
    name: 'Karas',
    image: revelationImages.karas,
  },
  {
    id: 12,
    name: 'Leila',
    image: revelationImages.leila,
  },
  {
    id: 13,
    name: 'Moira',
    image: revelationImages.moira,
  },
  {
    id: 14,
    name: 'Tara',
    image: revelationImages.tara,
  },
  {
    id: 15,
    name: 'Trueshot',
    image: revelationImages.trueshot,
  },
  {
    id: 16,
    name: 'Vega',
    image: revelationImages.vega,
  },
  {
    id: 17,
    name: 'Vladislav',
    image: revelationImages.vladislav,
  },
  {
    id: 18,
    name: 'Zap',
    image: revelationImages.zap,
  },
]

const genesisData = [
  {
    id: 1,
    noOfCharacters: 1,
    image: genesisImages.nftItem1,
  },
  {
    id: 2,
    noOfCharacters: 2,
    image: genesisImages.nftItem2,
  },
  {
    id: 3,
    noOfCharacters: 3,
    image: genesisImages.nftItem3,
  },
  {
    id: 4,
    noOfCharacters: 5,
    image: genesisImages.nftItem5,
  },
  {
    id: 5,
    noOfCharacters: 10,
    image: genesisImages.nftItem10,
  },
]

const revelationData = [
  {
    id: 1,
    noOfCharacters: 1,
    image: revelationImages.nftItem1,
  },
  {
    id: 2,
    noOfCharacters: 2,
    image: revelationImages.nftItem2,
  },
  {
    id: 3,
    noOfCharacters: 3,
    image: revelationImages.nftItem3,
  },
  {
    id: 4,
    noOfCharacters: 5,
    image: revelationImages.nftItem5,
  },
  {
    id: 5,
    noOfCharacters: 10,
    image: revelationImages.nftItem10,
  },
]

const E18 = BigNumber.from(10).pow(18)

const MintingPage = () => {
  const magicNFTContract = useRevelation()
  // const dispatch = useDispatch()

  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  const [selectedItemId, setSelectedItemId] = useState<1 | 2 | 3 | 4 | 5>(3)

  const { publicPrice, whiteListPrice } =
    useSelector((state:any) => state.nftmint)

  console.log(publicPrice, whiteListPrice)

  const handleSelectItem = (id: any) => {
    setSelectedItemId(id)
  }

  const publicMintPrice =
    BigNumber.from(publicPrice.toString()).mul(100000).div(E18).toNumber() /
    100000

  const whitelistMintPrice =
    BigNumber.from(whiteListPrice.toString()).mul(100000).div(E18).toNumber() /
    100000

  console.log({ publicMintPrice, whitelistMintPrice })

  const [_nftAvailable, setNftAvailable] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams({
    collection: 'genesis',
  })

  const currentCollection = searchParams.get('collection')

  useEffect(() => {
    async function getNFTAmountLeft() {
      try {
        const totalSupply = await magicNFTContract.methods.totalSupply().call()
        setNftAvailable(9999 - totalSupply)
      } catch (e) {
        console.log(e)
      }
    }

    if (magicNFTContract) {
      getNFTAmountLeft()
    } else {
      console.log('magicNFTContract not found')
    }
  }, [magicNFTContract])

  useEffect(() => {
    const contractAddress =
      currentCollection === 'genesis'
        ? VITE_GENESIS_CONTRACT_ADDRESS
        : VITE_REVELATION_CONTRACT_ADDRESS

    fetchNFTMintAsync(contractAddress)
  }, [currentCollection])

  return (
    <div className="relative z-10 h-full min-h-dvh w-full pb-20">
      <section className="hero-bg-gradient h-full w-full pb-16">
        <div className="mx-auto min-h-dvh w-[95%] max-w-screen-xl space-y-10">
          <div className="flex items-center justify-between pb-10 pt-20">
            <div className="w-[45%] space-y-10">
              <div className="space-y-6">
                <TypographyH1 className="text-left">Mint NFT</TypographyH1>

                <h2 className="text-3xl text-white">
                  There&apos;s no second chance to gain unique warriors
                </h2>

                <div className="flex flex-wrap items-center gap-2.5">
                  {[
                    '#Metaverse',
                    '#MagicCraftGame',
                    '#NFT',
                    '#Play2Earn',
                    '#GenesisCollection',
                    '#RevelationCollection',
                    '#RarityLevels',
                  ].map((val) => (
                    <Badge key={val} variant="mint" className="text-base">
                      {val}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex h-full items-center gap-[30px]">
                {/* <Button variant={'outline'}>Marketplace</Button> */}

                <Button
                  size={'lg'}
                  className="text-[22px]"
                  variant={'outline'}
                  asChild
                >
                  <Link to="/marketplace">Marketplace</Link>
                </Button>

                <Separator
                  className="h-[60px] via-secondary-100/50"
                  orientation="vertical"
                />

                <div className="flex items-center gap-4">
                  <div className="grid place-items-center gap-1">
                    <Play size={18} />
                    <p>Play trailer</p>
                  </div>
                  <div className="grid place-items-center gap-1">
                    <HelpCircle size={18} />
                    <p>How to buy?</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-1/2">
              <div className="absolute -right-16 -top-10 space-y-1 rounded-[20px] bg-[#0C021899] px-10 py-7 backdrop-blur">
                <p className="text-2xl text-white">Available amount:</p>
                <div className="font-serif text-2xl">
                  <span className="text-4xl">9898</span> / 9999 NFTs
                </div>
              </div>

              <img className="max-w-[620px]" src={mintNFT} alt="Mint NFT"></img>
            </div>
          </div>

          <div className="space-y-14">
            <div className="space-y-2">
              {currentStep === 1 ? (
                <>
                  <TypographyH2>Step 1</TypographyH2>
                  <p className="text-center font-inter text-lg font-semibold text-[#76779A]">
                    Choose a{' '}
                    <span className="underline underline-offset-4">
                      collection
                    </span>{' '}
                    you want to mint NFTs from
                  </p>
                </>
              ) : currentStep === 2 ? (
                <>
                  <TypographyH2>Step 2</TypographyH2>
                  <p className="text-center font-inter text-lg font-semibold text-[#76779A]">
                    Choose desired amount of NFTs to mint!
                  </p>
                </>
              ) : null}
            </div>

            <div className="space-y-5">
              {currentStep === 1 && (
                <>
                  <div className="mx-auto flex w-fit flex-wrap items-center gap-1.5 rounded-[30px] bg-[#4457B84D] p-1.5 backdrop-blur transition">
                    <div
                      onClick={() => {
                        setSearchParams(
                          (prev) => {
                            prev.set('collection', 'genesis')
                            return prev
                          },
                          { replace: true }
                        )
                      }}
                      className={cn(
                        'flex cursor-pointer items-center justify-center gap-1 rounded-full px-4 py-2.5 text-secondary-100 transition',
                        {
                          'bg-secondary-100 text-primary-500':
                            currentCollection === 'genesis',
                        }
                      )}
                    >
                      <span>Genesis collection</span>
                    </div>
                    <div
                      onClick={() => {
                        setSearchParams(
                          (prev) => {
                            prev.set('collection', 'revelation')
                            return prev
                          },
                          { replace: true }
                        )
                      }}
                      className={cn(
                        'flex cursor-pointer items-center justify-center gap-1 rounded-full px-4 py-2.5 text-secondary-100 transition',
                        {
                          'bg-secondary-100 text-primary-500':
                            currentCollection === 'revelation',
                        }
                      )}
                    >
                      <span>Revelation collection</span>
                    </div>
                  </div>

                  <div className="mx-auto max-w-sm">
                    <p className="text-balance text-center font-inter text-sm font-semibold text-[#76779A]">
                      Characters NFTs available in each collection for mint are
                      minted randomly, you cannot choose upfront
                    </p>
                  </div>
                </>
              )}

              {currentStep === 1 ? (
                <>
                  {currentCollection === 'revelation' ? (
                    <div className="grid grid-cols-9 gap-2.5 pb-4">
                      {revelationCollection.map((character) => (
                        <img
                          key={character.name}
                          className="max-w-full"
                          src={character.image}
                        ></img>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2.5 pb-4">
                      {genesisCollection?.map((character) => (
                        <img
                          key={character.name}
                          className="h-auto w-[125px]"
                          src={character.image}
                        />
                      ))}
                    </div>
                  )}

                  <div className="text-center">
                    <Button
                      onClick={() => setCurrentStep(2)}
                      variant={'outline'}
                      className="mx-auto h-[60px] text-center text-[22px]"
                    >
                      Continue to step 2
                    </Button>
                  </div>
                </>
              ) : currentStep === 2 ? (
                <>
                  {currentCollection === 'revelation' ? (
                    <div className="grid grid-cols-5 place-items-center gap-[30px] pt-10">
                      {revelationData.map((item) => (
                        <div
                          className={cn(
                            'relative flex h-[250px] w-[230px] cursor-pointer flex-col rounded-[20px] border border-primary-200 bg-primary-400 transition',
                            {
                              'border border-secondary-100 bg-gradient-to-r from-[#397489] to-[#0E2A41]':
                                selectedItemId === item.id,
                            }
                          )}
                          key={item.id}
                          onClick={() => handleSelectItem(item.id)}
                        >
                          <div className="absolute -top-10 left-0 right-0 mx-auto grid w-full max-w-[90%] place-items-center">
                            <img
                              className={cn('', {
                                'w-[120px] shadow-lg drop-shadow':
                                  item.id === 1,
                              })}
                              src={item.image}
                              alt=""
                            />
                          </div>

                          <div className="flex-grow content-end px-5 pb-5 pt-24 text-center font-serif text-2xl">
                            {item.noOfCharacters} characters
                          </div>
                          <Separator className="from-secondary-100/5 via-secondary-100/60 to-secondary-100/5" />
                          <div className="p-5 text-center font-serif ">
                            <div
                              className={cn(
                                'mx-auto flex w-fit items-center gap-2 rounded-full bg-[#0A091799] px-2.5 py-1.5 transition',
                                {
                                  'bg-secondary-100/20':
                                    selectedItemId === item.id,
                                }
                              )}
                            >
                              <img
                                className="h-5 w-5"
                                src={bnbIcon}
                                alt="BNB"
                              />
                              <p className="text-2xl">
                                2.5 <span className="text-sm">BNB</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : currentCollection === 'genesis' ? (
                    <div className="grid grid-cols-5 place-items-center gap-[30px] pt-10">
                      {genesisData.map((item) => (
                        <div
                          className={cn(
                            'relative flex h-[250px] w-[230px] cursor-pointer flex-col rounded-[20px] border border-primary-200 bg-primary-400 transition',
                            {
                              'border border-secondary-100 bg-gradient-to-r from-[#397489] to-[#0E2A41]':
                                selectedItemId === item.id,
                            }
                          )}
                          key={item.id}
                          onClick={() => handleSelectItem(item.id)}
                        >
                          <div
                            className={cn(
                              'absolute -top-12 left-0 right-0 mx-auto grid w-full max-w-[90%] place-items-center',
                              {
                                '-top-24': item.id === 5,
                              }
                            )}
                          >
                            <img
                              className={cn('', {
                                'w-[120px] shadow-lg drop-shadow':
                                  item.id === 1,
                              })}
                              src={item.image}
                              alt=""
                            />
                          </div>

                          <div className="flex-grow content-end px-5 pb-5 pt-24 text-center font-serif text-2xl">
                            {item.noOfCharacters} characters
                          </div>
                          <Separator className="from-secondary-100/5 via-secondary-100/60 to-secondary-100/5" />
                          <div className="p-5 text-center font-serif ">
                            <div
                              className={cn(
                                'mx-auto flex w-fit items-center gap-2 rounded-full bg-[#0A091799] px-2.5 py-1.5 transition',
                                {
                                  'bg-secondary-100/20':
                                    selectedItemId === item.id,
                                }
                              )}
                            >
                              <img
                                className="h-5 w-5"
                                src={bnbIcon}
                                alt="BNB"
                              />
                              <p className="text-2xl">
                                2.5 <span className="text-sm">BNB</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  <div className="flex items-center justify-center gap-6 pt-10">
                    <Button
                      onClick={() => setCurrentStep(1)}
                      variant={'outline'}
                      className=" h-[60px] text-center text-[22px]"
                    >
                      Go to step 1
                    </Button>

                    <Button
                      variant={'default'}
                      className=" h-[60px] text-center text-[22px]"
                    >
                      Mint
                    </Button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-11/12 max-w-screen-xl space-y-20 pt-20">
        <TypographyH2 className="text-[54px]">
          Benefits of Holding an NFT
        </TypographyH2>
        <div className="flex flex-col items-center md:flex-row">
          <div className="w-4/5 md:w-2/5">
            <div className="grid grid-cols-1  gap-2 rounded-t-4xl border-x border-t border-primary-200 bg-primary-400 p-10 shadow-lg md:rounded-l-4xl md:rounded-r-none md:border-y md:border-l md:border-r-0 ">
              <TypographyH2 className="text-left text-[30px]">
                Rarity levels
              </TypographyH2>

              <div>
                <img src={nftRarityLevels} alt="" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/5">
            <div className="rounded-4xl bg-gradient-to-b from-[#B591F2] to-transparent p-px">
              <div className="rounded-4xl bg-gradient-to-r  from-[#2A0D4E] to-[#57186D] to-90%">
                <div className="bg-black/20 px-12 py-8">
                  <h3 className="font-serif text-3xl">Features</h3>
                </div>

                <div className="space-y-4 px-12 py-10">
                  <div className="space-y-4 text-lg">
                    <p>
                      There are 3 rarity levels, which are determined by the
                      compilation of attributes. The higher the rarity of the
                      Hero, the bigger the in-game rewards
                    </p>
                    <p>
                      Each Artwork is Unique and has a different compilation of
                      skills, attributes and traits
                    </p>

                    <p>
                      In the MagicCraft world, Genesis Heroes may unlock a lot
                      of features
                    </p>
                  </div>

                  <Separator className="from-transparent to-transparent" />

                  <div className="flex items-center gap-2.5">
                    <img src={bulletIcon} alt="List Item" />
                    <p className="text-[22px] text-tertiary-100">
                      Epic characters will provide a whitelist spot for the
                      future land sales
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <TypographyH2>Utilities</TypographyH2>

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
                <img className="shrink-0 " src={bulletIcon} alt="List item " />
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

      <section className="pt-40">
        <img src={nftImages} alt="" />
      </section>
    </div>
  )
}

export default MintingPage
