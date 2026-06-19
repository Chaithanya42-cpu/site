import { Book } from "../types";
import BookCard from "./BookCard";
import { CAT_NAMES } from "../data";
import { Filter, Trash2, BookOpen } from "lucide-react";

interface ShopViewProps {
  books: Book[];
  onAddToCart: (id: number) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onClearFilters: () => void;
}

export default function ShopView({
  books,
  onAddToCart,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onClearFilters,
}: ShopViewProps) {
  // Client-side combined query resolver
  const filteredBooks = books.filter((book) => {
    // 1. Resolve category/tag Filter
    let matchesCategory = true;
    if (selectedCategory && selectedCategory !== "all") {
      matchesCategory =
        book.collection === selectedCategory ||
        book.tags.includes(selectedCategory);
    }

    // 2. Resolve search query (resolves title or author)
    let matchesSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      matchesSearch =
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.collection.toLowerCase().includes(q);
    }

    return matchesCategory && matchesSearch;
  });

  const sidebarCategories = [
    { key: "all", label: "📚 All Publications" },
    { key: "bestseller", label: "🔥 Best Sellers" },
    { key: "new", label: "✨ New Arrivals" },
    { key: "top-rated", label: "⭐ Top Rated" },
    { key: "tech", label: "💻 Coding & Tech" },
    { key: "business", label: "📈 Growth Strategy" },
    { key: "design", label: "📐 UI/UX Design" },
  ];

  const hasActiveFilters = selectedCategory !== "all" || searchQuery !== "";

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR NAVIGATION FILTERS */}
        <aside className="space-y-6">
          <div className="bg-white border border-brand-ivory-dark/60 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#6b7e91] flex items-center gap-2">
              <Filter className="w-3.5 h-3.5" /> Book Catalogs
            </h3>
            
            <div className="flex flex-col gap-1">
              {sidebarCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => onSelectCategory(cat.key)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                    selectedCategory === cat.key
                      ? "bg-brand-amber/[0.08] text-brand-amber font-extrabold"
                      : "text-brand-ink-soft hover:bg-brand-ivory hover:text-brand-ink"
                  }`}
                >
                  <span>{cat.label}</span>
                  {selectedCategory === cat.key && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-amber" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-brand-ink text-white rounded-2xl p-5 space-y-3 shadow-md">
            <h4 className="font-serif font-black text-sm text-brand-amber flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-brand-amber" /> Reader Policy
            </h4>
            <p className="text-[11px] text-gray-300 leading-relaxed font-sans">
              Every digital purchase delivers direct, DRM-free lifetime file storage. No app installations necessary.
            </p>
          </div>
        </aside>

        {/* ACTIVE GRID */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-end justify-between gap-4 border-b border-brand-ivory-dark/40 pb-4">
            <div>
              <span className="text-xs font-black text-brand-amber uppercase tracking-widest leading-none">
                {searchQuery ? "Search Results" : "Store Catalog"}
              </span>
              <h2 className="font-serif text-3xl font-black text-brand-ink mt-1 tracking-tight">
                {searchQuery ? `"${searchQuery}"` : CAT_NAMES[selectedCategory] || selectedCategory}
              </h2>
            </div>

            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 cursor-pointer transition-all active:scale-95"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Catalog grid */}
          {filteredBooks.length === 0 ? (
            <div className="bg-white rounded-2xl border border-brand-ivory-dark py-20 px-4 text-center space-y-3">
              <span className="text-4xl">📚</span>
              <h3 className="font-serif text-lg font-bold text-brand-ink">No matching publications</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                We couldn't locate any records matching your current filter parameter. Clear the filters or run a different query.
              </p>
              <button
                onClick={onClearFilters}
                className="bg-brand-ink hover:bg-brand-teal text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-sm active:scale-95 transition-all"
              >
                Show All Books
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
