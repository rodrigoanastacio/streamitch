import { MediaCard } from "./MediaCard";
import { ChannelItem } from "./ChannelItem";

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
      {title === "Series" || title === "SÉRIES" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div key={index} className="">
              <MediaCard {...item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div key={index} className="">
              <ChannelItem {...item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
