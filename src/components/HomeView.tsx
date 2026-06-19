import { useState } from "react";
import { Book } from "../types";
import BookCard from "./BookCard";
import { Sparkles, Milestone, ArrowRight, TrendingUp, Star, Layers, Zap, Unlock, ShieldCheck, Download } from "lucide-react";
import { motion } from "motion/react";

interface HomeViewProps {
  onNavigate: (panel: string) => void;
  books: Book[];
  onAddToCart: (id: number) => void;
  onSelectCategory: (cat: string) => void;
}

type FilterTag = "bestseller" | "new" | "top-rated" | "all";

export default function HomeView({
  onNavigate,
  books,
  onAddToCart,
  onSelectCategory,
}: HomeViewProps) {
  const [activeTag, setActiveTag] = useState<FilterTag>("bestseller");

  const filteredBooks =
    activeTag === "all"
      ? books
      : books.filter((b) => b.tags.includes(activeTag));

  const stats = [
    { num: "50+", label: "DRM-Free Publications" },
    { num: "2,840+", label: "Active Readers Globally" },
    { num: "99.8%", label: "Satisfaction Benchmark" },
  ];

  const badges = [
    { icon: <Zap className="w-5 h-5 text-brand-amber" />, text: "Instant PDF Deliveries" },
    { icon: <Unlock className="w-5 h-5 text-brand-teal" />, text: "DRM-Free Personal Licenses" },
    { icon: <Layers className="w-5 h-5 text-purple-500" />, text: "All Devices Supported" },
    { icon: <ShieldCheck className="w-5 h-5 text-blue-500" />, text: "Encrypted Card Processing" },
  ];

  return (
    <div className="space-y-12">
      {/* IMMERSIVE HERO */}
      <section className="relative overflow-hidden bg-brand-ink text-white min-h-[560px] flex items-center px-6 md:px-12 py-16 rounded-3xl mx-4 my-6 select-none">
        {/* Subtle geometric gradient orbs */}
        <div className="absolute inset-0 bg-radial-gradient(ellipse 70% 70% at 75% 35%, rgba(245,166,35,0.15) 0%, transparent 70%) pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient(ellipse 50% 50% at 15% 85%, rgba(26,127,116,0.2) 0%, transparent 60%) pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-brand-amber font-mono text-[10px] uppercase tracking-widest font-extrabold px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> DRM-Free Digital Books
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-white">
              Knowledge you <br className="hidden sm:inline" />
              can <em className="text-brand-amber not-italic underline decoration-amber-500/30">own</em> forever.
            </h1>
            <p className="text-sm md:text-base text-gray-300 font-sans max-w-lg leading-relaxed">
              Instantly download beautifully typeset developer manuals, marketing blueprints, and design system playbooks—yours to store, highlight, and keep indefinitely.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate("shop")}
                className="bg-brand-amber text-brand-ink hover:bg-brand-amber-deep font-bold text-sm tracking-wide px-7 py-3.5 rounded-xl shadow-lg hover:shadow-brand-amber/20 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                Browse Books <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("collections")}
                className="bg-white/5 border border-white/15 text-white hover:bg-white/10 font-bold text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer"
              >
                Thematic Collections
              </button>
            </div>
          </div>

          {/* Interactive perspective book stacking deck */}
          <div className="hidden lg:flex justify-center items-center relative h-[360px] perspective-[1000px]">
            {/* Book Card 1 */}
            <motion.div
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: -16, x: -70, z: 0 }}
              whileHover={{ rotateY: -4, z: 80, y: -18, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-40 h-60 bg-white border-l-[8px] border-brand-teal rounded-r-xl shadow-2xl absolute p-4 flex flex-col justify-between select-none cursor-pointer"
            >
              <span className="text-[9px] font-black uppercase text-brand-teal tracking-widest leading-none">DEVELOPMENT</span>
              <h4 className="font-serif font-black text-xs text-brand-ink leading-tight">Mastering Web Development</h4>
              <span className="text-[10px] font-bold text-brand-teal-light flex items-center gap-1">Instant PDF <Download className="w-3 h-3" /></span>
            </motion.div>

            {/* Book Card 2 */}
            <motion.div
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: -11, x: 0, z: 30 }}
              whileHover={{ rotateY: -4, z: 100, y: -18, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-40 h-60 bg-white border-l-[8px] border-brand-amber rounded-r-xl shadow-2xl absolute p-4 flex flex-col justify-between select-none cursor-pointer"
            >
              <span className="text-[9px] font-black uppercase text-brand-amber tracking-widest leading-none">MARKETING</span>
              <h4 className="font-serif font-black text-xs text-brand-ink leading-tight">Digital Marketing Playbook</h4>
              <span className="text-[10px] font-bold text-brand-amber-deep flex items-center gap-1">Instant PDF <Download className="w-3 h-3" /></span>
            </motion.div>

            {/* Book Card 3 */}
            <motion.div
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: -6, x: 70, z: 60 }}
              whileHover={{ rotateY: -3, z: 120, y: -18, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-40 h-60 bg-white border-l-[8px] border-red-500 rounded-r-xl shadow-2xl absolute p-4 flex flex-col justify-between select-none cursor-pointer"
            >
              <span className="text-[9px] font-black uppercase text-red-500 tracking-widest leading-none">SYSTEMS</span>
              <h4 className="font-serif font-black text-xs text-brand-ink leading-tight">Geometric UI &amp; Layout Systems</h4>
              <span className="text-[10px] font-bold text-red-600 flex items-center gap-1">Instant PDF <Download className="w-3 h-3" /></span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES BAR */}
      <section className="bg-brand-ivory-mid/80 border-y border-brand-ivory-dark/60 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-8 text-center sm:text-left">
          {badges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-3 font-sans font-semibold text-xs text-brand-ink-soft">
              {badge.icon}
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN HOME CATALOGUE */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 mb-8 border-b border-brand-ivory-dark/40 pb-6">
          <div className="text-center sm:text-left">
            <span className="text-xs font-black uppercase text-brand-amber tracking-widest">
              Curated Releases
            </span>
            <h2 className="font-serif text-3xl font-black text-brand-ink mt-0.5 tracking-tight">
              {activeTag === "bestseller" && "Readers' Top Choices"}
              {activeTag === "new" && "Fresh Formats & Releases"}
              {activeTag === "top-rated" && "Five-Star Handbooks"}
              {activeTag === "all" && "All Digital Collections"}
            </h2>
          </div>

          {/* Tag Filter Chips */}
          <div className="flex flex-wrap gap-2 justify-center">
            {([
              { id: "bestseller", label: "🔥 Bestsellers" },
              { id: "new", label: "✨ New Releases" },
              { id: "top-rated", label: "⭐ Top Rated" },
              { id: "all", label: "Library Catalog" },
            ] as const).map((chip) => (
              <button
                key={chip.id}
                onClick={() => setActiveTag(chip.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all border cursor-pointer ${
                  activeTag === chip.id
                    ? "bg-brand-amber/[0.1] text-brand-amber border-brand-amber"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Books Grid with nice Framer Motion layouts */}
        {filteredBooks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-brand-ivory-dark py-12 text-center text-gray-500">
            No matching books found under this tab. Keep exploring!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </section>

      {/* HIGHLIGHT ABOUT BLOCK FOR EDITORIAL SENSE */}
      <section className="bg-brand-ink text-white py-14 px-6 md:px-12 rounded-3xl mx-4 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-extrabold text-brand-amber">Curator's Manifesto</h3>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              Founded to close the gap between rapidly shifting industries and slow legacy publishers. We source real-world code, layouts, and growth templates from active experts. By stripping away DRM locks, your digital books remain permanently accessible inside your offline devices.
            </p>
            
            {/* Real scale counters */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
              {stats.map((stat, i) => (
                <div key={i} className="text-center sm:text-left">
                  <div className="font-serif text-xl font-bold text-white">{stat.num}</div>
                  <div className="text-[10px] text-gray-400 font-medium leading-none mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl font-extrabold text-brand-amber">DRM-Free Standard</h3>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              No proprietary applications, subscription reader handcuffs, or expiration countdowns. When you checkout, your receipt generates instantly under "My Library"—complete with a flat-file code keys and text templates ready for highlight, copy-pasting, and search indices.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl font-extrabold text-brand-amber">Practical Formats Only</h3>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              No long philosophical essays or boilerplate intro chapters. Every page of our technology manuals centers on copyable layouts, production-tested scripts, database setups, and structured layouts built for production. Your reading leads directly to code.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
