import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container py-6 space-y-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}