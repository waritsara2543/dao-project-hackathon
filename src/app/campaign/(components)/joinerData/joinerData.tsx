"use client";
import { useGetProposal } from "@/hooks/useGetProposal";
import React from "react";
import JoinerCard from "../JoinerCard";
import { useSearchParams } from "next/navigation";

const JoinerData = () => {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("id");
  const { proposals } = useGetProposal(campaignId as string);

  return (
    <div className="grid gap-10">
      {proposals.map((item: any) => (
        <div key={item.id}>
          <JoinerCard
            wallet={item.creator}
            name={"name"}
            description={item.description}
            id={item.id}
          />
        </div>
      ))}
    </div>
  );
};

export default JoinerData;
