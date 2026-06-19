import { motion } from "motion/react";

export default function PromoBanner() {
  const message = "🎉 Up to 50% OFF on digital bundles over ₹499 — Use code GEN50 at checkout";

  return (
    <div className="bg-brand-ink text-brand-amber py-2 text-xs font-semibold tracking-wider overflow-hidden relative border-b border-brand-ink-soft select-none hidden sm:block">
      <div className="flex w-max animate-promo whitespace-nowrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="px-14 inline-block">
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
