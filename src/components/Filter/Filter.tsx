// import { useSearchParams } from 'react-router-dom'
// import { cn } from '@/lib/utils'
// import charactersTabIcon from '@/assets/images/characters-tab-icon.png'
// import itemsTabIcon from '@/assets/images/items-tab-icon.png'
// import landsTabIcon from '@/assets/images/lands-tab-icon.png'

// import rareNftIcon from '@/assets/images/rare-nft-icon.png'
// import epicNftIcon from '@/assets/images/epic-nft-icon.png'
// import legendaryNftIcon from '@/assets/images/legendary-nft-icon.png'

// import { GiBloodySword, GiBroadheadArrow, GiMagicSwirl } from 'react-icons/gi'
// import { useState } from 'react'
// export interface ListedNft {
//   contractAddress: string
//   tokenID: number
//   seller: string
//   duration: number
//   endingPrice: number
//   isMCRT: boolean
//   startAt: number
//   startingPrice: number
//   createdAt: string
//   name: string
//   description: string
//   image: string
//   attributes: {
//     trait_type: string
//     value: string
//   }[]
// }

// export type Rarity = 'rare' | 'epic' | 'legendary'
// export function Filter() {
//   const [searchParams, setSearchParams] = useSearchParams({
//     collection: 'genesis',
//     sort: 'desc',
//     tab: 'characters',
//     type: 'all',
//     games: 'all',
//   })
//   const [rarity, setRarity] = useState<Rarity[]>(() => {
//     const rarityParams = searchParams.get('rarity')
//     return rarityParams
//       ? (rarityParams.split(',') as Rarity[])
//       : ['rare', 'epic', 'legendary']
//   })
//   const currentCollection = searchParams.get('collection')
//   //   const currentSort = searchParams.get('sort')
//   const currentTab = searchParams.get('tab')
//   const currentType = searchParams.get('type')
//   const currentGame = searchParams.get('games')

//   const toggleRarity = (rarityValue: Rarity) => {
//     setRarity((prevRarity) => {
//       const hasRarity = prevRarity.includes(rarityValue)
//       const newRarity = hasRarity
//         ? prevRarity.filter((r) => r !== rarityValue)
//         : [...prevRarity, rarityValue]

//       // Update the searchParams directly here
//       const newSearchParams = new URLSearchParams(searchParams)
//       newSearchParams.set('rarity', newRarity.join(','))
//       setSearchParams(newSearchParams, { replace: true })

//       return newRarity
//     })

//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   return (
//     <div className="top-10 w-full rounded-[22px] bg-gradient-to-b from-primary-200 to-transparent p-px shadow-xl md:h-fit lg:sticky lg:w-[25%]">
//       <div className=" rounded-[22px] bg-primary-600 ">
//         <div className="flex justify-between gap-1 px-4 pt-2 md:justify-center md:px-6">
//           <div
//             onClick={() =>
//               setSearchParams(
//                 (prev) => {
//                   prev.set('tab', 'characters')
//                   return prev
//                 },
//                 { replace: true }
//               )
//             }
//             className={cn(
//               'flex cursor-pointer items-center gap-1 rounded-t-[20px] border-x border-t border-transparent  px-3 py-3',
//               {
//                 'border-primary-200 bg-primary-400':
//                   currentTab === 'characters',
//               }
//             )}
//           >
//             <img
//               width={23}
//               height={29}
//               src={charactersTabIcon}
//               alt="Characters"
//             />
//             <span className="text-sm">Characters</span>
//           </div>
//           <div
//             onClick={() =>
//               setSearchParams(
//                 (prev) => {
//                   prev.set('tab', 'items')
//                   return prev
//                 },
//                 { replace: true }
//               )
//             }
//             className={cn(
//               'flex cursor-pointer items-center gap-1 rounded-t-[20px] border-x border-t border-transparent px-3 py-3',
//               {
//                 ' border-primary-200 bg-primary-400': currentTab === 'items',
//               }
//             )}
//           >
//             <img width={27} height={30} src={itemsTabIcon} alt="Items" />
//             <span className="text-sm">Items</span>
//           </div>
//           <div
//             onClick={() =>
//               setSearchParams(
//                 (prev) => {
//                   prev.set('tab', 'lands')
//                   return prev
//                 },
//                 { replace: true }
//               )
//             }
//             className={cn(
//               'flex cursor-pointer items-center gap-1 rounded-t-[20px] border-x border-t border-transparent px-3 py-3',
//               {
//                 ' border-primary-200 bg-primary-400': currentTab === 'lands',
//               }
//             )}
//           >
//             <img width={27} height={30} src={landsTabIcon} alt="Lands" />
//             <span className="text-sm">Lands</span>
//           </div>
//         </div>
//         <div className="h-[500px] rounded-[20px] border-t border-primary-200 bg-primary-400 px-4 py-4 md:px-6 md:py-[30px]">
//           <p className="pb-5 font-sans text-lg font-bold tracking-wider text-white md:text-2xl">
//             Filter
//           </p>
//           {currentTab === 'characters' ? (
//             <div className="space-y-5">
//               <div className="flex items-center gap-3">
//                 <p>Collection</p>
//                 <div className="flex flex-wrap items-center gap-1.5 rounded-[30px] border-2 border-[#202660] p-1.5">
//                   <div
//                     onClick={() => {
//                       setSearchParams(
//                         (prev) => {
//                           prev.set('collection', 'genesis')
//                           return prev
//                         },
//                         { replace: true }
//                       )

//                       window.scrollTo({ top: 0, behavior: 'smooth' })
//                     }}
//                     className={cn(
//                       'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
//                       {
//                         'bg-secondary-100 text-primary-500':
//                           currentCollection === 'genesis',
//                       }
//                     )}
//                   >
//                     <GiBloodySword size={20} />
//                     <span>Genesis</span>
//                   </div>
//                   <div
//                     onClick={() => {
//                       setSearchParams(
//                         (prev) => {
//                           prev.set('collection', 'revelation')
//                           return prev
//                         },
//                         { replace: true }
//                       )
//                       window.scrollTo({ top: 0, behavior: 'smooth' })
//                     }}
//                     className={cn(
//                       'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
//                       {
//                         'bg-secondary-100 text-primary-500':
//                           currentCollection === 'revelation',
//                       }
//                     )}
//                   >
//                     <GiBroadheadArrow size={20} />
//                     <span>Revelation</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <p>Rarity</p>
//                 <div className="flex flex-wrap items-center gap-1.5 rounded-[30px] border-2 border-[#202660] p-1.5">
//                   <div
//                     onClick={() => toggleRarity('rare')}
//                     className={cn(
//                       'flex cursor-pointer flex-wrap items-center gap-1 rounded-full px-2 py-2 text-secondary-100',
//                       {
//                         'bg-secondary-100 text-primary-500':
//                           rarity.includes('rare'),
//                       }
//                     )}
//                   >
//                     <img className="w-4" src={rareNftIcon} alt="Rare NFT" />
//                     <span>Rare</span>
//                   </div>

//                   <div
//                     onClick={() => toggleRarity('epic')}
//                     className={cn(
//                       'flex cursor-pointer items-center gap-1 rounded-full px-2 py-2 text-secondary-100',
//                       {
//                         'bg-secondary-100 text-primary-500':
//                           rarity.includes('epic'),
//                       }
//                     )}
//                   >
//                     <img className="w-4" src={epicNftIcon} alt="Epic NFT" />
//                     <span>Epic</span>
//                   </div>

//                   <div
//                     onClick={() => toggleRarity('legendary')}
//                     className={cn(
//                       'flex cursor-pointer items-center gap-1 rounded-full px-2 py-2 text-secondary-100',
//                       {
//                         'bg-secondary-100 text-primary-500':
//                           rarity.includes('legendary'),
//                       }
//                     )}
//                   >
//                     <img
//                       className="w-4"
//                       src={legendaryNftIcon}
//                       alt="Legendary NFT"
//                     />
//                     <span>Legendary</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : currentTab === 'items' ? (
//             <div className="space-y-5">
//               <div className="flex items-center gap-3">
//                 <p>Type</p>
//                 <div className="flex flex-wrap items-center gap-1.5 rounded-[30px] border-2 border-[#202660] p-1.5">
//                   <div
//                     onClick={() =>
//                       setSearchParams(
//                         (prev) => {
//                           prev.set('type', 'all')
//                           return prev
//                         },
//                         { replace: true }
//                       )
//                     }
//                     className={cn(
//                       'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
//                       {
//                         'bg-secondary-100 text-primary-500':
//                           currentType === 'all',
//                       }
//                     )}
//                   >
//                     <GiBloodySword size={20} />
//                     <span>All</span>
//                   </div>
//                   <div
//                     className={cn(
//                       'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100 opacity-30'
//                     )}
//                   >
//                     <GiBroadheadArrow size={20} />
//                     <span>Coins</span>
//                   </div>

//                   <div
//                     className={cn(
//                       'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100 opacity-30'
//                     )}
//                   >
//                     <GiBroadheadArrow size={20} />
//                     <span>Skins</span>
//                   </div>

//                   <div
//                     className={cn(
//                       'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100 opacity-30'
//                     )}
//                   >
//                     <GiBroadheadArrow size={20} />
//                     <span>Weapons</span>
//                   </div>

