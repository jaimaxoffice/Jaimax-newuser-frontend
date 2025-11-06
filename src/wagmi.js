import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import { defineChain } from 'viem';

export const bsc = defineChain({
  id: 56,
  name: 'Binance Smart Chain',
  network: 'bsc',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://bsc-dataseed.binance.org/'],
    },
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://bscscan.com' },
  },
});

export const bscTestnet = defineChain({
  id: 97,
  name: 'Binance Smart Chain Testnet',
  network: 'bsc',
  nativeCurrency: {
    name: 'tBNB',
    symbol: 'tBNB',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://bsc-testnet.public.blastapi.io'],
    },
  },
  blockExplorers: {
    default: { name: 'testnetBscScan', url: 'https://testnet.bscscan.com' },
  },
});
export const IOTATestnet = defineChain({
  id: 1075,
  name: "IOTA Testnet",
  network: "IOTA",
  nativeCurrency: {
    name: "IOTA",
    symbol: "IOTA",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.ankr.com/iota_evm_testnet"],
    },
  },
  blockExplorers: {
    default: {
      name: "iotaledger",
      url: "https://explorer.evm.testnet.iotaledger.net/",
    },
  },
});
export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'd150e711a46ed33b3dedb7c8ab1bc13c',
  chains: [mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    bsc,
    IOTATestnet,
    bscTestnet,],
  ssr: true, 
});