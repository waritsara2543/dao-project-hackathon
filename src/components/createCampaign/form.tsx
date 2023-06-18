"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/createCampaign/dateInput";
import { Button } from "@/components/ui/button";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import addressList from "@/constants/addressList";
import { MyGovernor__factory, MyToken__factory } from "@/typechain-types";
import { parseEther } from "viem";
import { auth, db, signIn } from "@/utils/polybaseClient";
import { nanoid } from "nanoid/non-secure";
import toast, { Toaster } from "react-hot-toast";
import { Web3Storage } from "web3.storage";
import { useRouter } from "next/navigation";

const Form = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [submitFileType, setSubmitFileType] = React.useState("");
  const [closeDate, setCloseDate] = React.useState<Date>();
  const [openDate, setOpenDate] = React.useState<Date>();
  const [amountPrize, setAmountPrize] = React.useState("");
  const { address } = useAccount();
  const [databaseId, setDatabaseId] = React.useState(nanoid());
  //==========================================================
  const [authState, setAuthState] = React.useState<any>(null);
  const [file, setFile] = React.useState<any>(null);
  const [uploading, setUploading] = React.useState(false);
  const router = useRouter();

  const { write, isLoading } = useContractWrite({
    address: addressList.getAddress("MyGovernor"),
    abi: MyGovernor__factory.abi,
    functionName: "createCampaign",
    args: [
      databaseId,
      description,
      parseEther(amountPrize as any),
      BigInt(openDate ? (new Date(openDate).getTime() / 1000).toString() : 0),
      BigInt(closeDate ? (new Date(closeDate).getTime() / 1000).toString() : 0),
    ],
    onSuccess: (data) => {
      toast.success(`Successfully created`, {
        duration: 10000,
      });
    },
    onError: (error) => {
      toast.error(`Error! ${error}`, {
        duration: 10000,
      });
    },
  });

  const handleFileSelect = (e: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (
      !file ||
      !title ||
      !description ||
      !category ||
      !submitFileType ||
      !closeDate ||
      !openDate ||
      !amountPrize
    ) {
      toast.error("Please fill all the fields", {
        duration: 10000,
      });
      return;
    }
    // if (!authState) {
    //   signIn();
    //   checkAuth();
    // }
    setUploading(true);
    if (Number(allowance) !== 0) {
      const client = new Web3Storage({
        token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY as string,
      });
      const imgCid = await client.put([file]);
      // connect db and record Proposal
      const create = await createRecord(imgCid);
      if (!create.res) {
        alert("Error creating record");
        setUploading(false);
        return;
      }
      setUploading(false);
      write();
      return router.push(`/my-campaign`);
    } else {
      approve();
    }
  };

  async function createRecord(imgCid: string) {
    console.log(databaseId);

    try {
      const createUser = await db
        .collection("Campaign")
        .create([
          databaseId,
          authState.userId,
          title,
          description,
          category,
          imgCid,
          file.name,
          submitFileType,
          (new Date(openDate!).getTime() / 1000).toString(),
          (new Date(closeDate!).getTime() / 1000).toString(),
          amountPrize.toString(),
        ]);
      console.log("createRecord", createUser);
      return { res: true };
    } catch (err) {
      console.log("err", err);
      return { res: false };
    }
  }

  const { write: approve, isLoading: approveLoading } = useContractWrite({
    address: addressList.getAddress("RewardToken"),
    abi: MyToken__factory.abi,
    functionName: "approve",
    args: [addressList.getAddress("MyGovernor"), BigInt(amountPrize)],
    onSuccess: (data) => {
      toast.success(`Successfully approve!`, {
        duration: 10000,
      });
    },
    onError: (error) => {
      toast.error(`Error! ${error}`, {
        duration: 10000,
      });
    },
  });

  const { data: allowance } = useContractRead({
    address: addressList.getAddress("RewardToken"),
    abi: MyToken__factory.abi,
    functionName: "allowance",
    enabled: !!address,
    args: [address as any, addressList.getAddress("MyGovernor")],
  });

  const checkAuth = () => {
    auth?.onAuthUpdate((listener) => {
      if (listener) {
        console.log("authState", listener);
        // User is logged in, show button to dashboard
        setAuthState(listener);
        db.signer(async (data: string) => {
          console.log("data", data);

          return {
            h: "eth-personal-sign",
            sig: await auth!.ethPersonalSign(data),
          };
        });
      } else {
        // User is NOT logged in, show login button
      }
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="bg-gradient-to-br from-secondary-blue/50 to-secondary-pink/50 grid gap-10 p-10 rounded-lg">
      <div className="grid grid-cols-4 items-center">
        <p>Title :</p>
        <Input
          type="text"
          className="col-span-3"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
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
        <p>Category :</p>
        <Select
          value={category}
          onValueChange={(value) => {
            setCategory(value);
          }}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="song">Song</SelectItem>
              <SelectItem value="article">Article</SelectItem>
              <SelectItem value="poet">Poet</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center">
        <p>Image :</p>
        <Input
          id="picture"
          type="file"
          className="col-span-3"
          onChange={(e) => handleFileSelect(e)}
        />
      </div>
      <div className="grid grid-cols-4 items-center">
        <p>Type of submitting file :</p>
        <Select
          value={submitFileType}
          onValueChange={(value) => {
            setSubmitFileType(value);
          }}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="PDF">PDF</SelectItem>
              <SelectItem value="PNG">PNG</SelectItem>
              <SelectItem value="TXT">TXT</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center">
        <p>Open date :</p>
        <div className="col-span-3">
          <DatePicker date={openDate} setDate={setOpenDate} />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center">
        <p>Close campaign :</p>
        <div className="col-span-3">
          <DatePicker date={closeDate} setDate={setCloseDate} />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center">
        <p>Amount prize :</p>
        <div className="col-span-3">
          <Input
            type="number"
            placeholder="0"
            className="col-span-3"
            value={amountPrize}
            onChange={(e) => {
              setAmountPrize(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          className="bg-gradient-to-r from-purple to-font-pink px-8"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          {isLoading || approveLoading
            ? "Loading... "
            : Number(allowance) !== 0
            ? "Submit"
            : "Approve"}
        </Button>
        <button
          onClick={() => {
            createRecord("eieieie");
          }}
        >
          record
        </button>
      </div>
    </div>
  );
};

export default Form;
