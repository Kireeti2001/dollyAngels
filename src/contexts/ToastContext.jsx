import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "../lib/utils";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const idRef = useRef(0);
  const reduce = useReducedMotion();

  const showToast = useCallback(({ title, description, status = "info" }) => {
    idRef.current += 1;
    setToast({ id: idRef.current, title, description, status });
    const t = setTimeout(() => setToast(null), status === "error" ? 5000 : 4000);
    return () => clearTimeout(t);
  }, []);

  const value = { toast, showToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              role="alert"
              initial={reduce ? false : { opacity: 0, y: 32, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95, transition: { duration: 0.25 } }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              className={cn(
                "fixed bottom-4 right-4 z-[1200] max-w-sm rounded-2xl border-2 px-4 py-3 shadow-hard",
                toast.status === "error" && "border-border bg-destructive text-destructive-foreground",
                toast.status === "success" && "border-border bg-accent text-accent-foreground",
                (toast.status === "info" || !toast.status) && "border-border bg-card text-card-foreground"
              )}
            >
              <p className="font-semibold">{toast.title}</p>
              {toast.description && <p className="text-sm opacity-90">{toast.description}</p>}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) return { toast: null, showToast: () => {} };
  return ctx;
}
