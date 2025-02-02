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
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 p-1">
          {items.map((item, index) => (
            <div key={index} className="w-[250px]">
              <MediaCard {...item} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
