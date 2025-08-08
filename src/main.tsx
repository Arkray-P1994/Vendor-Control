import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { SidebarProvider } from "./components/ui/sidebar";
import { ThemeProvider } from "./components/theme-provider";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <StrictMode>
        {/* <SidebarProvider> */}

        <RouterProvider router={router} />
        {/* </SidebarProvider> */}
        <Toaster />
      </StrictMode>
    </ThemeProvider>
  );
}
