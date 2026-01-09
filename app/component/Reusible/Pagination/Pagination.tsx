"use client";

import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Props = {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  className?: string;
};

const Pagination = ({
  page,
  total,
  limit,
  onPageChange,
  disabled = false,
  className = "",
}: Props) => {
  const safeLimit = Math.max(1, Number(limit) || 1);
  const totalPages = Math.max(1, Math.ceil((Number(total) || 0) / safeLimit));

  const current = Math.min(Math.max(1, Number(page) || 1), totalPages);

  const makePages = () => {
    
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [1];

    if (current > 3) pages.push("...");

    const start = Math.max(2, current - 1);
    const end = Math.min(totalPages - 1, current + 1);

    for (let p = start; p <= end; p++) pages.push(p);

    if (current < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    // remove duplicates
    return pages.filter((v, i, arr) => arr.indexOf(v) === i);
  };

  const pages = makePages();

  const canPrev = current > 1;
  const canNext = current < totalPages;

  return (
    <div className={className}>
      <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 shadow-sm ring-1 ring-slate-200">
        <button
          type="button"
          disabled={disabled || !canPrev}
          onClick={() => onPageChange(current - 1)}
          className="grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiChevronLeft size={22} />
        </button>

        <div className="flex items-center gap-2">
          {pages.map((p, idx) =>
            p === "..." ? (
              <span key={`dots-${idx}`} className="px-2 text-slate-400">
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                disabled={disabled}
                onClick={() => onPageChange(p)}
                className={[
                  "grid h-10 w-10 place-items-center rounded-full text-sm font-semibold transition",
                  p === current
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-600 hover:bg-white hover:shadow-sm",
                  disabled ? "cursor-not-allowed opacity-70" : "",
                ].join(" ")}
              >
                {p}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          disabled={disabled || !canNext}
          onClick={() => onPageChange(current + 1)}
          className="grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FiChevronRight size={22} />
        </button>
      </div>

      {/* Optional info (remove if you want) */}
      <div className="mt-2 text-center text-xs text-slate-500">
        Page {current} of {totalPages}
      </div>
    </div>
  );
}


export default Pagination