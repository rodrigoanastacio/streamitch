import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MediaCard } from "./MediaCard";

interface Content {
  title: string;
  thumbnail?: string;
  url: string;
}

interface ContentRowProps {
  title: string;
  items: Content[];
}

export function ContentRow({ title, items }: ContentRowProps) {
  if (!items.length) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div key={index} className="">
            <MediaCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
