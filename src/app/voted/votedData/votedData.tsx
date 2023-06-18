"use client";
import { useGetProposal } from "@/hooks/useGetProposal";
import React, { useEffect } from "react";
import Link from "next/link";
import ClaimCard from "@/components/claimCard";

const VotedData = () => {
  const { myVoted } = useGetProposal();
  // useEffect(() => {
  //   console.log(myVoted);
  // }, [myVoted]);
  return (
    <div className="grid grid-cols-4 gap-10">
      {myVoted.map(
        (item) =>
          item.status !== "coming" && (
            <div key={item.campaignId}>
              <ClaimCard
                campaignId={item.campaignId}
                databaseId={item.databaseId}
                title={item.title || "Untitled"}
                description={item.description || "No description"}
                image={
                  `https://dweb.link/ipfs/${item.imgCid}/${item.fileName}`
                  //"/assets/campaign.png"
                }
                status={item.status}
                claim="claim"
                page="my-voted"
              />
            </div>
          )
      )}
    </div>
  );
};

export default VotedData;
