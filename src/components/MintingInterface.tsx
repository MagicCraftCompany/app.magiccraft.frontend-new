import React, { useState, useEffect } from 'react';
import { Contract } from 'web3-eth-contract';
import { ethers } from 'ethers';

interface MintingInterfaceProps {
  account: string | null | undefined;
  dogeNftContract: Contract; // Specify the Web3 contract type
}

export const MintingInterface: React.FC<MintingInterfaceProps> = ({
  account,
  dogeNftContract,
}) => {
  const [isMinting, setIsMinting] = useState(false);
  const [nftAvailable, setNftAvailable] = useState<number>(3333);

  const fetchNFTAvailability = async () => {
    try {
      const totalSupply = await dogeNftContract.methods.totalSupply().call();
      setNftAvailable(3333 - Number(totalSupply));
    } catch (err) {
      console.error('Error fetching NFT availability:', err);
    }
  };

  useEffect(() => {
    if (dogeNftContract) {
      fetchNFTAvailability();
    }
  }, [dogeNftContract]);

  const onMintNFT = async () => {
    if (account) {
      setIsMinting(true);
      try {
        const gas = await dogeNftContract.methods.mint().estimateGas({ from: account });
        const publicMint = await dogeNftContract.methods.mint().send({
          from: account,
          gasPrice: ethers.utils.parseUnits('10', 'gwei'),
          gas,
        });
        console.log('Mint successful:', publicMint);
        await fetchNFTAvailability(); // Update availability after minting
      } catch (err) {
        console.error('Minting failed:', err);
        alert('Minting failed. Please try again.');
      } finally {
        setIsMinting(false);
      }
    } else {
      alert('Please connect your wallet first.');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 md:p-8 shadow-xl">
      <div className="mb-6">
        <p className="text-lg mb-4">
          Register in the MagicCraft ecosystem to claim your free Doge NFT, unlocking an exclusive
          skin for Vega in MagicCraft Game.
        </p>
        <p className="text-lg font-semibold">So brave, so Doge...</p>
      </div>
      <div className="bg-gray-700 rounded-lg p-4 mb-6 flex items-center justify-between">
        <span className="text-lg font-semibold">Available amount:</span>
        <span className="text-xl font-bold">{nftAvailable} / 3333 NFTs</span>
      </div>
      <div className="flex justify-center">
        <img
          src="https://res.cloudinary.com/dfzcr2ch4/image/upload/v1732089637/dogewarriornft_koyb8l.webp"
          alt="Doge NFT"
          width={256}
          height={256}
          className="rounded-lg"
        />
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-2xl font-bold mb-2">So Doge</h3>
        {account ? (
          <button
            onClick={onMintNFT}
            disabled={isMinting}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            {isMinting ? 'Minting...' : 'Mint'}
          </button>
        ) : (
          <p className="text-red-400 font-bold">
            Please connect your wallet to start minting.
          </p>
        )}
      </div>
    </div>
  );
};
