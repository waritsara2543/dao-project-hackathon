import dynamic from "next/dynamic";

const CampaignDetail = dynamic(() => import("./campaignDetail"), { ssr: false });

export default CampaignDetail;
