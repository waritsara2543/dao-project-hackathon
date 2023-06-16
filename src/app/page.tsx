import CampaignCard from "@/components/campaignCard";
import { data } from "@/constants/mockup";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-4 gap-10">
        {data.map((item) => (
          <Link
            key={item.id}
            href={{
              pathname: "/campaign",
              query: { id: item.id },
            }}
          >
            <CampaignCard
              id={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              status={item.status}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
