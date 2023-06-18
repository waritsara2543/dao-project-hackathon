import { navLink } from '@/constants/navLink'
import React from 'react'
import Link from 'next/link'
import ConnectButton from './connectButton'

const Navbar = () => {
  return (
    <div className="flex flex-col  md:flex-row justify-between text-white py-5 px-4 md:px-24">
      <div className="flex flex-row items-center">
        <div className="bg-[url('/assets/logo.png')] w-[27px] h-[28px]"></div>
        <div className="font-bold text-2xl ml-2">NewOp.</div>
      </div>
      <div className="flex gap-10 justify-end items-center ">
        <div className="  space-x-6 hidden  md:block">
          {navLink.map((item) => (
            <Link key={item.name} href={item.path}>
              <button className="text-sm md:text-md">{item.name}</button>
            </Link>
          ))}
        </div>
        <ConnectButton />
      </div>
    </div>
  )
}

export default Navbar
