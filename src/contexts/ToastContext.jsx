import React, { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(({ title, description, status = "info" }) => {
    setToast({ title, description, status });
    const t = setTimeout(() => setToast(null), status === "error" ? 5000 : 4000);
    return () => clearTimeout(t);
  }, []);

  const value = { toast, showToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast &&
        createPortal(
          <div
            role="alert"
            className={cn(
              "fixed bottom-4 right-4 z-[100] max-w-sm rounded-2xl border-2 px-4 py-3 shadow-hard",
              toast.status === "error" && "border-border bg-destructive text-destructive-foreground",
              toast.status === "success" && "border-border bg-accent text-accent-foreground",
              (toast.status === "info" || !toast.status) && "border-border bg-card text-card-foreground"
            )}
          >
            <p className="font-semibold">{toast.title}</p>
            {toast.description && <p className="text-sm opacity-90">{toast.description}</p>}
          </div>,
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
