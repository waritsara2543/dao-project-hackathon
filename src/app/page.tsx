import CampaignDetail from "@/components/campaginDetail";
import CampaignData from "@/components/campaignData";
import Copyright from "@/components/copyright";
import Myjoined from "./joined/my-joined";

export default function Home() {
  return (
    <main className="min-h-screen overflow-y-scroll p-8 md:p-20">
      <div className="flex flex-col space-y-12 md:space-y-20">
        <div>
          <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
          <CampaignDetail />
        </div>

        <div className="space-y-6">
          <h1 className="flex justify-start font-bold text-transparent text-2xl md:text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
            Comming soon
          </h1>
          <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
          <CampaignData isAll status="coming" />
        </div>

        <div className="space-y-6">
          <h1 className="flex justify-start font-bold text-transparent text-2xl md:text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
            Open
          </h1>
          <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
          <CampaignData isAll status="open" />
          {/* <Myjoined /> */}
        </div>

        <div className="space-y-6">
          <h1 className="flex justify-start font-bold text-transparent text-2xl md:text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
            Close
          </h1>
          <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
          <CampaignData isAll status="closed" />
        </div>

        <div>
          <Copyright />
        </div>
      </div>
    </main>
  );
}
