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

const Form = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

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
        <Input id="contribution" type="file" className="col-span-3" />
      </div>

      <div className="flex justify-center">
        <Button className="bg-gradient-to-r from-purple to-font-pink px-8">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Form;
