import CampaignCard from "@/components/campaignCard";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import CampaignData from "@/components/campaignData";

const MyCampaignPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-8  sm:p-16 md:p-24 text-white">
      <div className="w-full grid gap-6 sm:gap-8 md:gap-10 ">
        <div className="flex flex-col items-center  space-y-6  justify-between sm:flex-row">
          <h1 className="font-bold text-transparent text-2xl sm:text-3xl md:text-4xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
            My Campaign
          </h1>
          <Link href="/create-campaign">
            <Button className="bg-gradient-to-r from-pink to-purple hover:from-font-pink">
              <PlusCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mr-2" />
              Create Campaign
            </Button>
          </Link>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
        <CampaignData isAll={false} />
      </div>
    </div>
  );
};

export default MyCampaignPage;
