"use client";
import { useGetProposal } from "@/hooks/useGetProposal";
import React, { useEffect } from "react";
import Link from "next/link";
import ClaimCard from "@/components/claimCard";

const VotedData = () => {
  const { myVoted } = useGetProposal();
  return (
    <div className="grid grid-cols-4 gap-10">
      {myVoted.map(
        (item) =>
          item.status !== "coming" && (
            // <Link
            //   href={{
            //     pathname: `/campaign`,
            //     query: {
            //       databaseId: item.databaseId,
            //       campaignId: item.campaignId,
            //     },
            //   }}
            //   key={item.campaignId}
            // >
            <div key={item?.campaignId}>
              <ClaimCard
                campaignId={item?.campaignId}
                databaseId={item?.databaseId}
                title={"title"}
                description={"description"}
                image={"/assets/campaign.png"}
                status={item.status}
                claim="claim"
                page="my-voted"
              />
            </div>
            // </Link>
          )
      )}
    </div>
  );
};

export default VotedData;
