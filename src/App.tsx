import React, { useState, useEffect } from "react";
import { Book } from "./types";
import { BOOKS, COLLECTIONS, SUBSCRIPTION_TIERS } from "./data";
import PromoBanner from "./components/PromoBanner";
import Header from "./components/Header";
import HomeView from "./components/HomeView";
import ShopView from "./components/ShopView";
import CartCheckoutView from "./components/CartCheckoutView";
import AccountView from "./components/AccountView";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import Toast from "./components/Toast";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Calendar, BadgePercent, ShieldCheck, Mail, Phone, MapPin, ChevronRight, Lock } from "lucide-react";

export default function App() {
  // Navigation panel route state
  const [currentPanel, setCurrentPanel] = useState<string>("home");

  // Cart & checkout states
  const [cart, setCart] = useState<Book[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authentication states
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [purchasedIds, setPurchasedIds] = useState<number[]>([701, 704]); // Base bought list for demo simulation

  // Unified Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    // Auto-wipe toast message after 3200ms
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const handleAddToCart = (bookId: number) => {
    const book = BOOKS.find((b) => b.id === bookId);
    if (!book) return;

    if (cart.some((item) => item.id === bookId)) {
      showToast(`"${book.title}" is already in your shopping basket.`);
      return;
    }

    setCart((prev) => [...prev, book]);
    showToast(`"${book.title}" added to your shopping basket!`);
  };

  const handleRemoveFromCart = (bookId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== bookId));
    showToast("Item removed from your shopping basket.");
  };

  const handleNavigate = (panel: string) => {
    setCurrentPanel(panel);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoginSuccess = (email: string, name: string) => {
    setUser({ email, name });
    // If the logging user is the demo user, merge his dummy bought catalog ids
    if (email === "demo@lumina.com") {
      setPurchasedIds([701, 704]);
    } else {
      setPurchasedIds([]);
    }
    showToast(`Welcome back, ${name || "Reader"}! Account successfully synchronized.`);
  };

  const handleSignOut = () => {
    setUser(null);
    setPurchasedIds([701, 704]); // Reset dummy owned books
    handleNavigate("home");
    showToast("Signed out. Secure vault locked.");
  };

  const handlePlaceOrder = (promoApplied: boolean, street: string, city: string, pin: string) => {
    // Collect purchased IDs
    const currentBasketIds = cart.map((item) => item.id);
    
    // Merge into purchasedIds
    setPurchasedIds((prev) => {
      const uniqueMerged = Array.from(new Set([...prev, ...currentBasketIds]));
      return uniqueMerged;
    });

    // Wipe cart
    setCart([]);
    handleNavigate("account");
    showToast("🎉 Order placed successfully! Your license codes are ready in My Library.");
  };

  const handleSelectCuratedCollection = (tag: string) => {
    setSelectedCategory(tag);
    handleNavigate("shop");
  };

  const handleSubscribe = (tierName: string) => {
    if (!user) {
      showToast("Authentication required before buying reading passes.");
      setAuthOpen(true);
      return;
    }
    showToast(`✅ Subscribed to ${tierName}! Confirmation dispatching to ${user.email}.`);
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast("🚀 Message dispatched! Our technical support will review within 24 hours.");
    e.currentTarget.reset();
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
  };

  return (
    <div className="bg-brand-ivory min-h-screen text-brand-ink flex flex-col font-sans selection:bg-brand-amber selection:text-brand-ink">
      
      {/* 1. TOP ANNOUNCEMENT TICKER BANNER */}
      <PromoBanner />

      {/* 2. STICKY HEADER SYSTEM */}
      <Header
        currentPanel={currentPanel}
        onNavigate={handleNavigate}
        cartCount={cart.length}
        onSearch={(val) => {
          setSearchQuery(val);
          if (val && currentPanel !== "shop") {
            setCurrentPanel("shop");
          }
        }}
        onOpenAuth={() => (user ? handleNavigate("account") : setAuthOpen(true))}
        userEmail={user?.email || null}
      />

      {/* 3. CORE PANEL MANAGER PORTAL */}
      <main className="flex-grow py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPanel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {/* VIEW - HOME */}
            {currentPanel === "home" && (
              <HomeView
                onNavigate={handleNavigate}
                books={BOOKS}
                onAddToCart={handleAddToCart}
                onSelectCategory={handleSelectCuratedCollection}
              />
            )}

            {/* VIEW - CURATED COLLECTIONS */}
            {currentPanel === "collections" && (
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="mb-10 text-center sm:text-left">
                  <span className="text-xs font-black uppercase tracking-widest text-[#f5a623]">
                    Thematic Categories
                  </span>
                  <h1 className="font-serif text-4xl font-black text-brand-ink mt-1">Our Curated Collections</h1>
                  <p className="text-xs text-gray-500 font-sans mt-1">Explore our publications sorted by design principles, languages, and monetization guides.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {COLLECTIONS.map((c) => (
                    <div
                      key={c.slug}
                      onClick={() => handleSelectCuratedCollection(c.slug)}
                      className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-brand-ivory-dark/40"
                    >
                      {/* BG */}
                      <img
                        src={c.img}
                        alt={c.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                        referrerPolicy="no-referrer"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 flex flex-col justify-end" />
                      
                      {c.badge && (
                        <span className="absolute top-4 right-4 bg-brand-amber text-brand-ink text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow">
                          {c.badge}
                        </span>
                      )}

                      <div className="relative text-white space-y-1 select-none">
                        <h3 className="font-serif text-xl font-bold tracking-tight text-white group-hover:text-brand-amber transition-colors">
                          {c.title}
                        </h3>
                        <p className="text-[11px] text-gray-300 font-medium leading-relaxed max-w-xs line-clamp-2">
                          {c.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW - SHOP ALL */}
            {currentPanel === "shop" && (
              <ShopView
                books={BOOKS}
                onAddToCart={handleAddToCart}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onClearFilters={handleClearFilters}
              />
            )}

            {/* VIEW - SUBSCRIPTIONS PLANNERS */}
            {currentPanel === "subscription" && (
              <div className="space-y-12">
                <div className="max-w-xl mx-auto text-center px-4">
                  <span className="text-xs font-black uppercase text-brand-amber tracking-widest">
                    Permanent access plans
                  </span>
                  <h1 className="font-serif text-4xl font-black text-brand-ink mt-1">Reading Pass subscriptions</h1>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    Subscribe for unconstrained access to download everything we release. Instant deliveries directly to your private library. Can cancel anytime.
                  </p>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {SUBSCRIPTION_TIERS.map((tier) => (
                    <div
                      key={tier.id}
                      className={`relative bg-white border rounded-2xl p-6 flex flex-col justify-between shadow-sm transition-all hover:shadow-lg ${
                        tier.featured ? "border-brand-amber ring-1 ring-brand-amber" : "border-brand-ivory-dark/60"
                      }`}
                    >
                      {tier.featured && (
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-amber text-brand-ink text-[10px] uppercase font-black tracking-widest px-4 py-1.5 rounded-full shadow border border-white">
                          RECOMMENDED PASS
                        </span>
                      )}

                      <div className="space-y-4">
                        <h3 className="font-serif text-lg font-black text-brand-ink">{tier.name}</h3>
                        <div className="flex items-baseline gap-1 pt-1">
                          <span className="font-serif text-3.5xl font-extrabold text-brand-ink">₹{tier.price}</span>
                          <span className="text-xs text-gray-500 font-medium">/ {tier.billingCycle}</span>
                        </div>

                        {/* Perk list */}
                        <ul className="space-y-2.5 pt-4 border-t border-brand-ivory-mid">
                          {tier.perks.map((perk, idx) => (
                            <li key={idx} className="text-xs text-gray-700 leading-normal flex items-start gap-2 select-none">
                              <span className="text-brand-teal font-extrabold">✓</span>
                              <span>{perk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => handleSubscribe(tier.name)}
                        className={`w-full mt-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                          tier.featured
                            ? "bg-brand-ink text-white hover:bg-brand-teal shadow-md"
                            : "bg-brand-ivory text-brand-ink border border-brand-ivory-dark hover:border-brand-amber"
                        }`}
                      >
                        Enroll Plan
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW - CONTACT PORTAL */}
            {currentPanel === "contact" && (
              <div className="max-w-4xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                
                {/* Information cards */}
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-black uppercase text-brand-amber tracking-widest">
                      Reach Out
                    </span>
                    <h1 className="font-serif text-4xl font-black text-brand-ink mt-1">Get in Touch</h1>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      Questions regarding a DRM receipt, an enterprise seat order, or title release proposals? Leave us coordinates.
                    </p>
                  </div>

                  {/* Informational entries */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-4 p-4 bg-white border border-brand-ivory-dark/60 rounded-xl">
                      <Mail className="w-5 h-5 text-brand-amber shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-brand-ink">Corporate Email Helpdesk</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">licensing@luminabooks.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-white border border-brand-ivory-dark/60 rounded-xl">
                      <Phone className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-brand-ink">Customer Service Support Line</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">+91 91765 00000 (Mon - Sat, 10 AM to 6 PM)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-white border border-brand-ivory-dark/60 rounded-xl">
                      <MapPin className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-brand-ink">Publishing Hub Coordinates</h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">Lumina Digital Square, Sector 62, Noida, UP, India</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secure contact form */}
                <div className="bg-white border border-brand-ivory-dark/60 rounded-2xl p-6 md:p-8 shadow-sm">
                  <h3 className="font-serif text-lg font-black text-brand-ink mb-1">Send a Message</h3>
                  <p className="text-[10px] text-gray-400 font-medium mb-6">Dispatch verified mail directly to ticketing database.</p>
                  
                  <form onSubmit={handleContactSubmit} className="space-y-4 font-sans">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-brand-ink uppercase tracking-wide">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-3.5 py-2.5 text-xs border border-brand-ivory-dark rounded-xl outline-none focus:border-brand-amber text-brand-ink"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-brand-ink uppercase tracking-wide">
                        Email Coordinates
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-3.5 py-2.5 text-xs border border-brand-ivory-dark rounded-xl outline-none focus:border-brand-amber text-brand-ink"
                        placeholder="you@email.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-brand-ink uppercase tracking-wide">
                        Ticketing Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="w-full px-3.5 py-2.5 text-xs border border-brand-ivory-dark rounded-xl outline-none focus:border-brand-amber text-brand-ink resize-none"
                        placeholder="Detail your request or order ID..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-ink hover:bg-brand-teal text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-colors shadow-sm cursor-pointer"
                    >
                      Dispatch Ticket
                    </button>
                  </form>
                </div>

              </div>
            )}

            {/* VIEW - CART & CHECKOUT MANAGER */}
            {(currentPanel === "cart" || currentPanel === "checkout") && (
              <CartCheckoutView
                cart={cart}
                onRemoveFromCart={handleRemoveFromCart}
                userEmail={user?.email || null}
                onNavigate={handleNavigate}
                onOpenAuth={() => setAuthOpen(true)}
                onPlaceOrder={handlePlaceOrder}
              />
            )}

            {/* VIEW - USER ACCOUNT DIGITAL VAULT */}
            {currentPanel === "account" && user && (
              <AccountView
                userEmail={user.email}
                userProfileName={user.name}
                purchasedIds={purchasedIds}
                onSignOut={handleSignOut}
                onNavigate={handleNavigate}
              />
            )}

            {/* VIEW - LAUNCHER POLICY AGREEMENTS */}
            {currentPanel === "privacy" && (
              <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="mb-8 text-center md:text-left">
                  <span className="text-xs font-black uppercase text-[#6b7e91] tracking-widest mb-1 block">
                    Legal Policy Coordinates
                  </span>
                  <h1 className="font-serif text-3.5xl font-black text-brand-ink leading-tight">Privacy Policy</h1>
                  <p className="text-xs text-brand-amber font-mono mt-1">Last compiled: June 1, 2026</p>
                </div>

                <div className="bg-white border border-brand-ivory-dark/60 rounded-2xl p-6 md:p-8 space-y-6 text-xs text-gray-700 leading-relaxed font-sans">
                  <p>
                    At LuminaBooks, we respect the integrity of your personal coordinates and library files. This Privacy Policy documents information flows processed during your browsing and download actions.
                  </p>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-sm font-bold text-brand-ink">1. Information We Collect</h3>
                    <p>
                      We gather details you provide during registration logs (Name, Email Coordinates) or billing inputs (Street and City codes). We do not collect credit cards, mobile UPI credentials, or bank accounts directly; these settle safely inside Encrypted payment aggregators.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-sm font-bold text-brand-ink">2. DRM-Free Deliveries</h3>
                    <p>
                      Your digital library files are stripped of locks or expiration counts. Because no telemetry tracers reside inside our downloadable PDF or text documents, your read logs remain perfectly private offline.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-sm font-bold text-brand-ink">3. Data Sharing Restrictions</h3>
                    <p>
                      We never trade, loan, or leverage your client profiles or e-mail collections for commercial marketing campaigns. We utilize email markers strictly to link your active billing purchases to your My Vault library accounts.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW - TERMS OF USE */}
            {currentPanel === "terms" && (
              <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="mb-8 text-center md:text-left">
                  <span className="text-xs font-black uppercase text-[#6b7e91] tracking-widest mb-1 block">
                    Publishing Protocols
                  </span>
                  <h1 className="font-serif text-3.5xl font-black text-brand-ink leading-tight">Terms of Use</h1>
                  <p className="text-xs text-brand-amber font-mono mt-1">Last compiled: June 1, 2026</p>
                </div>

                <div className="bg-white border border-brand-ivory-dark/60 rounded-2xl p-6 md:p-8 space-y-6 text-xs text-gray-700 leading-relaxed font-sans">
                  <p>
                    By downloading materials hosted on LuminaBooks, you agree to these terms of use.
                  </p>

                  <div className="space-y-2">
                    <h3 className="font-serif text-sm font-bold text-brand-ink">1. Personal Copy Licensing</h3>
                    <p>
                      Purchases authorize a non-exclusive, non-transferable personal reading license. You own the files permanently. You are authorized to copy scripts, layout patterns, or system coordinates into your active commercial workspaces. Reselling or distributing whole books is strictly unauthorized.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-sm font-bold text-brand-ink">2. Flat File Delivery Warranty</h3>
                    <p>
                      Every purchase delivers a flat text file license coordinate alongside standard formats. Lumina renders documents "as-is" built for direct reading, offline indexing, and practitioners' search.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. FOOTER INFORMATIONS */}
      <Footer onNavigate={handleNavigate} />

      {/* 5. GUEST SIGN-IN POPUP OVERLAY */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* 6. GLOBAL FLOATING NOTIFICATION SYSTEM */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
