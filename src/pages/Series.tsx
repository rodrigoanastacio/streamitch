import { Layout } from "@/components/Layout";
import { ContentRow } from "@/components/ContentRow";
import { useEffect, useState } from "react";
import { Channel, parseM3U } from "@/lib/m3u-parser";

const Series = () => {
  const [series, setSeries] = useState<Channel[]>([]);

  useEffect(() => {
    const loadSeries = () => {
      const playlist = localStorage.getItem("currentPlaylist");
      if (playlist) {
        const channels = parseM3U(playlist);
        const seriesChannels = channels.filter(channel => 
          channel.group?.toLowerCase().includes("series") || 
          channel.title.toLowerCase().includes("series")
        );
        setSeries(seriesChannels);
      }
    };

    loadSeries();
  }, []);

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Series</h1>
          <p className="text-muted-foreground">
            Browse through your favorite series
          </p>
        </div>

        <ContentRow title="All Series" items={series} />

        {series.length === 0 && (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">No series available.</p>
            <p className="text-sm text-muted-foreground">
              Upload a playlist or add a URL to start watching.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Series;