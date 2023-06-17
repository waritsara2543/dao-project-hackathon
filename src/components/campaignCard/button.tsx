import { Button } from "@/components/ui/button";

interface CampaignButtonProps {
  text: string;
}
export function CampaignButton({ text }: CampaignButtonProps) {
  return (
    <Button className="w-full rounded-2xl bg-gradient-to-r from-pink to-purple hover:from-font-pink  capitalize">
      {text}
    </Button>
  );
}
