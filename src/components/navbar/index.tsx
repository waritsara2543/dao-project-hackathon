import { navLink } from "@/constants/navLink";
import React from "react";
import Link from "next/link";
import ConnectButton from "./connectButton";

const Navbar = () => {
  return (
    <div className="flex justify-between text-white py-5 px-24">
      <div>
        <h1>Logo</h1>
      </div>
      <div className="flex gap-10 justify-end items-center">
        {navLink.map((item) => (
          <Link key={item.name} href={item.path}>
            <button>{item.name}</button>
          </Link>
        ))}
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
