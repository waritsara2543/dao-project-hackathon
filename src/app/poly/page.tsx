"use client";
import { db, auth } from "@/utils/polybaseClient";
import React, { useEffect } from "react";
import { ShortAddress } from "@/utils/common";

type IdbRecord = {
  id: string;
  name: string;
};

const Page = () => {
  const [authState, setAuthState] = React.useState<any>(null);
  const [name, setName] = React.useState<string>("");
  const [user, setUser] = React.useState<any>(null);
  const [dbRecords, setDbRecords] = React.useState<IdbRecord[]>([]);

  async function getUsers() {
    const record = await db.collection("User").get();
    const { data } = record;
    const users = data.map((item: any) => item.data);
    console.log("users", users);
    setUser(users);
  }

  async function createRecord() {
    const newUserId = user.length + 1;
    const createUser = await db
      .collection("User")
      .create([`${newUserId}`, name]);
    console.log("createRecord", createUser);
  }

  async function getOneRecord() {
    const colletionReference = db.collection("User");
    const record = await colletionReference.record("0x123").get();
    const { data } = record;
    console.log("one_record", data);
  }

  async function getRecordId() {
    const collectionReference = db.collection("User");
    const record = await collectionReference.where("id", "==", "0x123").get();
    console.log("recordById", record);
  }

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
    getUsers();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center  p-24">
      <div className="flex flex-col">
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <button
          className="text-white border-2 p-2 rounded-lg"
          onClick={() => createRecord()}>
          Create Record
        </button>
        <button
          className="text-white border-2 p-2 rounded-lg"
          onClick={() => getUsers()}>
          getUsers
        </button>
      </div>
      <div className="bg-white w-full mt-20">
        {dbRecords.map((item: IdbRecord, index) => (
          <div key={index} className="flex justify-between">
            {/* <td>{ShortAddress(item.id)}</td> */}
            <td>{item.name}</td>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
