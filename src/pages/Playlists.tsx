import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FileVideo, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState<{ type: string; content: string }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const currentPlaylist = localStorage.getItem("currentPlaylist");
    const playlistUrl = localStorage.getItem("playlistUrl");
    
    const loadedPlaylists = [];
    if (currentPlaylist) {
      loadedPlaylists.push({ type: "file", content: currentPlaylist });
    }
    if (playlistUrl) {
      loadedPlaylists.push({ type: "url", content: playlistUrl });
    }
    
    setPlaylists(loadedPlaylists);
  }, []);

  const handleDelete = (index: number) => {
    const playlist = playlists[index];
    if (playlist.type === "file") {
      localStorage.removeItem("currentPlaylist");
    } else {
      localStorage.removeItem("playlistUrl");
    }
    
    const newPlaylists = playlists.filter((_, i) => i !== index);
    setPlaylists(newPlaylists);
    
    toast({
      title: "Playlist Removed",
      description: "The playlist has been removed successfully",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Your Playlists</h1>
          <p className="text-muted-foreground">
            Manage your uploaded and saved playlists.
          </p>
        </div>

        {playlists.length === 0 ? (
          <div className="text-center py-12">
            <FileVideo className="w-12 h-12 mx-auto text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold">No Playlists Found</h2>
            <p className="text-muted-foreground mt-2">
              Upload a playlist file or add a URL to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {playlists.map((playlist, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border bg-card"
              >
                <div className="flex items-center gap-4">
                  <FileVideo className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-medium">
                      {playlist.type === "file" ? "Uploaded Playlist" : "Playlist URL"}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate max-w-[500px]">
                      {playlist.content}
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PlaylistsPage;