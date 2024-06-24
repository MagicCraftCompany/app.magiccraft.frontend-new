import { TypographyH1 } from '@/components/Typography'
import { Button } from '@/components/ui/button'
import { ArrowUpLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PledgingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="relative z-10 h-full min-h-dvh w-full pb-20">
      <div className="mx-auto min-h-dvh w-[95%] max-w-screen-xl">
        <div className="py-[30px]">
          <Button
            variant={'ghost'}
            size={'sm'}
            className="gap-1"
            onClick={() => navigate('/')}
          >
            <ArrowUpLeft size={18} />
            <span className="font-medium">Back to $MCRT page</span>
          </Button>
        </div>

        <div className="flex items-start justify-between pt-20">
          <div className="space-y-2.5">
            <TypographyH1>MCRT pledging</TypographyH1>

            <h2 className="text-[30px]">TVL: 0 MCRT</h2>
          </div>

          <div className=""></div>
        </div>
      </div>
    </div>
  )
}

export default PledgingPage
