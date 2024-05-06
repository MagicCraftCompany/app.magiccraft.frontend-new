import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import MarketplacePage from '@/pages/MarketplacePage'
import PledgingPage from '@/pages/PledgingPage'
import InventoryPage from '@/pages/InventoryPage'
import MintingPage from '@/pages/MintingPage'

const Router = () => {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<MarketplacePage />} path="/marketplace" />
      <Route element={<PledgingPage />} path="/pledging" />
      <Route element={<InventoryPage />} path="/inventory" />
      <Route element={<MintingPage />} path="/mint" />
      {/* <Route element={<NftPage />} path='/marketplace/:nft_address/:id' /> */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default Router
