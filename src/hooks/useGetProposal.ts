import addressList from "@/constants/addressList";
import { MyGovernor__factory } from "@/typechain-types";
import { useMemo } from "react";
import { useContractRead } from "wagmi";

export const useGetProposal = (campaignId: string) => {
  const { data, isError, isLoading } = useContractRead({
    address: addressList.getAddress("MyGovernor"),
    abi: MyGovernor__factory.abi,
    functionName: "getProposalsInCampaign",
    args: [BigInt(campaignId)],
  });

  const proposals = useMemo(() => {
    if (!data) return [];
    console.log(data);

    return data;
  }, [data]);

  return { proposals };
};
