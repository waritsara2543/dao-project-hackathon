import React from "react";
import Image from "next/image";
import { ShortAddress } from "@/utils/common";
import Voted from "./voted";

interface JoinerCardProps {
  wallet: `0x${string}`;
  name: string;
  description: string;
  id: string;
}

const JoinerCard = ({ wallet, name, description, id }: JoinerCardProps) => {
  return (
    <div className="flex bg-gradient-to-br from-[#1B3351]/30 to-[#9B6195]/30 w-full rounded-2xl">
      <div className="grid p-10 justify-center items-center gap-5 w-full max-w-lg text-center">
        <Image
          src="/assets/squirrel.png"
          alt="Picture of the author"
          width={200}
          height={200}
          className="rounded-xl"
        />
        <div>wallet : {ShortAddress(wallet)}</div>
        <Voted id={id} />
      </div>
      <div className="flex flex-col p-10 gap-5 w-full">
        <div className="">{name}</div>
        <div>description:{description}</div>
      </div>
    </div>
  );
};

export default JoinerCard;
