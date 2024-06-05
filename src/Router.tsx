import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import MarketplacePage from '@/pages/MarketplacePage'
import PledgingPage from '@/pages/PledgingPage'
import InventoryPage from '@/pages/InventoryPage'
import MintingPage from '@/pages/MintingPage'
import NFTPage from '@/pages/NFTPage'
import ItemPage from '@/pages/ItemPage'

const Router = () => {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<MarketplacePage />} path="/marketplace" />
      <Route element={<NFTPage />} path="/nft/:nft_address/:id" />
      <Route element={<ItemPage />} path="/item/:id" />
      <Route element={<PledgingPage />} path="/pledging" />
      <Route element={<InventoryPage />} path="/inventory" />
      <Route element={<MintingPage />} path="/mint" />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default Router
