import { Border } from '@/components/ui/border'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { GEM_PACK_DATA } from '@/lib/constants'
import { ArrowLeft, Wallet } from 'lucide-react'
import { RiSpeedFill } from 'react-icons/ri'
import { BsStars, BsBarChartFill, BsCalendarEventFill } from 'react-icons/bs'
import mcrtIcon from '@/assets/icons/icon-mcrt.png'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '@/services/state/store'
import { numberWithCommas } from '@/lib/helpers'

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

const ItemPage = () => {
  const mcrtPrice = useAppSelector((state) => state.mcrtPrice.mcrtPrice)
  const { id: itemId } = useParams()
  const navigate = useNavigate()

  console.log(itemId)

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
    <div className="relative z-10 h-full min-h-dvh w-full bg-gradient-to-b from-[#0D021B7A] to-primary-600 pb-20">
      <div className="mx-auto min-h-dvh w-[95%] max-w-screen-xl">
        <div className="py-[30px]">
          <Button
            variant={'ghost'}
            size={'sm'}
            className="gap-1"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
            <span>Back to all Items</span>
          </Button>
        </div>

        <div className="flex items-start gap-[30px]">
          <div className="shadow-xl">
            <Border className="h-[400px] w-[400px] p-[3px]">
              <img
                src={selectedItem?.img}
                className="h-full w-full rounded-2xl bg-primary-500"
              />
            </Border>
          </div>

          <div className="grow space-y-10">
            <div className="space-y-10 rounded-[20px] bg-primary-400 p-10 shadow-xl shadow-black">
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif text-[30px]">
                      {selectedItem?.gems} gems
                    </h3>

                    <div className="w-fit rounded-md bg-[#3044F8] px-2 text-base">
                      All games
                    </div>
                  </div>

                  <div className="rounded-[30px] bg-primary-200 px-3 py-1 text-sm text-primary-100">
                    #{selectedItem?.id}
                  </div>
                </div>

                <Separator className="via-secondary-100/50" />

                <div className="space-y-4">
                  <h5 className="text-2xl text-tertiary-100">Description</h5>

                  <p className="text-balance text-lg">
                    Elevate your gaming experience with our Gems! Use Gems to
                    access exclusive items, accelerate your progress, and gain
                    unique advantages. Safe, secure, and instant delivery right
                    to your account!
                  </p>
                </div>

                <Separator className="via-secondary-100/50" />

                <div className="space-y-4">
                  <h5 className="text-2xl text-tertiary-100">Abilities</h5>

                  <div className="grid grid-cols-2 gap-2.5">
                    {attributes.map((attr) => {
                      return (
                        <div
                          key={attr.id}
                          className="flex items-center gap-4 rounded-2xl bg-[#0C0C29] p-5"
                        >
                          {attr.icon === BsCalendarEventFill ? (
                            <attr.icon size={16} />
                          ) : (
                            <attr.icon size={24} />
                          )}

                          <div>
                            <h6 className="text-[22px]">{attr?.title}</h6>
                            <p className="text-balance text-sm text-white/60">
                              {attr?.description}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-[30px]">
                <div className="flex items-center gap-2">
                  <div className="grid h-auto w-11 place-items-center">
                    <img src={mcrtIcon} />
                  </div>

                  <div>
                    <p className="text-[24px]">
                      {numberWithCommas(itemPrice?.toFixed(3).toString() ?? '')}
                    </p>
                    <p className="text-right text-sm text-tertiary-100">
                      $ {numberWithCommas(itemPriceDollar?.toFixed(2) ?? '')}
                    </p>
                  </div>
                </div>

                <Button className="min-h-[60px] gap-[10px]">
                  <Wallet />
                  <p className="text-[22px]">Buy Item</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemPage
