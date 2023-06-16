import CampaignCard from "@/components/campaignCard";
import { Button } from "@/components/ui/button";
import { data } from "@/constants/mockup";
import { PlusCircleIcon } from "lucide-react";
import React from "react";
import Link from "next/link";

const MyCampaignPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <div className="w-full grid gap-10">
        <div className="flex justify-between w-full">
          <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
            My Campaign
          </h1>
          <Link href="/create-campaign">
            <Button className="bg-gradient-to-r from-pink to-purple hover:from-font-pink">
              <PlusCircleIcon className="w-6 h-6 mr-2" />
              Create Campaign
            </Button>
          </Link>
        </div>
        <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
        <div className="grid grid-cols-4 gap-10">
          {data.map((item) => (
            <Link
              href={{ pathname: `/campaign`, query: { id: item.id } }}
              key={item.id}
            >
              <CampaignCard
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                status={item.status}
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};
export default MyCampaignPage;
