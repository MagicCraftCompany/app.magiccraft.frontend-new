import { Minus } from 'lucide-react'

type RoadmapCardType = {
  data: {
    quarter: number
    variant: 'default' | 'purple'
    goals: {
      features: string[]
    }[]
  }
}

const RoadmapCard = ({ data }: RoadmapCardType) => {
  return (
    <div className="min-w-72 snap-center space-y-6 ">
      <h3 className=" bg-gradient-to-b from-white to-white/75 bg-clip-text text-center font-serif text-4xl text-transparent drop-shadow-xl">
        Q{data.quarter} 24
      </h3>

      <div className="grid grid-cols-1 gap-8">
        {data.goals.map((goal, i) => {
          return (
            <div
              key={i}
              className="rounded-4xl bg-gradient-to-b from-[#B591F2] to-transparent p-px"
            >
              <div
                className={`rounded-4xl space-y-5 bg-gradient-to-r 
              ${data.variant === 'default' ? 'from-[#3D186D] to-[#2A0D4E]' : 'from-[#2A0D4E] to-[#57186D] '}
              `}
              >
                <div className="bg-black/20 px-7 py-5">
                  <h3 className="text-center font-serif text-3xl">Features</h3>
                </div>
                <div className="space-y-2 px-5 pb-6">
                  {goal.features.map((feature, i) => {
                    return (
                      <div key={i} className="flex items-start gap-[10px]">
                        <div className="shrink-0 py-1">
                          <Minus size={20} className="text-white/50" />
                        </div>
                        <div className="text-2xl">{feature}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RoadmapCard
