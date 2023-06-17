"use client";
import { useGetProposal } from "@/hooks/useGetProposal";
import React from "react";
import JoinerCard from "./JoinerCard";
import { useSearchParams } from "next/navigation";

const JoinerData = () => {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("id");
  const { proposals } = useGetProposal(campaignId as string);

  return (
    <div>
      {proposals.map((item: any, index) => (
        <div key={index}>
          <JoinerCard
            wallet={item.creator}
            name={"name"}
            description={item.description}
          />
        </div>
      ))}
    </div>
  );
};

export default JoinerData;
