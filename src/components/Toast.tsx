import { motion, AnimatePresence } from "motion/react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 bg-brand-ink text-white px-5 py-3.5 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 border-brand-amber text-sm font-medium"
        >
          <span className="text-xl">🛒</span>
          <span>{message}</span>
          <button
            onClick={onClose}
            className="ml-3 text-brand-ivory-dark hover:text-white transition-colors text-xs font-bold px-1"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
