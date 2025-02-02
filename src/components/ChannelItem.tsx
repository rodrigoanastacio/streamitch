import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";

interface ChannelItemProps {
  title: string;
  thumbnail?: string;
  url: string;
}

export function ChannelItem({ title, thumbnail, url }: ChannelItemProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentUrl = searchParams.get("url");

  const handleClick = () => {
    navigate(
      `/player?url=${encodeURIComponent(url)}&title=${encodeURIComponent(
        title
      )}`
    );
  };

  return (
    <Button
      variant={currentUrl === url ? "secondary" : "ghost"}
      className="flex w-full items-center justify-start gap-2 rounded-md p-2 text-left transition-colors hover:bg-accent hover:text-accent-foreground"
      onClick={handleClick}
    >
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="h-6 w-6 rounded-sm object-contain"
        />
      )}
      <span className="truncate">{title}</span>
      <Play className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100" />
    </Button>
  );
}
