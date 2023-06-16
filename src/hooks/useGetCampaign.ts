import addressList from "@/constants/addressList";
import { MyGovernor__factory } from "@/typechain-types";
import { useMemo } from "react";
import { useContractRead } from "wagmi";

export const useGetCampaign = () => {
  const { data, isError, isLoading } = useContractRead({
    address: addressList.getAddress("MyGovernor"),
    abi: MyGovernor__factory.abi,
    functionName: "getAllCampaigns",
  });

  const allCampaign = useMemo(() => {
    const result = [];
    if (data)
      for (let i = 0; i < data.length; i++) {
        result.push({
          campaignId: Number(data[i].campaignId),
          creator: data[i].creator,
          endBlock: parseFloat(data[i].endBlock.toString()),
          startBlock: data[i].startBlock,
          rewardAmount: data[i].rewardAmount,
        });
      }
    console.log(result);

    return result;
  }, [data]);

  return { allCampaign };
};
