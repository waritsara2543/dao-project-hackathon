import Image from "next/image";
import React from "react";
import { CampaignButton } from "./components/CampaignBt";
import Link from "next/link";

const CampaignPage = () => {
  const campaignName = "New_test";
  const wallet = "0x1234567890";
  const status = "vote";

  const renderBt = (status: string) => {
    if (status === "vote") {
      return (
        <Link href={`/campaign/${campaignName}`}>
          <CampaignButton text={status} />
        </Link>
      );
    }
    if (status === "join") {
      return (
        <Link href="/">
          <CampaignButton text={status} />
        </Link>
      );
    }
    if (status === "closed") {
      return null;
    }
  };

  return (
    <main className="min-h-screen p-24 text-white">
      <div className="grid gap-10">
        <div className="text-3xl">Campain: {campaignName}</div>
        <div className="flex bg-gradient-to-br from-[#1B3351]/30 to-[#9B6195]/30 w-full rounded-2xl">
          <div className="grid p-10 justify-center items-center gap-5 w-full max-w-lg text-center">
            <Image
              src="/assets/squirrel.png"
              alt="Picture of the author"
              width={200}
              height={200}
              className="rounded-xl "
            />
            <div>wallet : {wallet}</div>
            {renderBt(status)}
          </div>
          <div className="flex flex-col p-10 gap-5 w-full">
            <div className="">{campaignName}</div>
            <div>
              description : Detail: Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default CampaignPage;
