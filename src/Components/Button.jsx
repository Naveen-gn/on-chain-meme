import React from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import { defineChain } from '../../node_modules/viem/utils/chain/defineChain.ts';

import {ConnectButton,getDefaultConfig,RainbowKitProvider,} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  polygonAmoy,
  coreDao

} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";


export const tCore = /*#__PURE__*/ defineChain({
  id: 1115,
  name: 'Core Blockchain Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'tCore',
    symbol: 'tCORE',
  },
  rpcUrls: {
    default: { http: ['https://rpc.test.btcs.network'] },
  },
  blockExplorers: {
    default: {
      name: 'tCore',
      url: 'https://scan.test.btcs.network',
    },
  },
  
  testnet: true,
})

export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [coreDao,polygonAmoy,tCore],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();


const Button = () => {
  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
       
        <ConnectButton />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Button