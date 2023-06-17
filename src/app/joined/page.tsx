import ClaimCard from "@/components/claimCard";
import { data } from "@/constants/mockup";
import React from "react";
import Link from "next/link";
import Myjoined from "./my-joined";

const JoinedPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <div className="w-full grid gap-10">
        <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
          My Joined
        </h1>

        <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
        <Myjoined />
      </div>
    </main>
  );
};

export default JoinedPage;