//                   <div
//                     onClick={() =>
//                       setSearchParams(
//                         (prev) => {
//                           prev.set('type', 'gems')
//                           return prev
//                         },
//                         { replace: true }
//                       )
//                     }
//                     className={cn(
//                       'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
//                       {
//                         'bg-secondary-100 text-primary-500':
//                           currentType === 'gems',
//                       }
//                     )}
//                   >
//                     <GiBroadheadArrow size={20} />
//                     <span>Gems</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <p>Games</p>
//                 <div className="flex flex-wrap items-center gap-1.5 rounded-[30px] border-2 border-[#202660] p-1.5">
//                   <div
//                     onClick={() =>
//                       setSearchParams(
//                         (prev) => {
//                           prev.set('games', 'all')
//                           return prev
//                         },
//                         { replace: true }
//                       )
//                     }
//                     className={cn(
//                       'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
//                       {
//                         'bg-secondary-100 text-primary-500':
//                           currentGame === 'all',
//                       }
//                     )}
//                   >
//                     <GiBloodySword size={20} />
//                     <span>All</span>
//                   </div>
//                   <div
//                     onClick={() =>
//                       setSearchParams(
//                         (prev) => {
//                           prev.set('games', 'magiccraft')
//                           return prev
//                         },
//                         { replace: true }
//                       )
//                     }
//                     className={cn(
//                       'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
//                       {
//                         'bg-secondary-100 text-primary-500':
//                           currentGame === 'magiccraft',
//                       }
//                     )}
//                   >
//                     <GiBroadheadArrow size={20} />
//                     <span>MagicCraft</span>
//                   </div>

//                   <div
//                     onClick={() =>
//                       setSearchParams(
//                         (prev) => {
//                           prev.set('games', 'magicrunner')
//                           return prev
//                         },
//                         { replace: true }
//                       )
//                     }
//                     className={cn(
//                       'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
//                       {
//                         'bg-secondary-100 text-primary-500':
//                           currentGame === 'magicrunner',
//                       }
//                     )}
//                   >
//                     <GiMagicSwirl size={20} />
//                     <span>MagicRunner</span>
//                   </div>

//                   <div
//                     onClick={() =>
//                       setSearchParams(
//                         (prev) => {
//                           prev.set('games', 'magic8ball')
//                           return prev
//                         },
//                         { replace: true }
//                       )
//                     }
//                     className={cn(
//                       'flex cursor-pointer items-center gap-1 rounded-full p-2 text-secondary-100',
//                       {
//                         'bg-secondary-100 text-primary-500':
//                           currentGame === 'magic8ball',
//                       }
//                     )}
//                   >
//                     <GiMagicSwirl size={20} />
//                     <span>Magic8Ball</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="grid  place-items-center text-2xl font-bold">
//               Coming Soon
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }




import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import charactersTabIcon from '@/assets/images/characters-tab-icon.png';
import itemsTabIcon from '@/assets/images/items-tab-icon.png';
import landsTabIcon from '@/assets/images/lands-tab-icon.png';

import rareNftIcon from '@/assets/images/rare-nft-icon.png';
import epicNftIcon from '@/assets/images/epic-nft-icon.png';
import legendaryNftIcon from '@/assets/images/legendary-nft-icon.png';

import { GiBloodySword, GiBroadheadArrow } from 'react-icons/gi';
import { useState } from 'react';

