
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '@/services/state/store'
import { ArrowLeft, Wallet } from 'lucide-react'
import { RiSpeedFill } from 'react-icons/ri'
import { BsStars, BsBarChartFill, BsCalendarEventFill } from 'react-icons/bs'
import { Border } from '@/components/ui/border'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { GEM_PACK_DATA } from '@/lib/constants'
import { numberWithCommas } from '@/lib/helpers'
import mcrtIcon from '@/assets/icons/icon-mcrt.png'

const attributes = [
  {
    id: 1,
    title: 'Speed Up Progress',
    description: 'Bypass time-consuming tasks and level up faster.',
    icon: RiSpeedFill,
  },
  {
    id: 2,
    title: 'Exclusive Items',
    description: 'Access unique gear and cosmetics only available via gems.',
    icon: BsStars,
  },
  {
    id: 3,
    title: 'Power Boosts',
    description: 'Enhance abilities to dominate in competitive play.',
    icon: BsBarChartFill,
  },
  {
    id: 4,
    title: 'Event Participation',
    description: 'Gain entry to special, limited-time in-game events',
    icon: BsCalendarEventFill,
  },
]

export default function ItemPage() {
  const mcrtPrice = useAppSelector((state) => state.mcrtPrice.mcrtPrice)
  const { id: itemId } = useParams()
  const navigate = useNavigate()

  const [selectedItem] = useState(
    () => GEM_PACK_DATA.filter((item) => item.id === Number(itemId))[0]
  )

  const itemPriceDollar = selectedItem?.price_in_usd

  let itemPrice
  if (mcrtPrice === null || mcrtPrice === undefined || mcrtPrice === 0) {
    itemPrice = 0
  } else {
    itemPrice = itemPriceDollar / mcrtPrice
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  if (selectedItem === undefined || selectedItem === null) {
    return null
  }

  return (
    <div className="relative z-10 min-h-dvh w-full bg-gradient-to-b from-[#0D021B7A] to-primary-600 pb-6 md:pb-10 lg:pb-20">
      <div className="mx-auto min-h-dvh w-full max-w-screen-xl px-4 md:px-6 lg:w-[95%]">
        <div className="py-4 md:py-[30px]">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className=" sm:inline">Back to all Items</span>
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-[30px]">
          <div className="mb-6 flex justify-center lg:mb-0">
            <Border className="h-[300px] w-[300px] p-[3px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]">
              <img
                src={selectedItem?.img}
                alt={`${selectedItem?.gems} gems`}
                className="h-full w-full rounded-2xl bg-primary-500 object-cover"
              />
            </Border>
          </div>

          <div className="grow space-y-6 md:space-y-10">
            <div className="space-y-6 rounded-[20px] bg-primary-400 p-6 shadow-xl shadow-black md:space-y-10 md:p-10">
              <div className="space-y-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl md:text-[30px]">
                      {selectedItem?.gems} gems
                    </h3>
                    <div className="w-fit rounded-md bg-[#3044F8] px-2 text-sm md:text-base">
                      All games
                    </div>
                  </div>
                  <div className="rounded-[30px] bg-primary-200 px-3 py-1 text-sm text-primary-100">
                    #{selectedItem?.id}
                  </div>
                </div>

                <Separator className="via-secondary-100/50" />

                <div className="space-y-4">
                  <h5 className="text-xl text-tertiary-100 md:text-2xl">Description</h5>
                  <p className="text-balance text-base md:text-lg">
                    Elevate your gaming experience with our Gems! Use Gems to
                    access exclusive items, accelerate your progress, and gain
                    unique advantages. Safe, secure, and instant delivery right
                    to your account!
                  </p>
                </div>

                <Separator className="via-secondary-100/50" />

                <div className="space-y-4">
                  <h5 className="text-xl text-tertiary-100 md:text-2xl">Abilities</h5>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {attributes.map((attr) => (
                      <div
                        key={attr.id}
                        className="flex items-start gap-4 rounded-2xl bg-[#0C0C29] p-4 md:p-5"
                      >
                        {attr.icon === BsCalendarEventFill ? (
                          <attr.icon size={16} className="mt-1 flex-shrink-0" />
                        ) : (
                          <attr.icon size={24} className="mt-1 flex-shrink-0" />
                        )}
                        <div>
                          <h6 className="text-lg md:text-[22px]">{attr?.title}</h6>
                          <p className="text-balance text-sm text-white/60">
                            {attr?.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-4 sm:flex-row sm:items-center sm:justify-end sm:gap-[30px]">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center md:h-11 md:w-11">
                    <img src={mcrtIcon} alt="MCRT" className="w-full" />
                  </div>
                  <div>
                    <p className="text-lg md:text-[24px]">
                      {numberWithCommas(itemPrice?.toFixed(3).toString() ?? '')}
                    </p>
                    <p className="text-right text-sm text-tertiary-100">
                      $ {numberWithCommas(itemPriceDollar?.toFixed(2) ?? '')}
                    </p>
                  </div>
                </div>
                <Button className="min-h-[50px] w-full gap-2 sm:w-auto md:min-h-[60px] md:gap-[10px]">
                  <Wallet className="h-5 w-5" />
                  <p className="text-lg md:text-[22px]">Buy Item</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}