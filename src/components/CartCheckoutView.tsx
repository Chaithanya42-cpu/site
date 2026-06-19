import React, { useState } from "react";
import { Book } from "../types";
import { Trash2, ShieldCheck, MapPin, Tag, CreditCard, ChevronRight, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";

interface CartCheckoutViewProps {
  cart: Book[];
  onRemoveFromCart: (id: number) => void;
  userEmail: string | null;
  onNavigate: (panel: string) => void;
  onOpenAuth: () => void;
  onPlaceOrder: (promoApplied: boolean, street: string, city: string, pin: string) => void;
}

export default function CartCheckoutView({
  cart,
  onRemoveFromCart,
  userEmail,
  onNavigate,
  onOpenAuth,
  onPlaceOrder,
}: CartCheckoutViewProps) {
  const [viewState, setViewState] = useState<"cart" | "checkout">("cart");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);
  
  // Checkout address states
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const subtotal = cart.reduce((acc, book) => acc + book.price, 0);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "GEN50") {
      setDiscount(250);
      setPromoMessage({ text: "✓ Promo 'GEN50' successfully applied! Enjoy ₹250 off.", success: true });
    } else {
      setDiscount(0);
      setPromoMessage({ text: "✗ Invalid coupon code. Try 'GEN50'.", success: false });
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) {
      alert("Please authenticate to secure your digital license keys.");
      onOpenAuth();
      return;
    }
    if (!street || !city || !pin) {
      alert("Please fill in billing details to generate your compliance invoice.");
      return;
    }
    onPlaceOrder(discount > 0, street, city, pin);
  };

  const totalPayable = Math.max(0, subtotal - discount);

  // EMPTY BASKET CASE
  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4 select-none">
        <div className="w-16 h-16 bg-brand-amber/10 text-brand-amber text-2xl font-bold flex items-center justify-center rounded-full mx-auto animate-bounce">
          📚
        </div>
        <h2 className="font-serif text-2xl font-black text-brand-ink">Your Shopping Basket is Empty</h2>
        <p className="text-xs text-gray-500 font-sans max-w-sm mx-auto">
          Explore our premium catalogs of DRM-free ebooks. Publications deliver immediate receipts with text files of active content.
        </p>
        <button
          onClick={() => onNavigate("shop")}
          className="bg-brand-ink hover:bg-brand-teal text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md mt-2 cursor-pointer"
        >
          Browse Book Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-6">
      
      {/* VIEW TOGGLE PROGRESS BAR */}
      <div className="flex items-center justify-center gap-2 select-none">
        <button
          onClick={() => setViewState("cart")}
          className={`text-xs font-bold tracking-wider uppercase px-4 py-2 border-b-2 transition-all cursor-pointer ${
            viewState === "cart"
              ? "border-brand-amber text-brand-amber"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          1. Review Basket ({cart.length})
        </button>
        <ChevronRight className="w-4 h-4 text-gray-300" />
        <button
          onClick={() => {
            if (cart.length > 0) setViewState("checkout");
          }}
          disabled={cart.length === 0}
          className={`text-xs font-bold tracking-wider uppercase px-4 py-2 border-b-2 transition-all cursor-pointer disabled:opacity-50 ${
            viewState === "checkout"
              ? "border-brand-amber text-brand-amber"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          2. Billing &amp; Payment
        </button>
      </div>

      {viewState === "cart" ? (
        /* CART STATE */
        <div className="bg-white border border-brand-ivory-dark/60 rounded-2xl shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
          <div className="border-b border-brand-ivory-dark/40 pb-4">
            <h2 className="font-serif text-2xl font-black text-brand-ink">Your Library Order</h2>
            <p className="text-xs text-gray-500">Please review current publications to secure your digital license.</p>
          </div>

          <div className="divide-y divide-brand-ivory-mid">
            {cart.map((book) => (
              <div key={book.id} className="py-4 flex gap-4 items-center">
                <img
                  src={book.img}
                  alt={book.title}
                  className="w-12 h-16 object-cover bg-brand-ivory rounded border border-brand-ivory-dark select-none"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-sans font-bold text-sm text-brand-ink truncate">{book.title}</h4>
                  <p className="text-xs text-gray-410">by {book.author}</p>
                  <span className="inline-block bg-brand-ivory px-2 py-0.5 rounded text-[10px] font-bold text-brand-teal uppercase mt-1">
                    PDF Deliverable
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-brand-ink">₹{book.price}</div>
                  <button
                    onClick={() => onRemoveFromCart(book.id)}
                    className="text-[10px] font-bold text-red-500 hover:text-red-650 flex items-center gap-0.5 mt-1 pointer-events-auto cursor-pointer p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal container */}
          <div className="bg-brand-ivory-mid/45 rounded-xl p-4 flex flex-col items-end gap-1.5 border border-brand-ivory-dark/40 font-sans">
            <div className="flex justify-between w-64 text-xs font-semibold text-gray-500">
              <span>Publications Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-64 text-sm font-black text-brand-ink border-t border-brand-ivory-dark/60 pt-2 mt-1">
              <span>Order Summary</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => onNavigate("shop")}
              className="px-6 py-3 border border-gray-200 hover:border-brand-amber rounded-xl text-xs font-bold text-gray-700 hover:bg-brand-ivory text-center cursor-pointer transition-all"
            >
              ← Keep Reading
            </button>
            <button
              onClick={() => setViewState("checkout")}
              className="flex-1 bg-brand-ink hover:bg-brand-teal text-white py-3 rounded-xl font-bold text-sm tracking-wide shadow-md transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Compile Compliance &amp; Checkout</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* CHECKOUT STATE */
        <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start font-sans">
          
          <div className="bg-white border border-brand-ivory-dark/60 rounded-2xl shadow-sm p-6 md:p-8 space-y-6 md:col-span-3">
            <div className="border-b border-brand-ivory-dark/40 pb-4">
              <h2 className="font-serif text-2xl font-black text-brand-ink">Billing &amp; Delivery</h2>
              <p className="text-xs text-gray-500">Provide registration coordinates to dispatch DRM licenses.</p>
            </div>

            {/* Address fields */}
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#6b7e91] pb-1 border-b border-brand-ivory-mid">
                <MapPin className="w-3.5 h-3.5" /> Dispatch compliance
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-ink uppercase tracking-wide">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-brand-ivory-dark rounded-xl outline-none focus:border-brand-amber text-brand-ink"
                  placeholder="Street name, apartment, workspace"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-ink uppercase tracking-wide">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-brand-ivory-dark rounded-xl outline-none focus:border-brand-amber text-brand-ink"
                    placeholder="Delhi / Bangalore / Pune"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-ink uppercase tracking-wide">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-brand-ivory-dark rounded-xl outline-none focus:border-brand-amber text-brand-ink"
                    placeholder="110001"
                  />
                </div>
              </div>
            </div>

            {/* Promo application */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#6b7e91] pb-1 border-b border-brand-ivory-mid">
                <Tag className="w-3.5 h-3.5" /> Promotional Campaign
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs border border-brand-ivory-dark rounded-xl outline-none focus:border-brand-amber uppercase"
                  placeholder="e.g. GEN50"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="bg-brand-ink hover:bg-brand-teal text-white font-bold text-xs px-4 rounded-xl cursor-pointer transition-colors"
                >
                  Apply Code
                </button>
              </div>
              {promoMessage && (
                <p className={`text-[11px] font-bold mt-1 ${promoMessage.success ? "text-brand-teal" : "text-red-500"}`}>
                  {promoMessage.text}
                </p>
              )}
            </div>

            {/* Payment selections */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#6b7e91] pb-1 border-b border-brand-ivory-mid">
                <CreditCard className="w-3.5 h-3.5" /> Unified Settlement Method
              </div>

              <div className="space-y-2">
                {([
                  { id: "upi", title: "📱 UPI Payment Gateway", desc: "Pay with GPay, PhonePe, or Paytm instantly." },
                  { id: "card", title: "💳 Credit / Debit Card Integration", desc: "Visa, Mastercard, RuPay & Amex support." },
                  { id: "nb", title: "🏦 Net Banking Protocol", desc: "Direct secure login to major financial services." }
                ] as const).map((method) => (
                  <label
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? "border-brand-amber bg-brand-amber/[0.04]"
                        : "border-brand-ivory-dark hover:border-cyan-250 hover:bg-brand-ivory/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="settlement_payment"
                      checked={paymentMethod === method.id}
                      onChange={() => {}}
                      className="mt-1 accent-brand-amber"
                    />
                    <div>
                      <div className="text-xs font-bold text-brand-ink">{method.title}</div>
                      <div className="text-[10px] text-gray-500 font-medium mt-0.5">{method.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* CHECKOUT SUMMARY CONTAINER */}
          <div className="space-y-6 md:col-span-2">
            <div className="bg-white border border-brand-ivory-dark/60 rounded-2xl shadow-sm p-5 space-y-4">
              <h3 className="text-xs font-black uppercase text-brand-ink border-b border-brand-ivory-mid pb-2 flex items-center gap-1.5">
                <ShoppingCart className="w-3.5 h-3.5 text-brand-amber" /> Order Receipt Check
              </h3>

              <div className="space-y-3 text-xs divide-y divide-brand-ivory-mid">
                {cart.map((item) => (
                  <div key={item.id} className="pt-2.5 flex items-center justify-between">
                    <span className="font-semibold text-brand-ink truncate max-w-[150px]">{item.title}</span>
                    <span className="font-extrabold text-brand-ink-mid">₹{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Total Calculation breakdown */}
              <div className="bg-brand-ivory rounded-xl p-4.5 space-y-1.5 text-xs border border-brand-ivory-dark/40">
                <div className="flex justify-between text-gray-410">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-500 font-bold">
                  <span>Voucher Discount</span>
                  <span>–₹{discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-extrabold text-brand-ink text-sm border-t border-brand-ivory-dark/70 pt-2.5 mt-1">
                  <span>Payable Assessment</span>
                  <span>₹{totalPayable.toFixed(2)}</span>
                </div>
              </div>

              {!userEmail && (
                <div className="bg-brand-amber/[0.07] border border-brand-amber/30 text-brand-amber-deep text-[11px] font-semibold leading-relaxed p-3.5 rounded-xl">
                  ⚠️ <strong>Authentication Warning:</strong> You must log in or sign up before you can finalize your download keys.
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-brand-amber text-brand-ink hover:bg-brand-amber-deep py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Authorize &amp; Place Order</span>
              </button>

              <p className="text-[10px] font-medium leading-relaxed text-gray-400 text-center flex items-center justify-center gap-1 mt-3">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-teal mt-px" /> DRM-free access delivers instantly to your browser.
              </p>
            </div>
          </div>

        </form>
      )}

    </div>
  );
}
