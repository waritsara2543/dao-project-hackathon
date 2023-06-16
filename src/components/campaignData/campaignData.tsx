"use client";
import Link from "next/link";
import React from "react";
import CampaignCard from "../campaignCard";
import { useGetCampaign } from "@/hooks/useGetCampaign";

const CampaignData = () => {
  const { allCampaign } = useGetCampaign();

  return (
    <div>
      {allCampaign?.map((item, index) => (
        <Link
          key={index}
          href={{
            pathname: "/campaign",
            query: { id: Number(item.campaignId) },
          }}
        >
          <CampaignCard
            id={String(Number(item.campaignId))}
            title={"title"}
            description={"description"}
            image={"/assets/campaign.png"}
            status={"open"}
          />
        </Link>
      ))}
    </div>
  );
};

export default CampaignData;
