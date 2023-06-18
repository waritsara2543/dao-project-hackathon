"use client";
import React, { useEffect } from "react";
import { useAccount, useContractWrite } from "wagmi";
import addressList from "@/constants/addressList";
import { MyGovernor__factory } from "@/typechain-types";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useGetProposal } from "@/hooks/useGetProposal";

const Voted = ({ id }: { id: string }) => {
  //TODO: get new campaign id
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaignId");
  const { address } = useAccount();
  const { myVoted } = useGetProposal(campaignId as any);
  const [isVoted, setIsVoted] = React.useState(false);
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: addressList.getAddress("MyGovernor"),
    abi: MyGovernor__factory.abi,
    functionName: "vote",
    args: [BigInt(id), address!, BigInt(campaignId as string)],
    onSuccess: (data) => {
      toast.success(`Successfully voted`, {
        duration: 10000,
      });
    },
    onError: (error) => {
      toast.error(`Error!`, {
        duration: 10000,
      });
    },
  });
  useEffect(() => {
    myVoted.map((item) => {
      if (item.campaignId == campaignId) {
        setIsVoted(true);
      }
    });
  }, [campaignId, myVoted]);
  return (
    <div>
      <Button
        className="w-full py-1 px-10 h-10 bg-[#2F80ED] rounded-full capitalize disabled:bg-gray disabled:cursor-not-allowed"
        onClick={() => {
          write();
        }}
        disabled={isVoted}
      >
        {isLoading ? "Loading..." : "Vote"}
      </Button>
    </div>
  );
};

export default Voted;
