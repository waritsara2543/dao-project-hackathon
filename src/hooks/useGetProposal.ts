import addressList from "@/constants/addressList";
import { MyGovernor__factory } from "@/typechain-types";
import { useMemo } from "react";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import { Campaign, useGetCampaign } from "./useGetCampaign";

export const useGetProposal = (campaignId: string) => {
  const { allCampaign } = useGetCampaign();
  const { address } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: addressList.getAddress("MyGovernor"),
    abi: MyGovernor__factory.abi,
    functionName: "getProposalsInCampaign",
    args: [BigInt(campaignId as string)],
  });
  const contractList = useMemo(() => {
    const result: any = [];
    allCampaign.forEach((campaign: any) => {
      result.push({
        address: addressList.getAddress("MyGovernor"),
        abi: MyGovernor__factory.abi,
        functionName: "getProposalsInCampaign",
        args: [BigInt(campaign.campaignId)],
      });
    });
    return result;
  }, [allCampaign]);

  const { data: datas } = useContractReads({
    contracts: contractList,
  });

  const myJoin = useMemo(() => {
    if (!datas) return [];
    const joined: Array<Campaign> = [];
    datas.forEach((data: any) => {
      data.result.forEach((result: any) => {
        allCampaign.forEach((campaign: any) => {
          campaign.proposals.forEach((proposal: any) => {
            if (proposal === result.proposalId) {
              if (address === result.creator)
                if (!joined.includes(campaign)) joined.push(campaign);
            }
          });
        });
      });
    });
    console.log("myJoin", joined);

    return joined;
  }, [datas, address, allCampaign]);

  const proposals = useMemo(() => {
    if (!data) return [];
    const result: any = [];
    data.forEach((proposal: any) => {
      result.push({
        id: Number(proposal.proposalId),
        creator: proposal.creator,
        description: proposal.description,
        voters: proposal.voters,
        score: proposal.voters.length,
      } as any);
    });

    console.log("proposals", result);

    return result;
  }, [data]);

  const sortedProposals = useMemo(() => {
    if (!proposals) return [];
    const result: any = proposals.sort((a: any, b: any) => {
      return b.score - a.score;
    });
    return result;
  }, [proposals]);

  return { proposals, myJoin, sortedProposals };
};