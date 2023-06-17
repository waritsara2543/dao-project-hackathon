import { Button } from "@/components/ui/button";

interface CampaignButtonProps {
  text: string;
  onclick?: () => void;
}
export function CampaignButton({ text, onclick }: CampaignButtonProps) {
  return (
    <Button
      className="py-1 w-full h-fit bg-gradient-to-b from-blue/0 from-5%  via-blue via-30% to-blue/22 to-90% rounded-full capitalize"
      onClick={onclick}>
      {text}
    </Button>
  );
}
