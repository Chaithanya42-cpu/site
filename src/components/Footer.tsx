import { BookOpen, ShieldCheck, CreditCard } from "lucide-react";

interface FooterProps {
  onNavigate: (panel: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-brand-ink text-gray-400 py-12 px-6 md:px-12 mt-16 border-t border-brand-ink-soft select-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div
              onClick={() => onNavigate("home")}
              className="font-serif text-xl font-black text-white cursor-pointer tracking-tight flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5 text-brand-amber stroke-[2.5]" />
              <span>
                Lumina<span className="text-brand-amber">.</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-[240px]">
              High-fidelity knowledge assets for developers, designers, and growth leaders. Yours to keep DRM-free forever.
            </p>
            <div className="flex gap-2">
              <span className="bg-white/5 p-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-amber" /> DRM Free
              </span>
              <span className="bg-white/5 p-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-brand-teal" /> Secure
              </span>
            </div>
          </div>

          {/* Links 1: Explore */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Explore Library
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <button
                onClick={() => onNavigate("shop")}
                className="text-left hover:text-brand-amber transition-colors cursor-pointer"
              >
                All Digital Publications
              </button>
              <button
                onClick={() => onNavigate("collections")}
                className="text-left hover:text-brand-amber transition-colors cursor-pointer"
              >
                Curated Themes
              </button>
              <button
                onClick={() => onNavigate("shop")}
                className="text-left hover:text-brand-amber transition-colors cursor-pointer text-gray-500"
              >
                Practical Guides
              </button>
            </div>
          </div>

          {/* Links 2: Account */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Your Space
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <button
                onClick={() => onNavigate("account")}
                className="text-left hover:text-brand-amber transition-colors cursor-pointer"
              >
                My Book Library
              </button>
              <button
                onClick={() => onNavigate("subscription")}
                className="text-left hover:text-brand-amber transition-colors cursor-pointer"
              >
                Subscription Passes
              </button>
              <button
                onClick={() => onNavigate("cart")}
                className="text-left hover:text-brand-amber transition-colors cursor-pointer"
              >
                Shopping Cart
              </button>
            </div>
          </div>

          {/* Links 3: Support & Legal */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Support &amp; Policies
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <button
                onClick={() => onNavigate("contact")}
                className="text-left hover:text-brand-amber transition-colors cursor-pointer"
              >
                Contact Customer Care
              </button>
              <button
                onClick={() => onNavigate("privacy")}
                className="text-left hover:text-brand-amber transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onNavigate("terms")}
                className="text-left hover:text-brand-amber transition-colors cursor-pointer"
              >
                Terms of Use
              </button>
              <a
                href="#"
                className="text-left hover:text-brand-amber transition-colors cursor-pointer text-gray-500"
              >
                Global Refund Rules
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] gap-4">
          <p>© 2026 LuminaBooks. Built to deliver knowledge at high frequency.</p>
          <div className="flex gap-2">
            <span className="bg-brand-ink-soft/40 text-brand-ivory px-2 py-1 rounded text-[9px] font-mono tracking-widest font-extrabold text-brand-amber/80">UPI READY</span>
            <span className="bg-brand-ink-soft/40 text-brand-ivory px-2 py-1 rounded text-[9px] font-mono tracking-widest font-extrabold">DRM FREE</span>
            <span className="bg-brand-ink-soft/40 text-brand-ivory px-2 py-1 rounded text-[9px] font-mono tracking-widest font-extrabold">SECURE VAULT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
