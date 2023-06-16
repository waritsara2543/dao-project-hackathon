"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
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
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useContractWrite } from "wagmi";
import addressList from "@/constants/addressList";
import { parseEther } from "viem";
import { MyGovernor__factory } from "@/typechain-types";

const Form = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [submitFileType, setSubmitFileType] = React.useState("");
  const [submitDateRange, setSubmitDateRange] = React.useState<
    DateRange | undefined
  >({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const [closeDate, setCloseDate] = React.useState<Date>();
  const [amountPrize, setAmountPrize] = React.useState("");

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: addressList.getAddress("MyGovernor"),
    abi: MyGovernor__factory.abi,
    functionName: "createCampaign",
    args: [
      "test",
      parseEther("1000"),
      parseEther("1638352800"),
      parseEther("1638871200"),
    ],
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
        <p>Submitting date :</p>
        <div className="col-span-3">
          <DatePickerWithRange
            date={submitDateRange}
            setDate={setSubmitDateRange}
          />
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
          onClick={() => write()}
        >
          Submit
        </Button>
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </div>
    </div>
  );
};

export default Form;
