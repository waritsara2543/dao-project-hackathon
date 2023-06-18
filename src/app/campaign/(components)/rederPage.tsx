"use client";

import { useGetCampaign } from "@/hooks/useGetCampaign";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CampaignButton } from "./CampaignBt";
import LeaderBoard from "./(leaderBoard)";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import JoinerData from "./joinerData";

const RenderPage = () => {
  const { allCampaign } = useGetCampaign();
  const [campaign, setCampaign] = useState<any>();
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaignId");
  const databaseId = searchParams.get("databaseId");
  useEffect(() => {
    setCampaign(
      allCampaign.filter((item) => item.campaignId === campaignId)[0]
    );
  }, [allCampaign, campaignId]);

  const renderBt = () => {
    if (campaign?.status === "open") {
      return (
        <div className="flex justify-center gap-5">
          <Link
            href={{
              pathname: "/join-form",
              query: { databaseId: databaseId, campaignId: campaignId },
            }}
          >
            <CampaignButton text="join" />
          </Link>
        </div>
      );
    }
    if (campaign?.status === "closed" || campaign?.status === "coming") {
      return null;
    }
  };

  if (campaign?.status === "closed") {
    return <LeaderBoard campaignId={campaignId?.toString()} />;
  }
  return (
    <div className="grid gap-10">
      <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
        Campaign: {campaign?.title}
      </h1>
      <div className="grid bg-gradient-to-br from-[#1B3351]/30 to-[#9B6195]/30 w-full rounded-2xl">
        <div className="grid p-10 justify-center items-center gap-5 w-full text-center">
          <div className="flex justify-center">
            {" "}
            <Image
              src={`https://dweb.link/ipfs/${campaign?.imgCid}/${campaign?.fileName}`}
              //"/assets/campaign.png"
              alt="Picture of the author"
              width={300}
              height={300}
              className="rounded-xl "
            />
          </div>

          <div>wallet : {campaign?.creator}</div>
          {renderBt()}
        </div>
        <div className="flex flex-col p-10 gap-5 w-full">
          <div className="text-2xl font-bold">
            {campaign?.title || "United"}
          </div>
          <div>Description : {campaign?.description || "No description"}</div>
          <div className="flex gap-5 items-center">
            <p>Amount prize : {campaign?.rewardAmount}</p>
            <Image
              src={"/assets/apecoin.png"}
              width={50}
              height={50}
              alt="apecoin"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-10 pt-5">
        <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
          Participants
        </h1>
        <JoinerData />
      </div>
    </div>
  );
};

export default RenderPage;
