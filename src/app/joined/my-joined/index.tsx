import dynamic from "next/dynamic";

const Myjoined = dynamic(() => import("./my-joined"), { ssr: false });

export default Myjoined;
