import dynamic from "next/dynamic";

const CampaignCard = dynamic(() => import("./campaignCard"), { ssr: false });

export default CampaignCard;
