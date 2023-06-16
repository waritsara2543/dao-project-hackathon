import React from "react";
import JoinerCard from "../(components)/JoinerCard";
import { data } from "@/constants/mockup";

const JoinerCampaign = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const campaignId = searchParams.id;
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
  }));

  return (
    <main className="min-h-screen p-24 text-white">
      <div className="text-white grid gap-5">
        <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
          Campaign: {campaign.title}
        </h1>
        <div className="grid gap-5">
          {joiner.map((item, index) => (
            <JoinerCard key={index} wallet={item.wallet} name={item.name} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default JoinerCampaign;
