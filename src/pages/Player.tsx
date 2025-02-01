import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Channel, parseM3U } from "@/lib/m3u-parser";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Play, Tv, Search, Link2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryMap {
  [key: string]: Channel[];
}

const PlayerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [categories, setCategories] = useState<CategoryMap>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Handle direct navigation with state
    if (location.state?.url) {
      setCurrentChannel({
        title: location.state.title,
        url: location.state.url,
        group: location.state.group,
      });
    }

    const loadPlaylist = () => {
      const playlist = localStorage.getItem("currentPlaylist");
      if (playlist) {
        const parsedChannels = parseM3U(playlist);
        setChannels(parsedChannels);
        if (!location.state?.url && parsedChannels.length > 0) {
          setCurrentChannel(parsedChannels[0]);
        }
        organizeCategories(parsedChannels);
      }
    };

    loadPlaylist();
  }, [location.state]);

  const organizeCategories = (channels: Channel[]) => {
    const categoryMap: CategoryMap = { "All Channels": channels };

    channels.forEach((channel) => {
      if (channel.group) {
        if (!categoryMap[channel.group]) {
          categoryMap[channel.group] = [];
        }
        categoryMap[channel.group].push(channel);
      }
    });

    setCategories(categoryMap);
  };

  const copyChannelLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied",
      description: "Channel link copied to clipboard",
    });
  };

  const filteredChannels =
    selectedCategory === "all" ? channels : categories[selectedCategory] || [];

  const searchedChannels = searchQuery
    ? filteredChannels.filter((channel) =>
        channel.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredChannels;

  if (!currentChannel && !channels.length) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <p className="text-muted-foreground">No content available</p>
          <Button variant="outline" onClick={() => navigate("/upload")}>
            Upload Playlist
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
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
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {currentChannel.title}
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyChannelLink(currentChannel.url)}
                  >
                    <Link2 className="w-4 h-4" />
                  </Button>
                </div>
                {currentChannel.group && (
                  <span className="text-sm text-muted-foreground">
                    Category: {currentChannel.group}
                  </span>
                )}
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
            <div className="p-4 border-b space-y-4">
              <h3 className="font-semibold">Channels</h3>
              <div className="space-y-2">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Channels</SelectItem>
                    {Object.keys(categories)
                      .filter((cat) => cat !== "All Channels")
                      .map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search channels..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
            <ScrollArea className="h-[600px]">
              <div className="p-4 space-y-2">
                {searchedChannels.map((channel, index) => (
                  <Button
                    key={index}
                    variant={
                      currentChannel?.url === channel.url
                        ? "secondary"
                        : "ghost"
                    }
                    className="w-full justify-start group"
                    onClick={() => setCurrentChannel(channel)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    <span className="truncate">{channel.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyChannelLink(channel.url);
                      }}
                    >
                      <Link2 className="w-3 h-3" />
                    </Button>
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
