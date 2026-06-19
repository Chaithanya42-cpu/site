import { Book } from "../types";
import { BOOKS } from "../data";
import { LogOut, ArrowUpRight, BookMarked, Download, Laptop, Key, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

interface AccountViewProps {
  userEmail: string;
  userProfileName: string;
  purchasedIds: number[];
  onSignOut: () => void;
  onNavigate: (panel: string) => void;
}

export default function AccountView({
  userEmail,
  userProfileName,
  purchasedIds,
  onSignOut,
  onNavigate,
}: AccountViewProps) {
  // Resolve books bought by looking up IDs in main catalog
  const filteredPurchasedBooks = BOOKS.filter((book) =>
    purchasedIds.includes(book.id)
  );

  const handleDownloadSimulatedBook = (book: Book) => {
    const key = `LM-KEY-${Math.floor(Math.random() * 900000 + 100000)}-${Date.now().toString(36).toUpperCase()}`;
    const txtContent = `==========================================================
LUMINA BOOKS DRM-FREE LICENSE DELIVERABLE
==========================================================
License Owner: ${userProfileName}
Authorized Email: ${userEmail}
Publication Key: ${key}

Product Title: ${book.title}
Author: ${book.author}
License Class: Personal Lifetime Ownership (PDF / EPUB / MOBI formats)

----------------------------------------------------------
HOW TO LOAD YOUR DIGESTS:
1. Sync this flat text coordinate code or load the PDF payload directly.
2. Since Lumina digital volumes do not contain any DRM locks, you can compile and read this on any compatible Reader app (Kobo, Kindle, Apple Books, Calibre, or generic PDF platforms).

Thank you for selecting practitioners' manuals direct from authors!
==========================================================`;

    const blob = new Blob([txtContent], { type: "text/plain" });
    const downloadUrl = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = downloadUrl;
    downloadAnchor.download = `${book.title.replace(/\s+/g, "_")}_DRM_FREE_LIC.txt`;
    downloadAnchor.click();
    URL.revokeObjectURL(downloadUrl);
  };

  const initial = userProfileName ? userProfileName[0].toUpperCase() : userEmail[0].toUpperCase();

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* PROFILE SIDEBAR */}
        <div className="bg-white border border-brand-ivory-dark/60 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center space-y-4 font-sans select-none">
          <div className="w-16 h-16 bg-brand-ink text-brand-amber font-serif font-black text-2.5xl flex items-center justify-center rounded-2xl shadow-inner shadow-black/10">
            {initial}
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-brand-ink">{userProfileName || "Active Reader"}</h4>
            <p className="text-[11px] text-gray-400 mt-0.5 truncate max-w-[160px]">{userEmail}</p>
          </div>

          <div className="w-full border-t border-brand-ivory-mid pt-4 space-y-2">
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-black tracking-wider text-brand-teal bg-brand-teal/[0.06] px-2.5 py-1 rounded-full">
              Verified Licensee
            </span>
          </div>

          <button
            onClick={onSignOut}
            className="w-full mt-auto bg-brand-ivory hover:bg-red-50 text-xs font-bold py-2.5 px-4 rounded-xl text-red-500 hover:text-red-650 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-brand-ivory-dark/30 hover:border-red-100"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Profile</span>
          </button>
        </div>

        {/* VAULT MAIN VIEWPORT */}
        <div className="lg:col-span-3 bg-white border border-brand-ivory-dark/60 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-brand-ivory-dark/40 pb-4">
            <div className="flex items-center gap-2 text-brand-amber font-semibold text-xs uppercase tracking-widest font-mono">
              <BookMarked className="w-4 h-4 text-brand-amber" /> Private Library Vault
            </div>
            <h2 className="font-serif text-2xl font-black text-brand-ink mt-1">Your Publications</h2>
            <p className="text-xs text-gray-500">Re-download permanent flat archives of your books at any time.</p>
          </div>

          {/* Purchased Books List */}
          {filteredPurchasedBooks.length === 0 ? (
            <div className="py-16 text-center space-y-3 font-sans">
              <div className="text-3xl">🔑</div>
              <h4 className="font-bold text-sm text-brand-ink">No books in vault yet</h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                Connect and process your shopping cart, or browse the active catalogue to start reading developer playbooks.
              </p>
              <button
                onClick={() => onNavigate("shop")}
                className="bg-brand-ink hover:bg-brand-teal text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-sm active:scale-95 transition-all"
              >
                Go to Digital Store <ArrowUpRight className="w-3.5 h-3.5 inline ml-1" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPurchasedBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-brand-ivory p-4 rounded-xl border border-brand-ivory-dark/40 flex flex-col md:flex-row items-center justify-between gap-4 transition-all hover:bg-brand-ivory-mid/30"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <img
                      src={book.img}
                      alt={book.title}
                      className="w-10 h-14 object-cover rounded bg-white shadow-sm border border-brand-ivory-dark flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-black text-brand-ink tracking-tight line-clamp-1">
                        {book.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium">by {book.author}</p>
                      
                      <div className="flex gap-2 mt-1 flex-wrap">
                        <span className="bg-white px-2 py-0.5 border border-brand-ivory-dark rounded text-[9px] font-mono tracking-wider font-extrabold text-brand-teal/80 flex items-center gap-1">
                          <Laptop className="w-2.5 h-2.5 text-brand-teal" /> DRM-FREE
                        </span>
                        <span className="bg-white px-2 py-0.5 border border-brand-ivory-dark rounded text-[9px] font-mono tracking-wider font-extrabold text-brand-amber/80 flex items-center gap-1">
                          <Key className="w-2.5 h-2.5 text-brand-amber" /> ACTIVE KEY
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownloadSimulatedBook(book)}
                    className="w-full md:w-auto bg-brand-ink hover:bg-brand-teal text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-colors active:scale-95 text-center shrink-0 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download DRM File Receipt</span>
                  </button>
                </div>
              ))}

              <div className="bg-yellow-50/50 border border-yellow-100 text-[11px] text-yellow-800 rounded-xl p-4 flex gap-2.5 items-start mt-4 font-sans leading-relaxed">
                <ShieldAlert className="w-4 h-4 text-brand-amber shrink-0 mt-0.5" />
                <p>
                  <strong>Compliance Note:</strong> To ensure layout rendering standards remain optimized, we update individual digital volumes twice monthly. Your downloaded text components contain permanent links to current release layouts.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
