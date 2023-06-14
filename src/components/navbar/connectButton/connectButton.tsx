"use client";
import React, { useEffect } from "react";
import { Button } from "../../ui/button";
import { useAccount, useConnect, useEnsAvatar, useEnsName } from "wagmi";
import { ShortAddress } from "@/utils/common";

const ConnectButton = () => {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { isConnected, address } = useAccount();
  const { data: ensName } = useEnsName({
    address: "0x00E5F7a306DfD157740d24BfC40b749313d8D110",
  });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
  });

  useEffect(() => {
    console.log("ensAvatar", ensAvatar);
    console.log("ensName", ensName);
  }, [ensAvatar, ensName]);

  return (
    <div>
      {isConnected ? (
        <Button className="bg-gradient-to-br from-pink to-purple/5 rounded-xl h-fit border border-pink/50 shadow-inner hover:from-purple hover:border-purple">
          {ensName ? ensName : ShortAddress(address)}
        </Button>
      ) : (
        <div>
          {connectors.map((connector) => (
            <Button
              className="bg-gradient-to-br from-pink to-purple/5 rounded-xl h-fit border border-pink/50 shadow-inner hover:from-purple hover:border-purple"
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              Connect Wallet
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectButton;
