"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { useAccount, useContractWrite } from "wagmi";
import addressList from "@/constants/addressList";
import { MyGovernor__factory } from "@/typechain-types";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

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
        <Input id="contribution" type="file" className="col-span-3" />
      </div>

      <div className="flex justify-center">
        <Button
          className="bg-gradient-to-r from-purple to-font-pink px-8"
          onClick={() => write()}
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default Form;
