"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import CampaignCard from "../campaignCard";
import { useGetCampaign, Campaign } from "@/hooks/useGetCampaign";

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

  return (
    <div className="flex justify-center overflow-x-auto">
      <div className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        {data?.map((item, index) => (
          <Link
            key={index}
            href={{
              pathname: "/campaign",
              query: {
                databaseId: item.databaseId,
                campaignId: item.campaignId,
              },
            }}
          >
            {" "}
            <CampaignCard
              databaseId={item.databaseId}
              campaignId={item.campaignId}
              title={"title"}
              description={"description"}
              image={`https://dweb.link/ipfs/${item.imgCid}`}
              status={item.status}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CampaignData;
