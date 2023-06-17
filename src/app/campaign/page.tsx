import React from "react";
import RenderPage from "./(components)/rederPage";
import JoinerData from "./(components)/joinerData";

const CampaignPage = () => {
  return (
    <main className="min-h-screen p-24 text-white">
      <RenderPage />
      <div className="grid gap-10 pt-5">
        <h1 className="font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
          Participants
        </h1>
        <JoinerData />
      </div>
    </main>
  );
};
export default CampaignPage;
