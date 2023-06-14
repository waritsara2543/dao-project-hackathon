import { Button } from "@/components/ui/button";

interface CampaignButtonProps {
  text: string;
}
export function CampaignButton({ text }: CampaignButtonProps) {
  return (
    <Button className="py-1 h-10 bg-[#2F80ED] rounded-full capitalize">
      {text}
    </Button>
  );
}
