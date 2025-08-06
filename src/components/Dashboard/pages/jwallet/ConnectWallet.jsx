import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
// import { config, bsc, IOTATestnet } from '../../wagmiConfig';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { config, bsc, bscTestnet } from '../../../../wagmi';

const queryClient = new QueryClient();

const ConnectWallet = () => {
 
  return (
    <>
           <ConnectButton.Custom>
            {({
              account,
              chain,
              openConnectModal,
              openAccountModal,
              openChainModal,
              mounted,
            }) => {
              const ready = mounted;
              const connected = ready && account && chain;
              return (
                <div aria-hidden={!ready} className="text-center">
                  {!connected ? (
                    <button
                      onClick={openConnectModal}
                      className="px-6 py-2 bg-teal-600 text-white rounded-xl shadow-lg transition duration-200 mt-5"
                    >
                      Connect Wallet
                    </button>
                  ) : (
                    <div className="  mt-10">
                      <button
                        onClick={openAccountModal}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-gray-800"
                      >
                        {account.displayName}
                      </button><br></br>
                      <button
                        onClick={openChainModal}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-blue-700 mt-1"
                      >
                        {chain.name}
                      </button>
                    </div>
                  )}
                </div>
              );
            }}
          </ConnectButton.Custom>
          </>
    
  )
}

export default ConnectWallet

