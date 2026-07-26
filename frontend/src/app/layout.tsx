import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { AppShell } from "@/components/layout/app-shell";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "OST NEXUS - игровые миры продолжают звучать",
  description: "Интерактивная энциклопедия игровых саундтреков и музыкальных миров.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <body className="min-h-full bg-[#000] text-[#00ff00]">
        <QueryProvider>
          <TooltipProvider>
            <AppShell>
              {children}
            </AppShell>
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}