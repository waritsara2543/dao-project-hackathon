"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import CampaignCard from "../campaignCard";
import { Campaign, useGetCampaign } from "@/hooks/useGetCampaign";

const CampaignData = ({ isAll }: { isAll: boolean }) => {
  const { allCampaign, myCampaign } = useGetCampaign();
  const [data, setData] = React.useState<Array<Campaign>>([] as any);

  useEffect(() => {
    if (isAll) {
      setData(allCampaign);
    } else {
      setData(myCampaign);
    }
  }, [isAll, allCampaign, myCampaign]);

  console.log("data", data);

  return (
    <div className="grid grid-cols-4 gap-10">
      {data?.map((item, index) => (
        <Link
          key={index}
          href={{
            pathname: "/campaign",
            query: { id: Number(item.campaignId) },
          }}>
          <CampaignCard
            id={String(Number(item.campaignId))}
            title={"title"}
            description={"description"}
            image={"/assets/campaign.png"}
            status={item.status}
          />
        </Link>
      ))}
    </div>
  );
};

export default CampaignData;
