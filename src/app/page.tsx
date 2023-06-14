import CampaignCard, { CampaignCardProps } from "@/components/campaignCard";

export default function Home() {
  const data: Array<CampaignCardProps> = [
    {
      title: "Using Discord",
      description:
        "Prompt writing involves crafting clear and engaging prompts, while using images to create a visual representation of the idea or concept. Prompt writing     involves crafting clear and engaging prompts, while using images to create a visual representation of the idea or concept.",
      image: "/assets/campaign.png",
      status: "vote",
    },
    {
      title: "Using Discord",
      description:
        "Prompt writing involves crafting clear and engaging prompts, while using images to create a visual representation of the idea or concept.",
      image: "/assets/campaign.png",
      status: "join",
    },
    {
      title: "Using Discord",
      description:
        "Prompt writing involves crafting clear and engaging prompts, while using images to create a visual representation of the idea or concept.",
      image: "/assets/campaign.png",
      status: "closed",
    },
    {
      title: "Using Discord",
      description:
        "Prompt writing involves crafting clear and engaging prompts, while using images to create a visual representation of the idea or concept.",
      image: "/assets/campaign.png",
      status: "comming",
    },
  ];
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
