import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Channel, parseM3U } from "@/lib/m3u-parser";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Play, Tv } from "lucide-react";

const PlayerPage = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadPlaylist = () => {
      const playlist = localStorage.getItem("currentPlaylist");
      const playlistUrl = localStorage.getItem("playlistUrl");

      if (playlist) {
        const parsedChannels = parseM3U(playlist);
        setChannels(parsedChannels);
        if (parsedChannels.length > 0) {
          setCurrentChannel(parsedChannels[0]);
        }
      } else if (playlistUrl) {
        fetch(playlistUrl)
          .then(response => response.text())
          .then(content => {
            const parsedChannels = parseM3U(content);
            setChannels(parsedChannels);
            if (parsedChannels.length > 0) {
              setCurrentChannel(parsedChannels[0]);
            }
          })
          .catch(() => {
            toast({
              title: "Error",
              description: "Failed to load playlist from URL",
              variant: "destructive",
            });
          });
      }
    };

    loadPlaylist();
  }, [toast]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Player</h1>
          <div className="flex items-center gap-2">
            <Tv className="w-5 h-5" />
            <span className="text-sm text-muted-foreground">
              {channels.length} channels
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr,300px] gap-6">
          <div className="space-y-4">
            {currentChannel ? (
              <>
                <VideoPlayer
                  src={currentChannel.url}
                  title={currentChannel.title}
                />
                <h2 className="text-xl font-semibold">{currentChannel.title}</h2>
              </>
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">
                  Select a channel to start watching
                </p>
              </div>
            )}
          </div>

          <div className="border rounded-lg">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Channels</h3>
            </div>
            <ScrollArea className="h-[600px]">
              <div className="p-4 space-y-2">
                {channels.map((channel, index) => (
                  <Button
                    key={index}
                    variant={currentChannel?.url === channel.url ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setCurrentChannel(channel)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {channel.title}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlayerPage;