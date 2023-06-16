"use client";
import React from "react";
import { ReactNode } from "react";
import { WagmiConfig, createConfig, configureChains, Chain } from "wagmi";
import { filecoinCalibration } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";

export const bitkubChainTestnet: Chain = {
  id: 25_925,
  name: "BKC Testnet",
  network: "bitkub",
  nativeCurrency: {
    decimals: 18,
    name: ".Bitkub Coin",
    symbol: "KUB",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.bitkubchain.io"],
    },
    public: {
      http: ["https://rpc-testnet.bitkubchain.io"],
    },
  },
  blockExplorers: {
    default: { name: "BKCscan", url: "https://testnet.bkcscan.com" },
    etherscan: { name: "BKCscan", url: "https://testnet.bkcscan.com" },
  },
  testnet: true,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bitkubChainTestnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [new MetaMaskConnector({ chains })],
});
const WagmiProvider = ({ children }: { children: ReactNode }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default WagmiProvider;
