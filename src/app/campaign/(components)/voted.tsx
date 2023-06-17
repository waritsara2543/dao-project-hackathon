"use client";
import React, { useEffect } from "react";
import { useAccount, useContractWrite } from "wagmi";
import addressList from "@/constants/addressList";
import { MyGovernor__factory } from "@/typechain-types";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const Voted = ({ id }: { id: string }) => {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("id");
  const { address } = useAccount();
  const { data, isLoading, isSuccess, write, error } = useContractWrite({
    address: addressList.getAddress("MyGovernor"),
    abi: MyGovernor__factory.abi,
    functionName: "vote",
    args: [BigInt(id), address!, BigInt(campaignId as string)],
  });
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <Button
        className="w-full py-1 px-10 h-10 bg-[#2F80ED] rounded-full capitalize"
        onClick={() => {
          write();
        }}
      >
        vote
      </Button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
};

export default Voted;
