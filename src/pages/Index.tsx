import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FileVideo, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 animate-fade-in">
        <div className="space-y-4 text-center max-w-2xl">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <FileVideo className="w-4 h-4 mr-2" />
            M3U Playlist Viewer
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-balance">
            Your Personal Streaming Experience
          </h1>
          <p className="text-lg text-muted-foreground max-w-prose mx-auto">
            Upload your M3U playlists or enter a URL to start streaming your content with our beautiful, minimalist player.
          </p>
        </div>
        
        <div className="flex gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <Button asChild size="lg" className="gap-2">
            <Link to="/upload">
              <Upload className="w-4 h-4" />
              Upload Playlist
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link to="/playlists">
              <FileVideo className="w-4 h-4" />
              Browse Playlists
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default Index;