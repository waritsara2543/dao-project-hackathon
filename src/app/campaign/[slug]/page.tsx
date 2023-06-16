import Image from "next/image";
import React from "react";
import { CampaignButton } from "../(components)/CampaignBt";
import Link from "next/link";
import { data } from "@/constants/mockup";
import LeaderBoard from "./(leaderBoard)";

const CampaignPage = ({ params }: { params: { slug: string } }) => {
  // const wallet = "0x1234567890";
  // const { slug: campaignId } = params;
  // const campaign = data.filter((item) => item.id === campaignId)[0];

  // const renderBt = () => {
  //   if (campaign?.status === "open") {
  //     return (
  //       <div className="flex justify-center gap-5">
  //         <Link href="/join-form">
  //           <CampaignButton text="join" />
  //         </Link>
  //         <Link href={`/campaign/${campaignId}/proposals`}>
  //           <CampaignButton text="vote" />
  //         </Link>
  //       </div>
  //     );
  //   }
  //   if (campaign?.status === "closed" || campaign?.status === "comming") {
  //     return null;
  //   }
  // };

  // if (campaign?.status === "closed") {
  //   return <LeaderBoard campaignId={campaignId} />;
  // }
  return (
    <main className="min-h-screen p-24 text-white">
      {/* <div className="grid gap-10">
        <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
          Campaign: {campaign?.title}
        </h1>
        <div className="grid bg-gradient-to-br from-[#1B3351]/30 to-[#9B6195]/30 w-full rounded-2xl">
          <div className="grid p-10 justify-center items-center gap-5 w-full text-center">
            <Image
              src="/assets/squirrel.png"
              alt="Picture of the author"
              width={300}
              height={300}
              className="rounded-xl "
            />
            <div>wallet : {wallet}</div>
            {renderBt()}
          </div>
          <div className="flex flex-col p-10 gap-5 w-full">
            <div className="">{campaign.title}</div>
            <div>description : {campaign.description}</div>
          </div>
        </div>
      </div> */}
    </main>
  );
};
export default CampaignPage;
