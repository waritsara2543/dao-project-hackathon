import CampaignDetail from '@/components/campaginDetail'
import CampaignData from '@/components/campaignData'

export default function Home() {
  return (
    <main className="flex min-h-screen space-y-5 overflow-y-scroll flex-col justify-between p-24">
            <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
      <CampaignDetail />
      <h1 className="flex justify-start font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-tr from-font-pink via-font-blue to-pink">
        Voting
      </h1>
      <div className="w-full h-[1px] bg-gradient-to-r from-purple/0 from-5% via-pink via-40% to-purple/0 to-90% drop-shadow-md"></div>
      <CampaignData isAll />
    </main>
  )
}
