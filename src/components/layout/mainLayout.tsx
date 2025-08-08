// components/layouts/MainLayout.tsx

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "./nav";

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      {/* <AppSidebar /> */}
      <SidebarInset>
        <Navbar />
        <main className="flex-1 overflow-auto px-4 py-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
