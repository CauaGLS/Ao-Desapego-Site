"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SidebarProvider } from "./ui/sidebar";
import { TooltipProvider } from "./ui/tooltip";


export function Providers({ children, sidebarState }: { children: React.ReactNode; sidebarState: boolean }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider defaultOpen={sidebarState}>
          <TooltipProvider>
              {children}
          </TooltipProvider>
      </SidebarProvider>
    </QueryClientProvider>
  );
}