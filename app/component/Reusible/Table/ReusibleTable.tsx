"use client";

import Loading from "@/app/loading/page";

type Props<T> = {
  column: any;
  data?: T[];
  isLoading?: boolean;
  emptyText?: string;
};

export default function ReusibleTable<T>({
  column,
  data = [],
  isLoading = false,
  emptyText = "No data found.",
}: Props<T>) {
  const colSpan = column?.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-4">
        <div className="text-sm font-semibold text-slate-800">List</div>
        <div className="text-xs text-slate-500">
          {isLoading ? "Loading..." : `${data?.length} item(s)`}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-bold uppercase tracking-wider text-slate-600">
              {column?.map((col: any, idx: number) => (
                <th
                  key={col.key ?? idx}
                  className={`sticky top-0 z-10 border-b border-slate-200 bg-slate-50/95 px-5 py-3.5 backdrop-blur ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={colSpan} className="px-5 py-12">
                 <Loading/>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="px-5 py-14 text-center">
                  <div className="mx-auto max-w-sm">
                    <div className="text-base font-semibold text-slate-800">Nothing here</div>
                    <div className="mt-1 text-sm text-slate-500">{emptyText}</div>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row: any, index: number) => (
                <tr
                  key={index}
                  className="group border-b border-slate-100 transition-colors odd:bg-white even:bg-slate-50/40 hover:bg-indigo-50/40"
                >
                  {column.map((col: any, cIdx: number) => {
                    const content =
                      col?.render?.(row) ??
                      col?.accessor?.(row) ??
                      (row as any)?.[col.key];

                    return (
                      <td
                        key={col.key ?? cIdx}
                        className="py-3.5 align-middle text-slate-700"
                      >
                        <div className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-transparent group-hover:bg-indigo-500" />
                          <div className="min-w-0 truncate">
                            {content ?? <span className="text-slate-400">—</span>}
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

    
      <div className="h-1 bg-gradient-to-r from-indigo-500/20 via-violet-500/10 to-transparent" />
    </div>
  );
}