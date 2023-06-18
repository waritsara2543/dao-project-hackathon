import React, { useEffect, useMemo } from "react";
import { useGetAuth } from "./useGetAuth";
import { db, signIn } from "@/utils/polybaseClient";

export function useGetProposalDb(campaignId: string) {
  const { authPoly } = useGetAuth();
  const [data, setData] = React.useState<any>(null);

  async function getRecordId() {
    const proposals: Array<any> = [];
    const collectionReference = db.collection("Joiner");
    const record = await collectionReference
      .where("campaignId", "==", campaignId)
      .get();
    record.data.forEach((item: any) => {
      proposals.push(item.data);
    });
    setData(proposals);
    return proposals;
  }

  useEffect(() => {
    if (authPoly === null) {
      signIn();
      return;
    } else {
      getRecordId();
    }
  }, [authPoly]);

  const proposalsList = useMemo(() => {
    if (!data) return [];
    return data;
  }, [data]);

  return { proposalsList };
}
