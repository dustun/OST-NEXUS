import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { AppShell } from "@/components/layout/app-shell";
import { SiteHeader } from "@/components/layout/site-header";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="ru" className="h-full antialiased">
      <body className={`${inter.className} min-h-full`}>
        <QueryProvider>
          <TooltipProvider>
            <AppShell>
              <SiteHeader />
              {children}
            </AppShell>
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
