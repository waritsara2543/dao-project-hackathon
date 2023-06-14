import CampaignCard, { CampaignCardProps } from "@/components/campaignCard";
import { data } from "@/constants/mockup";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-4 gap-10">
        {data.map((item) => (
          <CampaignCard
            key={item.title}
            title={item.title}
            description={item.description}
            image={item.image}
            status={item.status}
          />
        ))}
      </div>
    </main>
  );
}
