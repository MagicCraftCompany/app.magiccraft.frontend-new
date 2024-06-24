import { TypographyH1, TypographyH2 } from '@/components/Typography'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-5 pt-20 ">
      <TypographyH1>So Sorry!</TypographyH1>
      <TypographyH2 className="text-balance">
        The page you are looking for cannot be found
      </TypographyH2>

      <Button asChild size={'lg'} className="gap-2 text-xl font-bold">
        <Link to={'/'}>
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </Button>
    </div>
  )
}

export default NotFoundPage
