import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { useDogeNft } from '@/hooks/useContract';
import { MintingInterface } from '@/components/MintingInterface';

export const DogeMint: React.FC = () => {
  const { account } = useWeb3React();
  const dogeNftContract = useDogeNft();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Free Mint: Doge NFT</h1>
        {dogeNftContract ? (
          <MintingInterface account={account} dogeNftContract={dogeNftContract} />
        ) : (
          <p className="text-center text-lg">Loading contract...</p>
        )}
      </div>
    </div>
  );
};
