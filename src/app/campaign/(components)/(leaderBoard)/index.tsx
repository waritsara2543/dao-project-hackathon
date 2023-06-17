import { join } from "path";
import React from "react";
import Image from "next/image";
import ContentCard from "@/components/contentCard/ContentCard";
import { CampaignButton } from "../CampaignBt";
import { data } from "@/constants/mockup";
import DataTable from "./dataTable";

const LeaderBoard = ({ campaignId }: { campaignId: string | undefined }) => {
  const campaign = data.filter((item) => item.id === campaignId)[0];

  const RewardBt = <CampaignButton text="Get Reward" />;

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
        Campaign: {campaign.title}
      </h1>
      <div className="mt-16 flex flex-col bg-gradient-to-br from-[#1B3351]/30 to-[#9B6195]/30 w-full rounded-2xl">
        {/* <div className="flex justify-between h-20 px-10 items-center bg-gradient-to-br from-[#1B3351] to-[#9B6195] rounded-xl">
          <div className="flex gap-4 items-center">
            <Image
              src="/assets/squirrel.png"
              alt="Picture of the author"
              width={50}
              height={50}
              className="rounded-xl "
            />
            <div className="flex-col">
              <div className="">Eiei</div>
              <div className="text-[10px]">#1003</div>
            </div>
          </div>
          <div className="">Here</div>
        </div> */}
        <DataTable />
      </div>
      {/* <div className="mt-20">
          <div className="text-3xl"> Content</div>
          <ContentCard
            wallet={joiner[0].wallet}
            campaignName={campaign.title}
            button={RewardBt}
          />
        </div> */}
    </div>
  );
};

export default LeaderBoard;
