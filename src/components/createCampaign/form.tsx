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
import { DatePickerWithRange } from "@/components/createCampaign/dateRange";
import { DatePicker } from "@/components/createCampaign/dateInput";
import { Button } from "@/components/ui/button";
import { useContractWrite } from "wagmi";
import addressList from "@/constants/addressList";
import { MyGovernor__factory } from "@/typechain-types";
import { auth, db } from "@/utils/polybaseClient";
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
  //==========================================================
  const [authState, setAuthState] = React.useState<any>(null);
  const [file, setFile] = React.useState<any>(null);
  const [uploading, setUploading] = React.useState(false);
  const router = useRouter();

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: addressList.getAddress("MyGovernor"),
    abi: MyGovernor__factory.abi,
    functionName: "createCampaign",
    args: [
      description,
      BigInt(amountPrize),
      BigInt(openDate ? (new Date(openDate).getTime() / 1000).toString() : 0),
      BigInt(closeDate ? (new Date(closeDate).getTime() / 1000).toString() : 0),
    ],
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
      alert("Please fill all the fields");
      // toast("Please fill all the fields", {
      //   duration: 6000,
      // });
      return;
    }
    setUploading(true);
    // write();
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
    return router.push(`/my-campaign`);
  };

  async function createRecord(imgCid: string) {
    const newUserId = nanoid();
    console.log("newUserId", newUserId);

    try {
      const createUser = await db
        .collection("Campaign")
        .create([
          newUserId.toString(),
          authState.userId,
          title,
          description,
          category,
          imgCid,
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

  useEffect(() => {
    const startTimestamp = Math.floor(Date.now() / 1000);

    if (openDate) console.log((new Date(openDate).getTime() / 1000).toString());
    console.log("startTimestamp", startTimestamp);
  }, [openDate]);

  useEffect(() => {
    auth?.onAuthUpdate((authState) => {
      if (authState) {
        // User is logged in, show button to dashboard
        setAuthState(authState);
        console.log("authState", authState);
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
          }}>
          <SelectTrigger className="col-span-3">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">Song</SelectItem>
              <SelectItem value="banana">Article</SelectItem>
              <SelectItem value="blueberry">Poet</SelectItem>
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
          }}>
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
          onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        <div className="flex justify-center">
          {uploading ? "Uploading..." : ""}
        </div>
      </div>
    </div>
  );
};

export default Form;
