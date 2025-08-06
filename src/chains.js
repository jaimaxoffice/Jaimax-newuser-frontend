// chains.ts
import { defineChain } from 'viem'

export const bsc = defineChain({
  id: 56,
  name: 'Binance Smart Chain',
  network: 'bsc',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance Coin',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: {
      http: ['https://bsc-dataseed.binance.org/'],
    },
    public: {
      http: ['https://bsc-dataseed.binance.org/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BscScan',
      url: 'https://bscscan.com',
    },
  },
})

export const bscTestnet = defineChain({
  id: 97,
  name: 'BSC Testnet',
  network: 'bscTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Testnet BNB',
    symbol: 'tBNB',
  },
  rpcUrls: {
    default: {
      http: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    },
    public: {
      http: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BscScan',
      url: 'https://testnet.bscscan.com',
    },
  },
  testnet: true,
})
