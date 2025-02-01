import { Layout } from "@/components/Layout";
import { ContentRow } from "@/components/ContentRow";
import { useEffect, useState } from "react";
import { Channel, parseM3U } from "@/lib/m3u-parser";

const Index = () => {
  const [categories, setCategories] = useState<{ [key: string]: Channel[] }>({});

  useEffect(() => {
    const loadContent = () => {
      const playlist = localStorage.getItem("currentPlaylist");
      if (playlist) {
        const channels = parseM3U(playlist);
        const categorizedContent = channels.reduce((acc: { [key: string]: Channel[] }, channel) => {
          const category = channel.group || "Uncategorized";
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(channel);
          return acc;
        }, {});
        setCategories(categorizedContent);
      }
    };

    loadContent();
  }, []);

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Featured Content</h1>
          <p className="text-muted-foreground">
            Browse through your favorite movies, series, and TV channels
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(categories).map(([category, items]) => (
            <ContentRow key={category} title={category} items={items} />
          ))}
        </div>

        {Object.keys(categories).length === 0 && (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">No content available.</p>
            <p className="text-sm text-muted-foreground">
              Upload a playlist or add a URL to start watching.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;