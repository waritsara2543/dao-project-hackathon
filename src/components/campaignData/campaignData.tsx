"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import CampaignCard from "../campaignCard";
import { useGetCampaign, Campaign } from "@/hooks/useGetCampaign";

const CampaignData = ({
  isAll,
  status,
}: {
  isAll: boolean;
  status?: "coming" | "open" | "closed";
}) => {
  const { allCampaign, myCampaign } = useGetCampaign();
  const [data, setData] = React.useState<Array<Campaign>>([] as any);

  useEffect(() => {
    if (isAll) {
      if (status) {
        setData(allCampaign.filter((item) => item.status === status));
      } else {
        setData(allCampaign);
      }
    } else {
      setData(myCampaign);
    }
  }, [isAll, allCampaign, myCampaign, status]);

  return (
    <div className="flex justify-center sm:flex sm:justify-start overflow-x-auto h-[300px]">
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
              title={item.title || "Untitled"}
              description={item.description || "No description"}
              image={
                //`https://dweb.link/ipfs/${item.imgCid}`
                "/assets/campaign.png"
              }
              status={item.status}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CampaignData;
