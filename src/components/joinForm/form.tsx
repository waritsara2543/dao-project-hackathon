"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { ChangeEvent } from "react";
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
import { Button } from "@/components/ui/button";
import { addDays, format, set } from "date-fns";
import { DateRange } from "react-day-picker";
import { Web3Storage } from "web3.storage";

// const ipfs = await IPFS.create();

const Form = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [file, setFile] = React.useState<any>(null);
  const [uploading, setUploading] = React.useState(false);
  const [ipfsUrl, setIpfsUrl] = React.useState("");

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
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
        <p>Contribution :</p>
        <Input
          id="contribution"
          type="file"
          className="col-span-3"
          onChange={(e) => handleFileSelect(e)}
        />
      </div>

      <div className="flex justify-center" onClick={(e) => handleSubmit(e)}>
        <Button className="bg-gradient-to-r from-purple to-font-pink px-8">
          Submit
        </Button>
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
