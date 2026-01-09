"use client";

import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

type Props = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  heightClassName?: string; // NEW: height control
};

const ReusableModal = ({
  open,
  title,
  onClose,
  children,
  className = "",
  heightClassName = "h-[80vh]", // default fixed height
}: Props) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={[
          "relative w-full rounded-2xl bg-white shadow-xl",
          className || "max-w-lg",
          heightClassName,            // FIXED HEIGHT here
          "overflow-hidden",          // prevent outer scroll
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-4">
          <h3 className="text-base font-bold text-slate-900">{title ?? ""}</h3>

          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl text-slate-600 hover:bg-slate-100"
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        {/* Content area scroll */}
        <div className="h-[calc(80vh-64px)] overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;