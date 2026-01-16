"use client";

import Loading from "@/app/loading/page";
import { FiInbox } from "react-icons/fi"; // একটি আইকন লাইব্রেরি ব্যবহার করলে ভালো দেখায়

type Props<T> = {
  column: any;
  data?: T[];
  isLoading?: boolean;
  emptyText?: string;
  title?: string;
};

export default function ReusibleTable<T>({
  column,
  data = [],
  isLoading = false,
  emptyText = "কোনো তথ্য খুঁজে পাওয়া যায়নি।",
  title = "তথ্য তালিকা",
}: Props<T>) {
  const colSpan = column?.length;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/40">
      <div className="flex items-center justify-between border-b border-slate-100 bg-white/50 px-6 py-5">
        <div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            সর্বমোট {data?.length} টি রেকর্ড পাওয়া গেছে
          </p>
        </div>
        {isLoading && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold animate-pulse">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            আপডেট হচ্ছে...
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-50/50">
              {column?.map((col: any, idx: number) => (
                <th
                  key={col.key ?? idx}
                  className={`border-b border-slate-100 px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-500 ${
                    col.className || ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
              <tr>
                <td colSpan={colSpan} className="px-5 py-20">
                  <Loading />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="px-5 py-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-4 rounded-full bg-slate-50 p-4">
                      <FiInbox className="h-8 w-8 text-slate-300" />
                    </div>
                    <h4 className="text-base font-bold text-slate-700">
                      খালি তালিকা
                    </h4>
                    <p className="mt-1 text-sm text-slate-400">{emptyText}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row: any, index: number) => (
                <tr
                  key={index}
                  className="group relative transition-all duration-300 hover:bg-indigo-50/30"
                >
                  {column.map((col: any, cIdx: number) => {
                    const content =
                      col?.render?.(row) ??
                      col?.accessor?.(row) ??
                      (row as any)?.[col.key];

                    return (
                      <td
                        key={col.key ?? cIdx}
                        className="relative px-6 py-4.5 align-middle text-sm text-slate-600 transition-all group-hover:text-slate-900"
                      >
                        {/* Hover Indicator Line */}
                        {cIdx === 0 && (
                          <div className="absolute left-0 top-0 h-full w-1 bg-indigo-500 scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
                        )}

                        <div className="flex items-center gap-2">
                          <div className="truncate font-medium">
                            {content ?? (
                              <span className="text-slate-300 italic">
                                প্রযোজ্য নয়
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
