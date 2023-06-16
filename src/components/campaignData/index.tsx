import dynamic from "next/dynamic";

const CampaignData = dynamic(() => import("./campaignData"), { ssr: false });

export default CampaignData;
