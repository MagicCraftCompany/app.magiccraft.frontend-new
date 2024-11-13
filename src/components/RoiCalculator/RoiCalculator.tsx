import { X } from 'lucide-react';
import { useState} from 'react'




function ROICalculator({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [pledgedUSD, setPledgedUSD] = useState('0.00')
    const [pledgedMCRT, setPledgedMCRT] = useState('0.00')
    const [selectedPeriod, setSelectedPeriod] = useState('30d')
  
    const handleSwap = () => {
      // Implement swap logic here
    }
  
    const calculateROI = () => {
      // Implement ROI calculation logic here
      return { usd: '0.00', mcrt: '0.00 MCRT (0.00%)' }
    }
  
    if (!isOpen) return null
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
        <div className="w-full max-w-lg  rounded-xl bg-[#161242] p-6 border-[1px] border-solid boder-[#202660]">
          <div className="flex items-center justify-between">
            <div className="flex justify-center">
              <h2 className="text-2xl font-bold text-white font-serif">ROI CALCULATOR</h2>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-300">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-4 space-y-4 ">
            <div>
              <p className="mb-2 text-sm text-white mt-4">MCRT Pledged</p>
              <div className="flex items-center ">
                <input
                  type="text"
                  value={pledgedUSD}
                  onChange={(e) => setPledgedUSD(e.target.value)}
                  className="bg-[#1B184B] text-white p-4 rounded-xl"
                  placeholder="0.00 USD"
                />
                <button onClick={handleSwap} className="text-[#98FFF9] m-1">
                  ⇄
                </button>
                <input
                  type="text"
                  value={pledgedMCRT}
                  onChange={(e) => setPledgedMCRT(e.target.value)}
                  className="bg-[#1B184B] p-4 text-white rounded-xl"
                  placeholder="0.00 MCRT"
                />
              </div>
            </div>
            <div className="flex justify-between">
              {['$1000', '$2500', '$5000', '$10000'].map((amount) => (
                <button
                  key={amount}
               
                  onClick={() => setPledgedUSD(amount.slice(1))}
                  className={`border-[#252C76]  border-[1px] p-4 rounded-2xl ${
                    pledgedUSD === amount.slice(1) ? 'bg-[#98FFF9] text-[#14124F]' : 'text-[#98FFF9]'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>
            <div>
              <p className="mb-2 text-sm text-white mt-4">Pledging Period</p>
              <div className="flex justify-between  border-[2px] border-solid border-[#202660] bg-[#1B184B] p-2 rounded-4xl mt-4 ">
                {['30d', '90d', '180d', '1y', '3y', '5y'].map((period) => (
                  <button
                    key={period}
                   
                    onClick={() => setSelectedPeriod(period)}
                    className={`border-[#98FFF9] py-2 px-4 rounded-4xl ${
                      selectedPeriod === period ? 'bg-[#98FFF9] text-[#14124F]' : 'text-[#98FFF9]'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-[#3B2C47]/30 p-4 border-solid border-[#202660] border-[1px] ">
              <p className="text-2xl text-[#C09AFF] font-sans font-bold">ROI at Current Rates</p>
              <p className="text-xl font-bold text-white">${calculateROI().usd}</p>
              <p className="text-sm text-[#8B77AA]">{calculateROI().mcrt}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  export default ROICalculator