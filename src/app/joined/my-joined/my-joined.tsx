"use client";
import React from "react";
import Link from "next/link";
import ClaimCard from "@/components/claimCard";
import { useGetProposal } from "@/hooks/useGetProposal";
import { useAccount } from "wagmi";

const Myjoined = () => {
  const { myJoin } = useGetProposal();

  return (
    <div className="grid grid-cols-4 gap-10">
      {myJoin.map(
        (item) =>
          item.status !== "coming" && (
            // <Link
            //   href={{ pathname: `/campaign`, query: { id: item.campaignId } }}
            //   key={item.campaignId}
            // >
            <div key={item.campaignId}>
              <ClaimCard
                campaignId={item.campaignId}
                databaseId={item.databaseId}
                title={item.title || "Untitled"}
                description={item.description || "No description"}
                image={
                  //`https://dweb.link/ipfs/${item.imgCid}`
                  `https://dweb.link/ipfs/${item.imgCid}/${item.fileName}`
                  //"/assets/campaign.png"
                }
                status={item.status}
                claim="claim"
                page="my-joined"
              />
            </div>
            // </Link>
          )
      )}
    </div>
  );
};

export default Myjoined;