export interface ListedNft {
  contractAddress: string;
  tokenID: number;
  seller: string;
  duration: number;
  endingPrice: number;
  isMCRT: boolean;
  startAt: number;
  startingPrice: number;
  createdAt: string;
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

export type Rarity = 'rare' | 'epic' | 'legendary';

export function Filter() {
  const [searchParams, setSearchParams] = useSearchParams({
    collection: 'genesis',
    sort: 'desc',
    tab: 'characters',
    type: 'all',
    games: 'all',
  });

  const [rarity, setRarity] = useState<Rarity[]>(() => {
    const rarityParams = searchParams.get('rarity');
    return rarityParams ? (rarityParams.split(',') as Rarity[]) : ['rare', 'epic', 'legendary'];
  });

  const currentTab = searchParams.get('tab');
  const currentCollection = searchParams.get('collection');
  const currentType = searchParams.get('type');

  const toggleRarity = (rarityValue: Rarity) => {
    setRarity((prevRarity) => {
      const hasRarity = prevRarity.includes(rarityValue);
      const newRarity = hasRarity ? prevRarity.filter((r) => r !== rarityValue) : [...prevRarity, rarityValue];

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('rarity', newRarity.join(','));
      setSearchParams(newSearchParams, { replace: true });

      return newRarity;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="top-10 w-full rounded-[22px] bg-gradient-to-b from-primary-200 to-transparent p-px shadow-xl md:h-fit lg:sticky lg:w-[25%]">
      <div className="rounded-[22px] bg-primary-600">
        <div className="flex justify-evenly px-4 pt-4 pb-2">
          {['characters', 'items', 'lands'].map((tab) => (
            <div
              key={tab}
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', tab);
                return prev;
              }, { replace: true })}
              className={cn(
                'flex flex-col items-center gap-1 cursor-pointer px-3 py-2 rounded-t-md',
                {
                  'border-b-2 border-primary-200 bg-primary-400': currentTab === tab,
                  'text-white': currentTab !== tab,
                }
              )}
            >
              <img
                width={24}
                height={24}
                src={
                  tab === 'characters'
                    ? charactersTabIcon
                    : tab === 'items'
                    ? itemsTabIcon
                    : landsTabIcon
                }
                alt={tab.charAt(0).toUpperCase() + tab.slice(1)}
              />
              <span className="text-sm capitalize">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
            </div>
          ))}
        </div>

        <div className="h-[500px] rounded-[20px] border-t border-primary-200 bg-primary-400 px-4 py-4 md:px-6 md:py-[30px]">
          <p className="pb-5 font-sans text-lg font-bold tracking-wider text-white md:text-2xl">Filter</p>

          {currentTab === 'characters' && (
            <CharacterFilters
              currentCollection={currentCollection || ''}
              toggleRarity={(type: string) => toggleRarity(type as Rarity)}
              rarity={rarity}
              setSearchParams={setSearchParams}
            />
          )}
          {currentTab === 'items' && (
            <ItemFilters currentType={currentType || ''} setSearchParams={setSearchParams} />
          )}

          {currentTab === 'lands' && (
            <div className="grid place-items-center text-2xl font-bold text-white">
              Coming Soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface CharacterFiltersProps {
  currentCollection: string;
  toggleRarity: (type: string) => void;
  rarity: string[];
  setSearchParams: (prev: any) => void;
}

function CharacterFilters({ currentCollection, toggleRarity, rarity, setSearchParams }: CharacterFiltersProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <p>Collection</p>
        <div className="flex flex-wrap items-center gap-1.5 rounded-[30px] border-2 border-[#202660] p-1.5">
          <FilterButton
            onClick={() => {
              setSearchParams((prev: { set: (arg0: string, arg1: string) => void; }) => {
                prev.set('collection', 'genesis');
                return prev;
              });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isActive={currentCollection === 'genesis'}
            icon={<GiBloodySword size={20} />}
            label="Genesis"
          />
          <FilterButton
            onClick={() => {
              setSearchParams((prev: { set: (arg0: string, arg1: string) => void; }) => {
                prev.set('collection', 'revelation');
                return prev;
              });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isActive={currentCollection === 'revelation'}
            icon={<GiBroadheadArrow size={20} />}
            label="Revelation"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p>Rarity</p>
        <div className="flex flex-wrap items-center gap-1.5 rounded-[30px] border-2 border-[#202660] p-1.5">
          {[{ type: 'rare', icon: rareNftIcon, label: 'Rare' }, { type: 'epic', icon: epicNftIcon, label: 'Epic' }, { type: 'legendary', icon: legendaryNftIcon, label: 'Legendary' }].map(({ type, icon, label }) => (
            <div
              key={type}
              onClick={() => toggleRarity(type)}
              className={cn(
                'flex cursor-pointer items-center gap-1 rounded-full px-2 py-2 text-secondary-100',
                {
                  'bg-secondary-100 text-primary-500': rarity.includes(type),
                }
              )}
            >
              <img className="w-4" src={icon} alt={`${label} NFT`} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ItemFiltersProps {
  currentType: string;
  setSearchParams: (params: URLSearchParams) => void;
}

function ItemFilters({ currentType, setSearchParams }: ItemFiltersProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <p>Type</p>
        <div className="flex flex-wrap items-center gap-1.5 rounded-[30px] border-2 border-[#202660] p-1.5">
          <FilterButton
            onClick={() => setSearchParams(new URLSearchParams({ type: 'all' }))}
            isActive={currentType === 'all'}
            icon={<GiBloodySword size={20} />}
            label="All"
          />
          <FilterButton onClick={() => {}} isActive={false} icon={<GiBroadheadArrow size={20} />} label="Coins" />
          <FilterButton onClick={() => {}} isActive={false} icon={<GiBroadheadArrow size={20} />} label="Skins" />
          <FilterButton onClick={() => {}} isActive={false} icon={<GiBroadheadArrow size={20} />} label="Weapons" />
          <FilterButton onClick={() => setSearchParams(new URLSearchParams({ type: 'gems' }))} isActive={currentType === 'gems'} icon={<GiBroadheadArrow size={20} />} label="Gems" />
        </div>
      </div>
    </div>
  );
}

interface FilterButtonProps {
  onClick: () => void;
  isActive: boolean;
  icon: JSX.Element;
  label: string;
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
  );
}
