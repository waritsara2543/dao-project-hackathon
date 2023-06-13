import Image from "next/image";
import { CampaignButton } from "./button";

const CampaignCard = () => {
  return (
    <div className="relative">
      <Image
        src="/assets/campaign.png"
        width={250}
        height={250}
        alt="campaign"
        className="rounded-t-xl"
      />
      <div className="rounded-xl bg-opacity-10 text-white px-6 py-2 absolute top-32 left-0 z-10 bg-gradient-to-b from-blue/25 from-10% via-blue/44 via-30%  to-blue to-90% backdrop-blur-sm w-[250px] grid gap-2 border border-white/30">
        <div className="absolute right-2 -top-4 rounded-full h-10 w-10 bg-gradient-to-r from-pink to-light-pink to-50%"></div>
        <p className="text-lg font-semibold">Using Discord</p>
        <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
        <p className="text-xs">
          Prompt writing involves crafting clear and engaging prompts, while
          using images to create a visual representation of the idea or concept.
        </p>
        <CampaignButton text="Join" />
      </div>
    </div>
  );
};

export default CampaignCard;
