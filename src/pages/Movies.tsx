import { Layout } from "@/components/Layout";
import { ContentRow } from "@/components/ContentRow";
import { useEffect, useState } from "react";
import { Channel, parseM3U } from "@/lib/m3u-parser";

const Movies = () => {
  const [movies, setMovies] = useState<Channel[]>([]);

  useEffect(() => {
    const loadMovies = () => {
      const playlist = localStorage.getItem("currentPlaylist");
      if (playlist) {
        const channels = parseM3U(playlist);
        const movieChannels = channels.filter(channel => 
          channel.group?.toLowerCase().includes("movie") || 
          channel.title.toLowerCase().includes("movie")
        );
        setMovies(movieChannels);
      }
    };

    loadMovies();
  }, []);

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Movies</h1>
          <p className="text-muted-foreground">
            Browse through your movie collection
          </p>
        </div>

        <ContentRow title="All Movies" items={movies} />

        {movies.length === 0 && (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">No movies available.</p>
            <p className="text-sm text-muted-foreground">
              Upload a playlist or add a URL to start watching.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Movies;