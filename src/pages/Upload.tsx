import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [url, setUrl] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      localStorage.setItem("currentPlaylist", text);
      toast({
        title: "Success",
        description: "Playlist uploaded successfully",
      });
      navigate("/player");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload playlist",
        variant: "destructive",
      });
    }
  };

  const handleUrlSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!url) return;

    try {
      localStorage.setItem("playlistUrl", url);
      toast({
        title: "Success",
        description: "Playlist URL added successfully",
      });
      navigate("/player");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add playlist URL",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Upload Playlist</h1>
          <p className="text-muted-foreground">
            Upload your M3U playlist file or enter a URL to start streaming.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Upload File</h2>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept=".m3u,.m3u8"
                onChange={handleFileUpload}
                className="flex-1"
              />
              <Button variant="secondary">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Add URL</h2>
            <form onSubmit={handleUrlSubmit} className="flex items-center gap-4">
              <Input
                type="url"
                placeholder="Enter playlist URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <LinkIcon className="w-4 h-4 mr-2" />
                Add URL
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UploadPage;