import { Layout } from "@/components/Layout";
import { ContentRow } from "@/components/ContentRow";
import { useEffect, useState } from "react";
import { Channel, parseM3U } from "@/lib/m3u-parser";

const TvChannels = () => {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const loadChannels = () => {
      const playlist = localStorage.getItem("currentPlaylist");
      if (playlist) {
        const allChannels = parseM3U(playlist);
        const tvChannels = allChannels.filter(channel => 
          channel.group?.toLowerCase().includes("tv") || 
          !channel.group?.toLowerCase().includes("movie") && 
          !channel.group?.toLowerCase().includes("series")
        );
        setChannels(tvChannels);
      }
    };

    loadChannels();
  }, []);

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">TV Channels</h1>
          <p className="text-muted-foreground">
            Browse through live TV channels
          </p>
        </div>

        <ContentRow title="All Channels" items={channels} />

        {channels.length === 0 && (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">No channels available.</p>
            <p className="text-sm text-muted-foreground">
              Upload a playlist or add a URL to start watching.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TvChannels;