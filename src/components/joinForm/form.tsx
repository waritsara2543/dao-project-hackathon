"use client";
import { Input } from "@/components/ui/input";
import React, { use, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { useAccount, useContractWrite } from "wagmi";
import addressList from "@/constants/addressList";
import { MyGovernor__factory } from "@/typechain-types";
import { useRouter, useSearchParams } from "next/navigation";
import { Web3Storage } from "web3.storage";
import { auth, db, signIn } from "@/utils/polybaseClient";
import { nanoid } from "nanoid/non-secure";
import toast, { Toaster } from "react-hot-toast";
import { useGetAuth } from "@/hooks/useGetAuth";
import lighthouse from "@lighthouse-web3/sdk";

// const ipfs = await IPFS.create();

const Form = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const campaignId = searchParams.get("campaignId");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { address } = useAccount();
  const { authPoly } = useGetAuth();
  const cid = "0x1234567890";
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: addressList.getAddress("MyGovernor"),
    abi: MyGovernor__factory.abi,
    functionName: "submitWork",
    args: [cid, BigInt(campaignId as string), description, address!],
    onSuccess: (data) => {
      toast.success(`Successfully created`, {
        duration: 10000,
      });
    },
    onError: (error) => {
      toast.error(`Error!`, {
        duration: 10000,
      });
    },
  });
  const [file, setFile] = React.useState<any>(null);
  const [flielist, setFilelist] = React.useState<any>(null);

  const [uploading, setUploading] = React.useState(false);

  const handleFileSelect = (e: any) => {
    const files = e.target.files;
    setFilelist(files);
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!file || !name || !email || !description) {
      toast("Please fill all the fields", {
        duration: 6000,
      });
      return;
    }

    if (authPoly === null) {
      signIn();
      return;
    }
    setUploading(true);
    write();
    const client = new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY as string,
    });
    const cid = await client.put([file]);
    // connect db and record Proposal

    const lighthouse = await uploadFile(flielist);
    const create = await createRecord(cid, lighthouse);
    if (!create.res) {
      alert("Error creating record");
      setUploading(false);
      return;
    }
    setUploading(false);
    return router.push(`/joined`);
  };

  async function createRecord(cid: string, lighthouse: string) {
    const newUserId = nanoid();
    try {
      const createUser = await db
        .collection("Joiner")
        .create([
          newUserId.toString(),
          address as string,
          name,
          email,
          description,
          cid,
          lighthouse,
          campaignId as string,
        ]);
      return { res: true };
    } catch (err) {
      console.log("err", err);
      return { res: false };
    }
  }

  // upload ligthhouse
  const progressCallback = (progressData: any) => {
    const progress = (progressData?.total / progressData?.uploaded).toFixed(2);
    const percentageDone = 100 - Number(progress);
  };

  const uploadFile = async (file: any) => {
    const output = await lighthouse.upload(
      file,
      "b78bffc9.e92e3077bf5b4a3b8ae2170b2a95a485",
      progressCallback
    );
    return `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`;
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
          onChange={(e) => {
            handleFileSelect(e);
          }}
        />
      </div>

      <div className="flex justify-center">
        <Button
          className="bg-gradient-to-r from-purple to-font-pink px-8"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </div>
      <div className="flex justify-center">
        {uploading ? "Uploading..." : ""}
      </div>
    </div>
  );
};

export default Form;
