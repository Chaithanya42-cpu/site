import React, { useState } from "react";
import { Search, User, ShoppingBag, Menu, X, BookOpen } from "lucide-react";

interface HeaderProps {
  currentPanel: string;
  onNavigate: (panel: string) => void;
  cartCount: number;
  onSearch: (val: string) => void;
  onOpenAuth: () => void;
  userEmail: string | null;
}

export default function Header({
  currentPanel,
  onNavigate,
  cartCount,
  onSearch,
  onOpenAuth,
  userEmail,
}: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearch(val);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "collections", label: "Collections" },
    { id: "shop", label: "Shop All" },
    { id: "subscription", label: "Subscriptions" },
    { id: "contact", label: "Contact" },
  ];

  const handleMobileNav = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-brand-ivory-dark/60 h-[72px] px-4 md:px-8 flex items-center justify-between gap-4 shadow-sm">
      {/* BRAND & SEARCH BAR */}
      <div className="flex items-center gap-6 flex-1 min-w-0">
        <div
          onClick={() => onNavigate("home")}
          className="font-serif text-2xl font-black text-brand-ink cursor-pointer tracking-tight flex items-center gap-2 select-none shrink-0"
        >
          <BookOpen className="w-6 h-6 text-brand-amber stroke-[2.5]" />
          <span>
            Lumina<span className="text-brand-amber text-3xl font-[900]">.</span>
          </span>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-[340px] hidden md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-200 bg-brand-ivory/60 outline-none focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/10 transition-all font-sans placeholder-gray-400 text-brand-ink"
            placeholder="Search titles, authors..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* DESKTOP NAV */}
      <nav className="hidden lg:flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
              currentPanel === item.id
                ? "text-brand-amber bg-brand-amber/[0.08]"
                : "text-brand-ink-soft hover:bg-brand-ivory hover:text-brand-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* QUICK ACTIONS */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Mobile search trigger or container */}
        <div className="relative w-36 sm:w-44 md:hidden block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-full border border-gray-200 bg-brand-ivory outline-none focus:border-brand-amber transition-all font-semibold text-brand-ink"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>

        {/* User Account / Sign In */}
        <button
          onClick={onOpenAuth}
          className="relative p-2 rounded-xl text-brand-ink-soft hover:bg-brand-ivory transition-all cursor-pointer flex items-center gap-1.5"
          title={userEmail ? "My Library" : "Sign In"}
        >
          <User className="w-[21px] h-[21px] stroke-[1.8] hover:text-brand-amber transition-colors" />
          {userEmail && (
            <span className="text-[11px] font-bold text-brand-ink hidden sm:inline max-w-[80px] truncate">
              {userEmail.split("@")[0]}
            </span>
          )}
        </button>

        {/* Cart */}
        <button
          onClick={() => onNavigate("cart")}
          className="relative p-2 rounded-xl text-brand-ink-soft hover:bg-brand-ivory transition-all cursor-pointer"
          title="Shopping Cart"
        >
          <ShoppingBag className="w-[21px] h-[21px] stroke-[1.8] hover:text-brand-amber transition-colors" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-brand-amber text-brand-ink text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center scale-95 shadow-sm border border-white">
              {cartCount}
            </span>
          )}
        </button>

        {/* Hamburger Menu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 lg:hidden text-brand-ink-soft hover:bg-brand-ivory rounded-xl cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE NAV OVERLAY */}
      {mobileMenuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-white border-b border-brand-ivory-dark shadow-lg flex flex-col p-4 gap-2 lg:hidden z-50">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMobileNav(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                currentPanel === item.id
                  ? "text-brand-amber bg-brand-amber/[0.06]"
                  : "text-brand-ink-soft hover:bg-brand-ivory hover:text-brand-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="border-t border-brand-ivory-mid pt-2 mt-2">
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-brand-teal hover:bg-brand-ivory transition-colors"
            >
              {userEmail ? "Go to My Account" : "Sign in / Register"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
