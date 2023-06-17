"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetProposal } from "@/hooks/useGetProposal";
import { useSearchParams } from "next/navigation";

import React from "react";

const DataTable = () => {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("id");
  const { sortedProposals } = useGetProposal(campaignId as string);

  return (
    <Table className="rounded-t-2xl">
      <TableHeader className="h-20 px-10 items-center bg-gradient-to-br from-[#1B3351] to-[#9B6195] rounded-t-2xl">
        <TableRow className="text-white">
          <TableHead className="w-[100px] text-white">Number</TableHead>
          <TableHead className="text-white">Wallet</TableHead>
          <TableHead className="text-white">Contribution</TableHead>
          <TableHead className="text-right text-white">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedProposals.map((item: any, index: number) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{item.creator}</TableCell>
            <TableCell>file</TableCell>
            <TableCell className="text-right">{item.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default DataTable;
