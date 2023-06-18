import CampaignDetail from '@/components/campaginDetail'
import CampaignData from '@/components/campaignData'

export default function Home() {
  return (
    <main className="min-h-screen overflow-y-scroll  justify-between p-20">
      <div className="flex flex-col  space-y-20 ">
        <div>
          <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
          <CampaignDetail />
        </div>

        {/* // CampaignDetail */}
        <div className=" space-y-6">
          <h1 className="flex justify-start font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
            Voting
          </h1>
          <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
          <CampaignData isAll />
        </div>

        {/* // CampaignDetail */}
        <div className=" space-y-6">
          <h1 className="flex justify-start font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
            Ready to join
          </h1>
          <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
          <CampaignData isAll />
        </div>

        {/* // CampaignDetail */}
        <div className=" space-y-6">
          <h1 className="flex justify-start font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
            Close
          </h1>
          <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
          <CampaignData isAll />
        </div>

      </div>
    </main>
  )
}
