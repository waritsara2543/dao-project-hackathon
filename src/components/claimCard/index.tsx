"use client";
import Image from "next/image";
import { CampaignButton } from "../campaignCard/button";
import {
  StarIcon,
  RocketLaunchIcon,
  FlagIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import addressList from "@/constants/addressList";
import { MyGovernor__factory } from "@/typechain-types";
import { useAccount, useContractWrite } from "wagmi";
import { useGetProposal } from "@/hooks/useGetProposal";
import toast from "react-hot-toast";
import { useEffect } from "react";
import React from "react";

export interface ClaimCardProps {
  databaseId: string;
  campaignId: string;
  title: string;
  description: string;
  image: string;
  status: "open" | "closed";
  claim: "claim" | "claimed" | "none";
  page: "my-joined" | "my-voted";
}
const ClaimCard = ({
  databaseId,
  campaignId,
  title,
  description,
  image,
  status,
  claim,
  page,
}: ClaimCardProps) => {
  const { sortedProposals } = useGetProposal(campaignId);
  const { address } = useAccount();
  const [proposalId, setProposalId] = React.useState<string>("");
  const [creator, setCreator] = React.useState<string>("");
  const [voters, setVoters] = React.useState<string[]>([]);
  const [winnerData, setWinnerData] = React.useState<any>({});

  useEffect(() => {
    if (sortedProposals.length > 0) {
      setProposalId(sortedProposals[0].id.toString());
      setCreator(sortedProposals[0].creator);
      setVoters(sortedProposals[0].voters);
      setWinnerData({
        id: sortedProposals[0].id,
        creator: sortedProposals[0].creator,
        voters: sortedProposals[0].voters,
        cid: "QmZ2Q9Z",
      });
    }
  }, [sortedProposals]);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: addressList.getAddress("MyGovernor"),
    abi: MyGovernor__factory.abi,
    functionName: "claimRewards",
    args: [BigInt(campaignId), address as `0x${string}`, BigInt(proposalId)],
    onSuccess: (data) => {
      toast.success(`Successfully created`, {
        duration: 10000,
      });
    },
    onError: (error) => {
      toast.error(`Error!`, {
        duration: 10000,
      });
    },
  });

  const renderStatus = () => {
    if (status === "open") {
      return (
        <div className="absolute right-2 -top-4 rounded-full h-10 w-10 bg-gradient-to-r from-pink to-light-blue to-50% flex items-center">
          <RocketLaunchIcon className="h-6 w-6 text-white mx-auto" />
        </div>
      );
    }
    if (status === "closed") {
      return (
        <div className="absolute right-2 -top-4 rounded-full h-10 w-10 bg-gradient-to-r from-pink to-black to-50% flex items-center">
          <FlagIcon className="h-6 w-6 text-white mx-auto" />
        </div>
      );
    }
  };

  return (
    <div className="relative">
      <Image
        src={image}
        width={250}
        height={250}
        alt="campaign"
        className="rounded-t-xl"
      />
      <div className="rounded-xl bg-opacity-10 text-white px-6 py-2 absolute top-32 left-0 z-10 bg-gradient-to-b from-blue/25 from-10% via-blue/44 via-30%  to-blue to-90% backdrop-blur-sm w-[250px] grid gap-2 border border-white/30">
        {renderStatus()}

        <p className="text-lg font-semibold">{title}</p>
        <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
        <p className="text-xs h-20 overflow-ellipsis overflow-hidden">
          {description}
        </p>
        {status === "closed" &&
        claim === "claim" &&
        ((page === "my-joined" && address === creator) ||
          (page === "my-voted" && voters.includes(address as string))) ? (
          <div className="flex gap-2">
            <CampaignButton
              text="claim"
              onclick={() => {
                write();
              }}
            />
          </div>
        ) : claim === "claimed" ? (
          <CampaignButton text="claimed" />
        ) : (
          <div className="h-7"></div>
        )}
        {}
      </div>
    </div>
  );
};

export default ClaimCard;
