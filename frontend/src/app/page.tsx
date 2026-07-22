import { FoundationOverview } from "@/widgets/foundation-overview";
import { NexusHero } from "@/widgets/nexus-hero";
import { SiteFooter } from "@/widgets/site-footer";
import { SiteHeader } from "@/widgets/site-header";

export default function Home() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <NexusHero />
      <FoundationOverview />
      <SiteFooter />
    </main>
  );
}
