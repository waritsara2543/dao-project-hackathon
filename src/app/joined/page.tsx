import ClaimCard from "@/components/claimCard";
import React from "react";
import Link from "next/link";
import Myjoined from "./my-joined";

const JoinedPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-8 sm:p-16 md:p-24 text-white">
      <div className="w-full grid gap-6 sm:gap-8 md:gap-10 text-center sm:text-left">
        <h1 className="font-bold text-transparent text-2xl sm:text-3xl md:text-4xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
          My Joined
        </h1>
        <div className="w-full h-1 bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
        <Myjoined />
      </div>
    </div>
  );
};

export default JoinedPage;
