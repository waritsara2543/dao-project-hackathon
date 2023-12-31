import Image from "next/image";
import { CampaignButton } from "./button";
import {
  StarIcon,
  RocketLaunchIcon,
  FlagIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

export interface CampaignCardProps {
  databaseId: string;
  campaignId: string;
  title: string;
  description: string;
  image: string;
  status: "open" | "closed" | "coming";
}

const CampaignCard = ({
  databaseId,
  campaignId,
  title,
  description,
  image,
  status,
}: CampaignCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderStatus = () => {
    if (status === "open") {
      return (
        <div className="absolute right-2 -top-4 rounded-full h-10 w-10 bg-gradient-to-r from-pink to-light-blue to-50% flex items-center">
          <RocketLaunchIcon className="h-6 w-6 text-white mx-auto" />
        </div>
      );
    }
    if (status === "closed") {
      return (
        <div className="absolute right-2 -top-4 rounded-full h-10 w-10 bg-gradient-to-r from-pink to-black to-50% flex items-center">
          <FlagIcon className="h-6 w-6 text-white mx-auto" />
        </div>
      );
    }
    if (status === "coming") {
      return (
        <div className="absolute right-2 -top-4 rounded-full h-10 w-10 bg-gradient-to-r from-pink to-purple to-50% flex items-center">
          <MegaphoneIcon className="h-6 w-6 text-white mx-auto" />
        </div>
      );
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`relative transiton duration-300 ease-in-out ${
        isHovered ? "scale-105" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={image}
        width={250}
        height={250}
        alt="campaign"
        className="rounded-t-xl"
      />
      <div className="h-48 rounded-xl bg-opacity-10 text-white px-6 py-2 absolute top-24 sm:top-24 left-0 z-10 bg-gradient-to-b from-blue/25 from-10% via-blue/44 via-30%  to-blue to-90% backdrop-blur-sm w-[250px] grid gap-2 border border-white/30">
        {renderStatus()}

        <p className="text-lg font-semibold">{title}</p>

        <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
        <p className="text-xs h-20 overflow-ellipsis overflow-hidden">
          {description}
        </p>
        {status === "open" && (
          <div className="w-full flex gap-4">
            <Link
              href={{
                pathname: "/join-form",
                query: { databaseId: databaseId, campaignId: campaignId },
              }}
              className="w-full"
            >
              <CampaignButton text="join" />
            </Link>
            {/* <Link
              href={{ pathname: `/proposals`, query: { id: id } }}
              className="w-full"
            >
              <CampaignButton text="join" />
            </Link>*/}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignCard;
