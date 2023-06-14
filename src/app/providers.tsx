import WagmiProvider from "@/providers/wagmi";
import React, { ReactNode } from "react";

const RootProvider = ({ children }: { children: ReactNode }) => {
  return <WagmiProvider>{children}</WagmiProvider>;
};

export default RootProvider;
