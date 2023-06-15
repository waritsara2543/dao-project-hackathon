import ClaimCard from "@/components/claimCard";
import { data } from "@/constants/mockup";
import React from "react";
import Link from "next/link";

const JoinedPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <div className="w-full grid gap-10">
        <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
          My Joined
        </h1>

        <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
        <div className="grid grid-cols-4 gap-10">
          {data.map(
            (item) =>
              item.status !== "comming" && (
                <Link href={`/campaign/${item.id}`} key={item.id}>
                  <ClaimCard
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    status={item.status}
                    claim="claim"
                  />
                </Link>
              )
          )}
        </div>
      </div>
    </main>
  );
};

export default JoinedPage;
