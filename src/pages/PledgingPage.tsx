import ROICalculator from '@/components/RoiCalculator/RoiCalculator'
import {
  ArrowUpLeft,
  Calculator,
  Calendar,
  ImageIcon,
  Info,
  Link2,
} from 'lucide-react'
import { useState, ReactNode } from 'react'

const stakingPeriods = [
  { days: 30, label: '30 days' },
  { days: 90, label: '90 days' },
  { days: 180, label: '180 days' },
  { days: 365, label: '1 year' },
]

const rewardsData = [
  { period: '180 days', reward: 'NFT', mcrtRequired: '80,000' },
  { period: '1 year', reward: 'Character', mcrtRequired: '160,000' },
  { period: '3 years', reward: 'Land', mcrtRequired: '1,600,000' },
  { period: '5 years', reward: 'Land x 2', mcrtRequired: '2,500,000' },
]

export default function Component() {
  const [selectedToken, setSelectedToken] = useState('mcrt')
  const [amount, setAmount] = useState('')
  const [stakingPeriod, setStakingPeriod] = useState('')
  const [showTooltip, ] = useState(false)
  const [showROICalculator, setShowROICalculator] = useState(false)


  const Button = ({
    children,
    variant = 'default',
    size = 'default',
    className = '',
    onClick,
  }: {
    children: ReactNode
    variant?: string
    size?: string
    className?: string
    onClick?: () => void
  }) => (
    <button
      className={`rounded-md px-4 py-2 font-medium ${
        variant === 'outline' ? 'border border-[#98FFF9]' : ''
      } ${size === 'sm' ? 'text-sm' : 'text-base'} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )

  const Card = ({
    children,
    className = '',
  }: {
    children: ReactNode
    className?: string
  }) => <div className={`rounded-lg  ${className}`}>{children}</div>

  const Select = ({
    options,
    value,
    onChange,
    placeholder,
  }: {
    options: { value: string; label: string }[]
    value: string
    onChange: (value: string) => void
    placeholder: string
  }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-md border-[1px] border-solid border-[#202660] bg-[#161846] px-4 py-2 text-white"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
            fillRule="evenodd"
          />
        </svg>
      </div>
    </div>
  )

  const Input = ({
    type,
    placeholder,
    value,
    onChange,
    className = '',
  }: {
    type: string
    placeholder: string
    value: string
    onChange: (value: string) => void
    className?: string
  }) => (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-md border border-[#2E2B8C] bg-[#14124F] px-4 py-2 text-white ${className}`}
    />
  )

  return (
    <div className="relative z-10 min-h-dvh w-full pb-20">
      <div className="mx-auto min-h-dvh w-[95%] max-w-screen-xl">
        <div className="py-[30px]">
          <Button variant="ghost" size="sm" className="flex flex-row gap-1">
            <ArrowUpLeft className="h-5 w-5" />
            <span className="font-medium">Back to $MCRT page</span>
          </Button>
        </div>

        <div className="flex flex-col gap-10 pt-10 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2.5">
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
              MCRT PLEDGING
            </h1>
            <h2 className="text-2xl text-white md:text-[30px] bg-[#351056] rounded-4xl w-fit border border-solid border-[#B490F1] p-4">
              TVL: 661,639,136 MCRT
            </h2>
          </div>

          <div className="absolute lg:right-2 top-[18em] lg:top-0 space-y-1 rounded-[20px] bg-[#0C021899] px-6 py-4 backdrop-blur  lg:px-10 lg:py-7 ">
            <div className="flex flex-col items-center gap-2">
              <span className="text-lg text-white lg:text-2xl">
                Available amount:
              </span>
              <span className="text-3xl font-bold text-white">11.92% APR</span>
            </div>
          </div>
        </div>

        <div className="mt-[10em] grid gap-6 md:grid-cols-2">
          <Card className="space-y-6 rounded-xl border border-[#2E2B8C] bg-[#14124F] p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Choose Your Staking Rewards:
                  </h3>
                  <div className="mt-10  flex flex-col gap-2">
                    <span className="text-sm text-white">Staked MCRT:</span>
                    <span className="font-serif text-sm text-white">
                      305 $MCRT
                    </span>
                    <span className="text-xs text-[#56E39F]">
                      From Staking started:-54.56%
                    </span>
                  </div>
                </div>
                <div className="-mt-10 flex w-fit items-center gap-2 rounded-full bg-[#03082F] p-1">
                  <button
                    onClick={() => setSelectedToken('mcrt')}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      selectedToken === 'mcrt'
                        ? 'bg-[#98FFF9] text-[#03082F]'
                        : 'bg-transparent text-[#98FFF9]'
                    }`}
                  >
                    <Link2 className="h-4 w-4" />
                    MCRT Token
                  </button>

                  <button
                    onClick={() => setSelectedToken('nft')}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      selectedToken === 'nft'
                        ? 'bg-[#98FFF9] text-[#03082F]'
                        : 'bg-transparent text-[#98FFF9]'
                    }`}
                  >
                    <ImageIcon className="h-4 w-4" />
                    NFT
                  </button>
                </div>

              
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Token Amount
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-solid border-[#202660] bg-[#161846] p-3">
                    <Input
                      type="number"
                      placeholder="0"
                      value={amount}
                      onChange={setAmount}
                      className="border-none  bg-transparent text-white focus:ring-0"
                    />
                    <button className="font-semibold text-[#98FFF9]">
                      Max
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Pledging Period
                  </label>
                  <Select
                    options={stakingPeriods.map((period) => ({
                      value: period.days.toString(),
                      label: period.label,
                    }))}
                    value={stakingPeriod}
                    onChange={setStakingPeriod}
                    placeholder="Stake (lock) for 30 days"
                  />
                </div>

                <div className="flex w-fit items-center gap-2 rounded-4xl bg-[#201147] p-3 ">
                  <span className="flex flex-row text-sm font-medium text-white   ">
                    Stake until:{' '}
                    <Calendar className="mx-2 h-4 w-4 text-[#C09AFF]" /> 21 Dec
                    2023 19:15:13
                  </span>
                </div>
              </div>

             
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="flex-1 bg-[#98FFF9] font-semibold text-[#03082F] hover:bg-[#98FFF9]/90">
                  {selectedToken === 'mcrt' ? 'Pledge' : 'Pledge NFT'}
                </Button>
                {selectedToken === 'mcrt' ? (
                  <Button
                    variant="outline"
                    className="flex-1 border-[#98FFF9] text-[#98FFF9] hover:bg-[#98FFF9]/10"
                  >
                    Claim Token Rewards
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1 border-[#98FFF9] text-[#98FFF9] hover:bg-[#98FFF9]/10"
                    >
                      Claim NFT Rewards
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-[#98FFF9] text-[#98FFF9] hover:bg-[#98FFF9]/10"
                    >
                      Redeem NFT
                    </Button>
                  </>
                )}
              </div>

              {selectedToken === 'nft' && (
                <div className="flex items-center gap-2 text-sm text-[#FF4D4D]">
                  <span className="text-xl">⚠</span>
                  Having troubles pledging or unpledging?
                </div>
              )}
            </div>
          </Card>

          <div className="">
            <div className=" rounded-2xl  border border-[#2E2B8C] bg-gradient-to-r from-[#2A0D4E] to-[#57186D] to-90% p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Choose Your Staking Rewards:
                </h3>
                <div className="relative ">
                  <Button
                    size="sm"
                    onClick={() => setShowROICalculator(true)}
                    className="m-4 flex flex-row text-[#98FFF9] "
                  >
                    <Calculator className="mr-2 h-4 w-4 text-[#98FFF9]" />
                    ROI Calculator
                  </Button>
                  {showTooltip && (
                    <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-[#2E2B8C] px-2 py-1 text-sm text-white">
                      Calculate your return on investment
                    </div>
                  )}
                </div>
              </div>

              <Card className=" rounded-xl p-6 shadow-md">
                <div className="overflow-hidden rounded-xl">
                  <table className="w-full border-separate border-spacing-0 text-center">
                    <thead>
                      <tr className=" bg-[#380F4A]">
                        <th className="border-r border-[#8558BA] p-4 text-left text-lg font-semibold text-white">
                          Duration
                        </th>
                        <th className="border-r border-[#8558BA] p-4 text-left text-lg font-semibold text-white">
                          NFT
                        </th>
                        <th className="p-4 text-left text-lg font-semibold text-white">
                          MCRT Required
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rewardsData.map((row, index) => (
                        <tr
                          key={row.period}
                          className={`${
                            index % 2 === 0 ? 'bg-[#3A1050]' : 'bg-[#380F4A]'
                          } `}
                        >
                          <td className="border-r border-[#8558BA] p-4 text-sm text-white">
                            {row.period}
                          </td>
                          <td className="border-r border-[#8558BA] p-4 text-sm text-white">
                            {row.reward}
                          </td>
                          <td className="p-4 text-sm text-white">
                            {row.mcrtRequired}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
            <div className="rounded-lg bg-[#08031E]  p-4 text-sm  ">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 shrink-0" />
                <p>
                  To proceed with using our staking services, please review and
                  accept our terms and conditions. By clicking "Stake", you
                  confirm that you have read and agree with all terms and
                  conditions governing the use of our staking services, and that
                  you acknowledge the potential risks involved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ROICalculator isOpen={showROICalculator} onClose={() => setShowROICalculator(false)} />

    </div>
  )
}
