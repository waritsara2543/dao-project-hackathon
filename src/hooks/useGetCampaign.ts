import addressList from "@/constants/addressList";
import { MyGovernor__factory } from "@/typechain-types";
import { useEffect, useMemo } from "react";
import { parseEther } from "viem";
import { useAccount, useContractRead } from "wagmi";
export interface Campaign {
  campaignId: string;
  creator: string;
  endBlock: string;
  startBlock: string;
  rewardAmount: number;
  isOwner: boolean;
  status: "coming" | "open" | "closed";
  proposals: Array<number>;
}
export const useGetCampaign = () => {
  const { data, isError, isLoading } = useContractRead({
    address: addressList.getAddress("MyGovernor"),
    abi: MyGovernor__factory.abi,
    functionName: "getAllCampaigns",
  });
  const { address } = useAccount();
  const allCampaign = useMemo(() => {
    const result: Array<Campaign> = [];
    if (data)
      data.forEach((campaign: any) => {
        result.push({
          campaignId: campaign.campaignId,
          creator: campaign.creator,
          endBlock: dateformatter(Number(campaign.endBlock)),
          startBlock: dateformatter(Number(campaign.startBlock)),
          rewardAmount: Number(campaign.rewardAmount),
          isOwner: campaign.creator === address,
          status: checkStatus(
            Number(campaign.startBlock),
            Number(campaign.endBlock)
          ),
          proposals: campaign.proposalId,
        });
      });
    return result;
  }, [data, address]);

  const myCampaign = useMemo(() => {
    return allCampaign.filter((campaign) => campaign.creator === address);
  }, [allCampaign, address]);

  return { allCampaign, myCampaign };
};

const dateformatter = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}/${month}/${day} ${hour}:${minute}`;
};

function checkStatus(start: number, end: number) {
  const now = new Date().getTime() / 1000;
  if (now < start) return "coming";
  if (now > end) return "closed";
  return "open";
}
