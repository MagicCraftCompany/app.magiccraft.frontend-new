import { useState, useCallback, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { GiBloodySword, GiBroadheadArrow, GiMagicSwirl } from 'react-icons/gi'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Border } from '@/components/ui/border'
import { ArrowDown, ArrowUp } from 'lucide-react'

import charactersTabIcon from '@/assets/images/characters-tab-icon.png'
import itemsTabIcon from '@/assets/images/items-tab-icon.png'
import landsTabIcon from '@/assets/images/lands-tab-icon.png'

import rareNftIcon from '@/assets/images/rare-nft-icon.png'
import epicNftIcon from '@/assets/images/epic-nft-icon.png'
import legendaryNftIcon from '@/assets/images/legendary-nft-icon.png'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TypographyH1 } from '@/components/Typography'
import noviceShard from '@/assets/images/novice-shard.png'
// import warriorCache from '@/assets/images/warrior-cache.png'

import {
  
  getThumbnailImage,
  
} from '@/lib/helpers'

type Tab = 'characters' | 'items' | 'lands'
type Rarity = 'rare' | 'epic' | 'legendary'
type Collection = 'genesis' | 'revelation'

// Mock data for bought NFTs
const boughtNFTs = [
  {
    id: 1,
    name: 'Warrior, The Brave',
    collection: 'genesis',
    rarity: 'rare',
    image: '',
    price: 100,
    currency: 'MCRT',
  },
  {
    id: 2,
    name: 'Mage, The Wise',
    collection: 'revelation',
    rarity: 'epic',
    image: '',
    price: 500,
    currency: 'MCRT',
  },
  {
    id: 3,
    name: 'Archer, The Swift',
    collection: 'genesis',
    rarity: 'legendary',
    image: '',
    price: 1000,
    currency: 'MCRT',
  },
]

// Mock data for bought items
const boughtItems = [
  {
    id: 1,
    pack_name: 'Novice Shard',
    slug: 'novice-shard',
    price_in_usd: 1,
    gems: 100,
    img: noviceShard ,
    discount: 5,
  },
  {
    id: 2,
    pack_name: 'Apprentice Bundle',
    slug: 'apprentice-bundle',
    price_in_usd: 5,
    gems: 550,
    img: noviceShard ,
    discount: 10,
  },
  {
    id: 3,
    pack_name: "Warrior's Cache",
    slug: 'warriors-cache',
    price_in_usd: 10,
    gems: 1200,
    img: noviceShard ,
    discount: 15,
  },
]

