import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 animate-fade-in">
        <div className="space-y-4 text-center">
          <h1 className="text-8xl font-bold tracking-tighter">404</h1>
          <p className="text-xl text-muted-foreground">
            The page you're looking for doesn't exist.
          </p>
        </div>
        <Button asChild variant="outline" size="lg" className="gap-2">
          <Link to="/">
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;