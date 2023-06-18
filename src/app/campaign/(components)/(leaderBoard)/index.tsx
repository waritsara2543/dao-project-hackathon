"use cient";
import React from "react";
import DataTable from "./dataTable";
import { useGetCampaign } from "@/hooks/useGetCampaign";

const LeaderBoard = ({ campaignId }: { campaignId: string | undefined }) => {
  const { allCampaign } = useGetCampaign();
  const campaign = allCampaign.filter(
    (item) => item.campaignId === campaignId
  )[0];
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
        Campaign: {campaign.campaignId}
      </h1>
      <div className="mt-16 flex flex-col bg-gradient-to-br from-[#1B3351]/30 to-[#9B6195]/30 w-full rounded-2xl">
        <DataTable />
      </div>
    </div>
  );
};

export default LeaderBoard;
