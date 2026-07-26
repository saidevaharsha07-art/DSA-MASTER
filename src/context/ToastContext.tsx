"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from "lucide-react";

export type ToastType = "success" | "info" | "warning" | "error";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  toast: (message: string, type?: ToastType, durationMs?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, type: ToastType = "success", durationMs: number = 3000) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, message, type };
      setToasts((prev) => [...prev.slice(-4), newToast]); // keep max 5

      setTimeout(() => {
        removeToast(id);
      }, durationMs);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Render Container */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          pointerEvents: "none",
          maxWidth: 380,
          width: "100%",
        }}
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const isSuccess = t.type === "success";
            const isWarning = t.type === "warning";
            const isError = t.type === "error";

            const borderHex = isSuccess ? "#10B981" : isWarning ? "#F59E0B" : isError ? "#EF4444" : "var(--primary)";
            const iconColor = borderHex;

            const IconComp = isSuccess ? CheckCircle2 : isWarning ? AlertTriangle : isError ? XCircle : Info;

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                style={{
                  pointerEvents: "auto",
                  padding: "12px 16px",
                  borderRadius: "var(--radius, 12px)",
                  background: "rgba(10, 14, 26, 0.95)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${borderHex}`,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  color: "#FFFFFF",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <IconComp size={18} style={{ color: iconColor, flexShrink: 0 }} />
                  <span>{t.message}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(t.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <X size={14} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
