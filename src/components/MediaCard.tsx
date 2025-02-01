import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MediaCardProps {
  title: string;
  thumbnail?: string;
  url: string;
  group?: string;
}

export function MediaCard({ title, thumbnail, url, group }: MediaCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/player`, {
      state: {
        title,
        url,
        group,
      },
    });
  };

  return (
    <Card
      className="group relative overflow-hidden transition-all hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <img
          src={
            thumbnail ||
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
          }
          alt={title}
          className="aspect-video w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
          <Play className="h-12 w-12 text-white" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-sm font-medium text-white">{title}</h3>
          {group && <p className="text-xs text-white/70 mt-1">{group}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
