import dynamic from "next/dynamic";

const JoinerData = dynamic(() => import("./joinerData"), { ssr: false });

export default JoinerData;
