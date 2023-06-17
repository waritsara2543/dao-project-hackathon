import addressList from "@/constants/addressList";
import { MyGovernor__factory } from "@/typechain-types";
import React, { useEffect, useMemo } from "react";
import { parseEther } from "viem";
import { useAccount, useContractRead } from "wagmi";
import { db, auth } from "@/utils/polybaseClient";

export interface Campaign {
  id: string;
  address: string;
  title: string;
  description: string;
  catorgory: string;
  imgCid: string;
  typeFile: string;
  openDate: string;
  closeDate: string;
  amountPrize: string;
  status: "coming" | "open" | "closed";
}
export const useGetCampaignDB = () => {
  const [authState, setAuthState] = React.useState<any>(null);
  const [campaigns, setCampaigns] = React.useState<any>(null);
  const { address } = useAccount();

  const getAllCampaign = async () => {
    const record = await db.collection("Campaign").get();
    const { data } = record;
    const campaign = data.map((item: any) => item.data);
    setCampaigns(campaign);
  };

  useEffect(() => {
    auth?.onAuthUpdate((authState) => {
      if (authState) {
        // User is logged in, show button to dashboard
        setAuthState(authState);
        console.log("authState", authState);
        db.signer(async (data: string) => {
          console.log("data", data);

          return {
            h: "eth-personal-sign",
            sig: await auth!.ethPersonalSign(data),
          };
        });
      } else {
        // User is NOT logged in, show login button
      }
    });
    getAllCampaign().then(() => console.log("campaigns", campaigns));
  }, []);

  const allCampaign = useMemo(() => {
    const result: Array<Campaign> = [];
    campaigns?.forEach((campaign: any) => {
      result.push({
        id: campaign.id,
        address: campaign.address,
        title: campaign.title,
        description: campaign.description,
        catorgory: campaign.catorgory,
        imgCid: campaign.imgCid,
        typeFile: campaign.typeFile,
        openDate: campaign.openDate,
        closeDate: campaign.closeDate,
        amountPrize: campaign.amountPrize,
        status: checkStatus(
          Number(campaign.openDate),
          Number(campaign.closeDate)
        ),
      });
    });
    return result;
  }, [campaigns]);

  const myCampaign = useMemo(() => {
    return allCampaign.filter((campaign) => campaign.address === address);
  }, [allCampaign, address]);

  return { allCampaign, myCampaign };
};

function checkStatus(start: number, end: number) {
  const now = new Date().getTime() / 1000;
  if (now < start) return "coming";
  if (now > end) return "closed";
  return "open";
}
