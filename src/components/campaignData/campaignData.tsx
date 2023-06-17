"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import CampaignCard from "../campaignCard";
import { useGetCampaignDB, Campaign } from "@/hooks/useGetCampaignDB";
import { log } from "console";

const CampaignData = ({ isAll }: { isAll: boolean }) => {
  const { allCampaign, myCampaign } = useGetCampaignDB();
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
            query: { id: item.id },
          }}>
          <CampaignCard
            id={item.id}
            title={"title"}
            description={"description"}
            image={`https://dweb.link/ipfs/${item.imgCid}`}
            status={item.status}
          />
        </Link>
      ))}
    </div>
  );
};

export default CampaignData;
