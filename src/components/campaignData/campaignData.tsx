"use client";
import Link from "next/link";
import React from "react";
import CampaignCard from "../campaignCard";
import { useContractRead } from "wagmi";
import addressList from "@/constants/addressList";
import { MyGovernor__factory } from "@/typechain-types";

const CampaignData = () => {
  const { data, isError, isLoading } = useContractRead({
    address: addressList.getAddress("MyGovernor"),
    abi: MyGovernor__factory.abi,
    functionName: "getAllCampaigns",
  });

  return (
    <div>
      {data?.map((item, index) => (
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
