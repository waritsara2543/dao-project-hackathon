"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { useAccount, useContractWrite } from "wagmi";
import addressList from "@/constants/addressList";
import { MyGovernor__factory } from "@/typechain-types";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/createCampaign/dateRange";
import { DatePicker } from "@/components/createCampaign/dateInput";
import { addDays, format, set } from "date-fns";
import { DateRange } from "react-day-picker";
import { Web3Storage } from "web3.storage";

// const ipfs = await IPFS.create();

const Form = () => {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("id");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { address } = useAccount();
  const cid = "0x1234567890";
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: addressList.getAddress("MyGovernor"),
    abi: MyGovernor__factory.abi,
    functionName: "submitWork",
    args: [cid, BigInt(campaignId as string), description, address!],
  });
  const [file, setFile] = React.useState<any>(null);
  const [uploading, setUploading] = React.useState(false);
  const [ipfsUrl, setIpfsUrl] = React.useState("");

  const handleFileSelect = (e: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload");
      return;
    }
    setUploading(true);
    const client = new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY as string,
    });
    const cid = await client.put([file]);
    console.log("stored files with cid:", cid);
    const url = `https://dweb.link/ipfs/${cid}`;
    setIpfsUrl(url);
    setUploading(false);
  };

  return (
    <div className="bg-gradient-to-br from-secondary-blue/50 to-secondary-pink/50 grid gap-10 p-10 rounded-lg">
      <div className="grid grid-cols-4 items-center">
        <p>Name :</p>
        <Input
          type="text"
          className="col-span-3"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="grid grid-cols-4 items-center">
        <p>Email :</p>
        <Input
          type="email"
          className="col-span-3"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="grid grid-cols-4 items-center">
        <p>Description :</p>
        <Textarea
          className="col-span-3"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div className="grid grid-cols-4 items-center">
        <p>Contribution :</p>
        <Input
          id="contribution"
          type="file"
          className="col-span-3"
          onChange={(e) => handleFileSelect(e)}
        />
      </div>

      <div className="flex justify-center">
        <Button
          className="bg-gradient-to-r from-purple to-font-pink px-8"
          onClick={() => write()}>
          Submit
        </Button>
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </div>
      <div className="flex justify-center">
        {uploading ? "Uploading..." : ""}
      </div>
      {ipfsUrl && (
        <div className="mt-8">
          <p className="text-gray-700 font-bold">File uploaded to IPFS:</p>
          <a
            href={ipfsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700">
            {ipfsUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default Form;
