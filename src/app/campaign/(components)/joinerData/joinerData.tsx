"use client";
import { useGetProposal } from "@/hooks/useGetProposal";
import React from "react";
import JoinerCard from "../JoinerCard";
import { useSearchParams } from "next/navigation";
import { useGetProposalDb } from "@/hooks/useGetProposalDb";

const JoinerData = () => {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaignId");
  const { proposals } = useGetProposal(campaignId as string);
  // const { proposalsList } = useGetProposalDb(campaignId as string);
  return (
    <div className="grid gap-10">
      {proposals.map((item: any) => (
        <div key={item.id}>
          <JoinerCard
            wallet={item.creator}
            name={"Waritsara"}
            description={item.description}
            id={item.id}
          />
        </div>
      ))}
    </div>
  );
};

export default JoinerData;
