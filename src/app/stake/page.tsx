import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const StakePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <div className="w-full grid gap-10">
        <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
          Stake coin
        </h1>
        <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
        <div className="bg-gradient-to-br from-secondary-blue/50 to-secondary-pink/50 grid gap-10 p-10 rounded-lg">
          <div className="relative">
            <div className="bg-purple rounded-lg w-fit p-8 grid gap-2 -rotate-90">
              <p className="font-extrabold text-8xl opacity-25">STAKING</p>
              <p className="font-extrabold text-8xl opacity-50">STAKING</p>
              <p className="font-extrabold text-8xl opacity-75">STAKING</p>
              <p className="font-extrabold text-8xl">STAKING</p>
            </div>
            <div className="absolute right-40 top-10 backdrop-blur-md bg-white/20 grid gap-10 p-10 rounded-2xl max-w-2xl">
              <h1 className="font-bold text-5xl">STAKING</h1>
              <p className="text-xl">
                You need to stake coins before joining the campaign. You will
                receive your coins back after the campaign ends.
              </p>
              <div className="flex justify-center">
                <Button className="bg-gradient-to-r from-purple to-font-pink px-8 w-fit">
                  Stake 1 Apecoin
                </Button>
              </div>
            </div>
            <Image
              src="/assets/coin.png"
              width={300}
              height={300}
              alt="coin"
              className="absolute z-10 bottom-0 left-40"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default StakePage;
