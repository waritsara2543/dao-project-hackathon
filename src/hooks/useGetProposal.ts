import addressList from "@/constants/addressList";
import { MyGovernor__factory } from "@/typechain-types";
import { useMemo } from "react";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import { Campaign, useGetCampaign } from "./useGetCampaign";

interface Proposal {
  id: number;
  creator: string;
  description: string;
  voters: any;
  score: number;
}
export const useGetProposal = (campaignId?: string) => {
  const { allCampaign } = useGetCampaign();
  const { address } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: addressList.getAddress("MyGovernor"),
    abi: MyGovernor__factory.abi,
    functionName: "getProposalsInCampaign",
    enabled: !!campaignId,
    args: [BigInt(campaignId || 0)],
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
        //result:[{proposalId:0,creator:0x,description:0x,voters:[0x,0x]}]
        allCampaign.forEach((campaign: any) => {
          // campaign:{campaignId:0,proposals:[0,1,2,3]}
          campaign.proposals.forEach((proposal: any) => {
            if (proposal === result.proposalId) {
              if (address === result.creator)
                if (!joined.includes(campaign)) joined.push(campaign);
            }
          });
        });
      });
    });
    return joined;
  }, [datas, address, allCampaign]);

  const proposals = useMemo(() => {
    if (!data) return [];
    const result: Array<Proposal> = [];
    data.forEach((proposal) => {
      result.push({
        id: Number(proposal.proposalId),
        creator: proposal.creator,
        description: proposal.description,
        voters: proposal.voters,
        score: proposal.voters.length,
      });
    });
    return result;
  }, [data]);

  const sortedProposals = useMemo(() => {
    if (!proposals) return [];
    const result: Array<Proposal> = proposals.sort((a: any, b: any) => {
      return b.score - a.score;
    });
    return result;
  }, [proposals]);

  const myVoted = useMemo(() => {
    if (!datas) return [];
    const voted: Array<Campaign> = [];
    datas.forEach((data: any) => {
      data.result.forEach((result: any) => {
        allCampaign.forEach((campaign: any) => {
          campaign.proposals.forEach((proposal: any) => {
            if (proposal === result.proposalId) {
              if (result.voters.includes(address))
                if (!voted.includes(campaign)) voted.push(campaign);
            }
          });
        });
      });
    });
    return voted;
  }, [address, datas, allCampaign]);

  return { proposals, myJoin, sortedProposals, myVoted };
};
