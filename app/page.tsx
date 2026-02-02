import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SectionSlider from "@/components/SectionSlider";
import TabbedSectionSlider from "@/components/TabbedSectionSlider";
import { api } from "@/lib/api";

export default async function Home() {
  const latestData = await api.getLatest();
  const trendingData = await api.getTrending();
  const fypData = await api.getFYP();
  const popularData = await api.getPopularSearch();

  // Fetch both datasets for the tabbed slider
  const dubIndoLatest = await api.getDubIndo("terbaru");
  const dubIndoPopular = await api.getDubIndo("terpopuler");

  // Use the first item of FYP as the Hero, otherwise fallback to first trending
  const heroDrama = fypData.length > 0 ? fypData[0] : (trendingData.length > 0 ? trendingData[0] : null);

  const dubIndoTabs = [
    {
      label: "Terbaru",
      value: "terbaru",
      movies: dubIndoLatest,
      link: "/dubindo?classify=terbaru"
    },
    {
      label: "Terpopuler",
      value: "terpopuler",
      movies: dubIndoPopular,
      link: "/dubindo?classify=terpopuler"
    }
  ];

  return (
    <main className="min-h-screen pb-20 bg-[#0a0a0a] overflow-x-hidden text-white">
      <Navbar />

      {/* Featured / FYP Section */}
      {heroDrama && (
        <HeroSection drama={heroDrama} />
      )}

      {/* Content Sections - Shifted up to overlap Hero slightly for depth */}
      <div className="relative z-10 -mt-24 space-y-4">

        {/* Tabbed Dubindo Section */}
        {dubIndoLatest.length > 0 && (
          <TabbedSectionSlider title="Dubbing Indonesia" tabs={dubIndoTabs} />
        )}

        {latestData.length > 0 && (
          <SectionSlider title="Terbaru di Dracin" movies={latestData} link="/category/latest" />
        )}

        {trendingData.length > 0 && (
          <SectionSlider title="Sedang Trending" movies={trendingData} link="/category/trending" />
        )}

        {popularData.length > 0 && (
          <SectionSlider title="Pencarian Populer" movies={popularData} link="/category/popular" />
        )}

        {fypData.length > 0 && (
          <SectionSlider title="Rekomendasi FYP" movies={fypData} link="/category/fyp" />
        )}

      </div>

      {/* Simple Footer */}
      <footer className="mt-20 py-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>&copy; 2026 Dracin Streaming. All rights reserved.</p>
      </footer>
    </main>
  );
}
