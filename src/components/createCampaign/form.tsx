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
import toast from "react-hot-toast";
import { on } from "events";

const Form = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [submitFileType, setSubmitFileType] = React.useState("");
  const [closeDate, setCloseDate] = React.useState<Date>();
  const [openDate, setOpenDate] = React.useState<Date>();
  const [amountPrize, setAmountPrize] = React.useState("");
  const { address } = useAccount();
  const databaseId = "1";

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
              <SelectItem value="apple">Song</SelectItem>
              <SelectItem value="banana">Article</SelectItem>
              <SelectItem value="blueberry">Poet</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center">
        <p>Image :</p>
        <Input id="picture" type="file" className="col-span-3" />
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
              <SelectItem value="apple">PDF</SelectItem>
              <SelectItem value="banana">PNG</SelectItem>
              <SelectItem value="blueberry">TXT</SelectItem>
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
          onClick={() => {
            Number(allowance) !== 0 ? write() : approve();
          }}
        >
          {isLoading || approveLoading
            ? "Loading... "
            : Number(allowance) !== 0
            ? "Submit"
            : "Approve"}
        </Button>
      </div>
    </div>
  );
};

export default Form;
