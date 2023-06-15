import React from "react";
import JoinerCard from "../components/JoinerCard";

const JoinerCampaign = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  console.log(slug);

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
      <div className="text-white">
        <div>Campaign: {slug}</div>
        <div>List joiner</div>
        {joiner.map((item, index) => (
          <JoinerCard key={index} wallet={item.wallet} name={item.name} />
        ))}
      </div>
    </main>
  );
};

export default JoinerCampaign;
