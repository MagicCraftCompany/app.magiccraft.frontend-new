import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Router from '@/Router'
import { getOvioDataFromUrl, init } from 'ovio-gg-web3'
import { useEffect, useState } from 'react'
import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from './lib/constants'
import { setUser } from './services/state/currentUser/currentUserSlice'
import { getCurrentUser } from './services/api/utils/user'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './components/ui/button'
import { legalBannerKey, useOnceEver } from './hooks/useOnceEver'
import {
  setBnbPrice,
  setMcrtPrice,
  useAppDispatch,
} from './services/state/store'
import Modal, { setModal } from '@/components/Modal/Modal'
// import W3ModalProvider, { getUser } from '@/components/W3ModalProvider'
import { useQuery } from '@tanstack/react-query'
import { getMCRTPrice } from './services/api/utils/mcrt'
import SnackBar from '@/components/SnackBar/SnackBar'
import { getBNBPrice } from './services/api/utils/bnb'

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()

  const location = useLocation()
  const showBackground = !['/nft/', '/item/'].some((path) =>
    location.pathname.includes(path)
  )

  useQuery({
    queryKey: ['mcrtPrice'],
    queryFn: async () => {
      const data = await getMCRTPrice()

      if (data) {
        dispatch(setMcrtPrice(data))
        return data
      }
    },
    refetchInterval: 600_000,
    staleTime: 600_000,
  })

  useQuery({
    queryKey: ['bnbPrice'],
    queryFn: async () => {
      const data = await getBNBPrice()

      if (data) {
        dispatch(setBnbPrice(data))
        return data
      }
    },
    refetchInterval: 600_000,
    staleTime: 600_000,
  })

  useOnceEver(
    legalBannerKey,
    (hasRun) => {
      hasRun()
      setModal({
        content: ({ onClose }) => (
          <div className="flex flex-col gap-12">
            <p className="text-center">
              By using the Lobby System or participating in a Tournament, you
              agree to waive any claims against MagicCraft for any losses,
              damages or liabilities incurred, including those caused by bugs,
              security breaches, or other issues. MagicCraft reserves the right
              to terminate or suspend access to the Lobby System at any time and
              for any reason without notice. Please read the full{' '}
              <Link className="underline" to="/terms" onClick={onClose}>
                Terms and Conditions
              </Link>{' '}
              carefully before using the Lobby System or participating in a
              Tournament.
            </p>
            <div className="flex flex-col gap-8 md:flex-row">
              <Link to="/terms" className="w-full">
                <Button className="w-full" onClick={onClose}>
                  Terms & Conditions
                </Button>
              </Link>
              <Button className="w-full" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        ),
        title: 'Terms & Conditions',
      })
    },
    []
  )

  useEffect(() => {
    setTimeout(() => setLoading(false), 0)

    function ovio() {
      const params = getOvioDataFromUrl(window.location.href)

      init(params.gamerId || '', 'd73f3eb6-412a-4f34-a672-0e9d580b4824')
    }

    if (localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY)) {
      getCurrentUser().then((user) => {
        dispatch(setUser(user))
      })
    }
    ovio()
  }, [])

  return (
    <div className="min-h-dvh w-full overscroll-none text-white">
      <>
        {showBackground && (
          <div className="absolute h-[900px] w-full bg-hero bg-cover bg-center"></div>
        )}
        <div className="hero-bg-gradient absolute h-[900px] w-full"></div>
      </>
      <Header />
      <main className="min-h-screen overscroll-none scroll-smooth pb-32">
        <Router />
      </main>
      <Footer />
      <Modal />
      <SnackBar />
    </div>
  )
}

export default App
