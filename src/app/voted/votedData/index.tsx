import dynamic from "next/dynamic";

const VotedData = dynamic(() => import("./votedData"), { ssr: false });

export default VotedData;
