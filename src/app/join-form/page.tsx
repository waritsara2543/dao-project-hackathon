import Form from "@/components/joinForm/form";
import React from "react";
const JoinFormPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <div className="w-full grid gap-10">
        <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
          Join Campaign
        </h1>
        <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
        <Form />
      </div>
    </main>
  );
};

export default JoinFormPage;
