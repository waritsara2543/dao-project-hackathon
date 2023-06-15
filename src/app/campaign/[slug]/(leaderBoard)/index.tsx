import { join } from "path";
import React from "react";
import Image from "next/image";
import ContentCard from "@/components/contentCard/ContentCard";
import { CampaignButton } from "../../(components)/CampaignBt";
import { data } from "@/constants/mockup";

const LeaderBoard = ({ campaignId }: { campaignId: string }) => {
  const campaign = data.filter((item) => item.id === campaignId)[0];
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Henry",
    "Isabella",
    "Jack",
  ];

  const joiner = Array.from({ length: 10 }, () => ({
    wallet: "0x" + Math.floor(Math.random() * 1000) + 1,
    name: names[Math.floor(Math.random() * names.length)],
    county: "county",
    content: "content",
    vote: Math.floor(Math.random() * 100) + 1,
  }));

  const RewardBt = <CampaignButton text="Get Reward" />;

  return (
    <main className="min-h-screen p-24 text-white">
      <div className="flex flex-col">
        <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
          Campaign: {campaign.title}
        </h1>
        <div className="mt-16 flex flex-col bg-gradient-to-br from-[#1B3351]/30 to-[#9B6195]/30 w-full rounded-2xl">
          <div className="flex justify-between h-20 px-10 items-center bg-gradient-to-br from-[#1B3351] to-[#9B6195] rounded-xl">
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
          </div>

          {joiner.map((item, index) => (
            <div
              key={index}
              className="grid grid-flow-col justify-around items-center w-full h-16"
            >
              <div>{index + 1}</div>
              <Image
                src="/assets/squirrel.png"
                alt="Picture of the author"
                width={50}
                height={50}
                className="rounded-xl "
              />
              <div>{item.name}</div>
              <div>{item.wallet}</div>
              <div>{item.content}</div>
              <div>{item.county}</div>
              <div>{item.vote}</div>
            </div>
          ))}
        </div>
        <div className="mt-20">
          <div className="text-3xl"> Content</div>
          <ContentCard
            wallet={joiner[0].wallet}
            campaignName={campaign.title}
            button={RewardBt}
          />
        </div>
      </div>
    </main>
  );
};

export default LeaderBoard;
