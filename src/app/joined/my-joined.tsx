"use client";
import React from "react";
import Link from "next/link";
import ClaimCard from "@/components/claimCard";
import { useGetProposal } from "@/hooks/useGetProposal";

const Myjoined = () => {
  const { myJoin } = useGetProposal("1");
  return (
    <div className="grid grid-cols-4 gap-10">
      {myJoin.map(
        (item) =>
          item.status !== "coming" && (
            <Link
              href={{ pathname: `/campaign`, query: { id: item.campaignId } }}
              key={item.campaignId}
            >
              <ClaimCard
                id={item.campaignId.toString()}
                title={"title"}
                description={"description"}
                image={"/assets/campaign.png"}
                status={item.status}
                claim="claim"
              />
            </Link>
          )
      )}
    </div>
  );
};

export default Myjoined;