export default function InventoryPage() {
  const navigate=useNavigate()
     const [searchParams, ] = useSearchParams({
        collection: 'genesis',
        sort: 'desc',
        tab: 'characters',
        type: 'all',
        games: 'all',
      })  
      const [rarity, setRarity] = useState<Rarity[]>(['rare', 'epic', 'legendary'])

  const currentCollection = searchParams.get('collection')
  const currentSort = searchParams.get('sort')
  const currentTab = searchParams.get('tab')
  const currentType = searchParams.get('type')

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const toggleRarity = (type: Rarity) => {
    setRarity(prev => 
      prev.includes(type) ? prev.filter(r => r !== type) : [...prev, type]
    )
  }

  const filteredNFTs = boughtNFTs.filter(nft => 
    nft.collection === currentCollection && rarity.includes(nft.rarity as Rarity)
  )

  const sortedNFTs = [...filteredNFTs].sort((a, b) => 
    currentSort === 'desc' ? b.price - a.price : a.price - b.price
  )
  const handleSortChange = () => {
    navigate(`?${createQueryString('sort', currentSort === 'desc' ? 'asc' : 'desc')}`)
  }

  const tabs: Tab[] = ['characters', 'items', 'lands']

  useEffect(() => {
    // Reset filters when changing tabs
    if (currentTab === 'characters') {
      setRarity(['rare', 'epic', 'legendary'])
    }
  }, [currentTab])

  return (
    <div className="space-y-12 pt-10 px-4 md:px-6">
      <TypographyH1 className="md:text-5xl">Inventory</TypographyH1>
      <div className="mx-auto flex flex-col gap-6 lg:flex-row md:max-w-screen-2xl md:justify-between">
        <div className="w-full lg:w-1/4 lg:h-fit rounded-[22px] bg-gradient-to-b from-primary-200 to-transparent p-px shadow-xl z-10">
          <div className="rounded-[22px] bg-primary-600">
            <div className="h-[500px] rounded-[20px] border-t border-primary-200 bg-primary-400 px-4 py-4 md:px-6 md:py-[30px]">
              <p className="pb-5 font-sans text-lg font-bold tracking-wider text-white md:text-2xl">
                Filter
              </p>
              {currentTab === 'characters' && (
                <CharacterFilters
                  currentCollection={currentCollection as Collection}
                  toggleRarity={toggleRarity}
                  rarity={rarity}
                  setSearchParams={(name: string, value: string) => {
                    navigate(`?${createQueryString(name, value)}`)
                  }}
                />
              )}
              {currentTab === 'items' && (
                <ItemFilters
                  currentType={currentType ?? ''}
                  setSearchParams={(name: string, value: string) => {
                    navigate(`?${createQueryString(name, value)}`)
                  }}
                />
              )}
              {currentTab === 'lands' && (
                <div className="grid place-items-center text-2xl font-bold text-white">
                  Coming Soon
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => navigate(`?${createQueryString('tab', tab)}`)}
                className={cn(
                  'flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-blue-400 bg-[rgba(12,2,24,0.6)] p-4 backdrop-blur-sm transition-all duration-300',
                  {
                    'border-[3px] border-[#98FFF9] bg-primary-600 text-white shadow-md': currentTab === tab,
                    'hover:bg-primary-700 text-gray-400 hover:text-white': currentTab !== tab,
                  },
                  'h-[120px] w-full sm:h-[140px] md:h-[160px]'
                )}
              >
                <img
                  width={30}
                  height={30}
                  src={tab === 'characters' ? charactersTabIcon : tab === 'items' ? itemsTabIcon : landsTabIcon}
                  alt={tab.charAt(0).toUpperCase() + tab.slice(1)}
                  className="mb-2"
                />
                <span className="text-base font-semibold capitalize">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
              </button>
            ))}
          </div>
          
          <div className="flex-1 rounded-[22px] bg-gradient-to-b from-primary-200 to-transparent p-px shadow-xl">
            <div className="space-y-6 rounded-[22px] bg-primary-600 md:px-11 md:py-[22px] min-h-[600px]">
              <div className="flex justify-between items-center">
                <p className="text-base text-white/60">
                  Showing {currentTab === 'characters' ? sortedNFTs.length : currentTab === 'items' ? boughtItems.length : 0} items
                </p>
                {currentTab === 'characters' && (
                  <div className="text-secondary-100 flex items-center cursor-pointer" onClick={handleSortChange}>
                    <p className="font-semibold">{currentSort === 'desc' ? 'Highest' : 'Lowest'} Price First</p>
                    {currentSort === 'desc' ? <ArrowDown size={19} /> : <ArrowUp size={19} />}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {currentTab === 'characters' && sortedNFTs.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} />
                ))}
                {currentTab === 'items' && boughtItems.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
                {currentTab === 'lands' && (
                  <div className="col-span-full text-center text-2xl font-bold text-white">
                    Lands Coming Soon
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CharacterFiltersProps {
  currentCollection: Collection
  toggleRarity: (type: Rarity) => void
  rarity: Rarity[]
  setSearchParams: (name: string, value: string) => void
}

function CharacterFilters({
  currentCollection,
  toggleRarity,
  rarity,
  setSearchParams,
}: CharacterFiltersProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <p>Collection</p>
        <div className="flex flex-wrap items-center gap-1.5 rounded-[30px] border-2 border-[#202660] p-1.5">
          <FilterButton
            onClick={() => setSearchParams('collection', 'genesis')}
            isActive={currentCollection === 'genesis'}
            icon={<GiBloodySword size={20} />}
            label="Genesis"
          />
          <FilterButton
            onClick={() => setSearchParams('collection', 'revelation')}
            isActive={currentCollection === 'revelation'}
            icon={<GiBroadheadArrow size={20} />}
            label="Revelation"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p>Rarity</p>
        <div className="flex flex-wrap items-center gap-1.5 rounded-[30px] border-2 border-[#202660] p-1.5">
          {[
            { type: 'rare', icon: rareNftIcon, label: 'Rare' },
            { type: 'epic', icon: epicNftIcon, label: 'Epic' },
            { type: 'legendary', icon: legendaryNftIcon, label: 'Legendary' },
          ].map(({ type, icon, label }) => (
            <div
              key={type}
              onClick={() => toggleRarity(type as Rarity)}
              className={cn(
                'flex cursor-pointer items-center gap-1 rounded-full px-2 py-2 text-secondary-100',
                {
                  'bg-secondary-100 text-primary-500': rarity.includes(type as Rarity),
                }
              )}
            >
              <img width={16} height={16} src={icon} alt={`${label} NFT`} className="w-4" />
              <span className="capitalize">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface ItemFiltersProps {
  currentType: string
  setSearchParams: (name: string, value: string) => void
}

function ItemFilters({ currentType, setSearchParams }: ItemFiltersProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <p>Type</p>
        <div className="flex flex-wrap items-center gap-1.5 rounded-[30px] border-2 border-[#202660] p-1.5">
          <FilterButton
            onClick={() => setSearchParams('type', 'all')}
            isActive={currentType === 'all'}
            icon={<GiBloodySword size={20} />}
            label="All"
          />
          <FilterButton
            onClick={() => setSearchParams('type', 'gems')}
            isActive={currentType === 'gems'}
            icon={<GiMagicSwirl size={20} />}
            label="Gems"
          />
        </div>
      </div>
    </div>
  )
}

interface FilterButtonProps {
  onClick: () => void
  isActive: boolean
  icon: React.ReactNode
  label: string
}

function FilterButton({ onClick, isActive, icon, label }: FilterButtonProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
        { 'bg-secondary-100 text-primary-500': isActive }
      )}
    >
      {icon}
      <span>{label}</span>
    </div>
  )
}

interface NFTCardProps {
  nft: {
    id: number
    name: string
    collection: string
    rarity: string
    image: string
    price: number
    currency: string
  }
}

function NFTCard({ nft }: NFTCardProps) {
  return (
    <Border className="h-fit" variant={nft.rarity as Rarity}>
      <div className="h-full rounded-2xl p-[2px]">
      <div className="relative">
      <div className="w-full ">          {/* <img
            src={nft.image}
            alt={nft.name}
            width={240}
            height={240}
            className="w-full h-full rounded-t-2xl bg-primary-500 object-cover"
          /> */}
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
          <Badge className="absolute left-4 top-4" variant={nft.rarity as Rarity}>
            {nft.rarity}
          </Badge>
          <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-primary-400 px-6 py-4">
            <p className="pb-1 font-serif text-xl drop-shadow-md">
              {nft.name.split(',')[0]}
            </p>
            <div className="w-fit rounded-md bg-[#3044F8] px-2 text-sm">
              {nft.name.split(',')[1]?.trim()}
            </div>
          </div>
        </div>
        <Separator className="via-secondary-100/50" />
        <div className="rounded-b-2xl bg-primary-500 px-3 py-6">
          <div className="flex items-center justify-between gap-2">
            <div className="rounded-full bg-secondary-100/10 px-2 py-1 font-serif">
              <span className="text-lg">{nft.price}</span>
              <span className="text-xs ml-1">{nft.currency}</span>
            </div>
            <div className="text-secondary-100">
              ${(nft.price * 0.1).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Border>
  )
}

interface ItemCardProps {
  item: {
    id: number
    pack_name: string
    slug: string
    price_in_usd: number
    gems: number
    img: string
    discount: number
  }
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <Border className="h-full" variant="rare">
      <div className="flex flex-col h-full rounded-2xl p-[2px]">
        <div className="relative flex-grow">
          <img
            src={item.img}
            alt={item.pack_name}
            width={240}
            height={240}
            className="w-full h-full rounded-t-2xl bg-primary-500 object-cover"
          />
          <Badge className="absolute left-4 top-4" variant="discount">
            {item.discount}% OFF
          </Badge>
          <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-primary-400 px-6 py-4">
            <p className="pb-1 font-serif text-xl drop-shadow-md">
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
              <span className="text-lg">{item.pack_name}</span>
            </div>
            <div className="text-secondary-100">
              ${item.price_in_usd}
            </div>
          </div>
        </div>
      </div>
    </Border>
  )
}