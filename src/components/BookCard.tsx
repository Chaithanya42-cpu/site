import React from "react";
import { Book } from "../types";
import { motion } from "motion/react";
import { ShoppingCart } from "lucide-react";

interface BookCardProps {
  key?: React.Key;
  book: Book;
  onAddToCart: (id: number) => void;
}

export default function BookCard({ book, onAddToCart }: BookCardProps) {
  const isBestseller = book.tags.includes("bestseller");
  const isNew = book.tags.includes("new");

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl border border-brand-ivory-dark/60 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
    >
      {/* Cover Image & Badge */}
      <div className="relative h-60 bg-brand-ivory-mid overflow-hidden select-none">
        <img
          src={book.img}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {/* Absolute Badges */}
        {isBestseller && (
          <span className="absolute top-3 left-3 bg-brand-amber text-brand-ink text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded shadow-sm">
            Bestseller
          </span>
        )}
        {!isBestseller && isNew && (
          <span className="absolute top-3 left-3 bg-brand-teal text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded shadow-sm">
            New
          </span>
        )}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Metadata and Price */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] font-extrabold text-brand-teal uppercase tracking-widest mb-1">
          {book.collection}
        </span>
        <h3 className="font-sans font-bold text-sm text-brand-ink mb-1 group-hover:text-brand-teal leading-snug line-clamp-2 min-h-[40px]">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 font-medium mb-4">
          by <span className="text-gray-600 font-semibold">{book.author}</span>
        </p>

        {/* Footer actions */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-brand-ivory-mid/60">
          <span className="text-[15px] font-extrabold text-brand-ink">
            ₹{book.price}
          </span>
          <button
            onClick={() => onAddToCart(book.id)}
            className="flex items-center gap-1.5 bg-brand-ink hover:bg-brand-teal text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>+ Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
