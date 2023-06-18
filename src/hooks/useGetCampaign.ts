import addressList from "@/constants/addressList";
import { MyGovernor__factory } from "@/typechain-types";
import { auth, db } from "@/utils/polybaseClient";
import React from "react";
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
  databaseId: string;
  address?: string;
  title?: string;
  description?: string;
  catorgory?: string;
  imgCid?: string;
  typeFile?: string;
  openDate?: string;
  closeDate?: string;
  amountPrize?: string;
}

export interface CampaignDb {
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
}
export const useGetCampaign = () => {
  const [authState, setAuthState] = React.useState<any>(null);
  const [campaignsDb, setCampaignsDb] = React.useState<Array<CampaignDb>>([]);
  const { address } = useAccount();

  const getAllCampaign = async () => {
    const record = await db.collection("Campaign").get();
    const { data } = record;
    const campaign = data.map((item: any) => item.data);
    setCampaignsDb(campaign);
  };

  const { data, isError, isLoading } = useContractRead({
    address: addressList.getAddress("MyGovernor"),
    abi: MyGovernor__factory.abi,
    functionName: "getAllCampaigns",
  });
  const allCampaign = useMemo(() => {
    const result: Array<Campaign> = [];
    if (data && campaignsDb)
      data.forEach((campaign: any) => {
        result.push({
          campaignId: String(Number(campaign.campaignId)),
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
          databaseId: campaign.databaseId,
        });

        campaignsDb.forEach((campaignDb: any) => {
          result.find((item) => {
            if (item.databaseId === campaignDb.id) {
              item.address = campaignDb.address;
              item.title = campaignDb.title;
              item.description = campaignDb.description;
              item.catorgory = campaignDb.catorgory;
              item.imgCid = campaignDb.imgCid;
              item.typeFile = campaignDb.typeFile;
              item.openDate = campaignDb.openDate;
              item.closeDate = campaignDb.closeDate;
              item.amountPrize = campaignDb.amountPrize;
            }
          });
        });
      });
    return result;
  }, [data, address, campaignsDb]);

  const myCampaign = useMemo(() => {
    return allCampaign.filter((campaign) => campaign.creator === address);
  }, [allCampaign, address]);

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
    getAllCampaign().then(() => console.log("campaigns", campaignsDb));
  }, []);

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
