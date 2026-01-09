"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  FiCheck,
  FiX,
  FiAlertTriangle,
  FiMail,
  FiHome,
  FiRefreshCw,
} from "react-icons/fi";

type Variant = "success" | "failed" | "cancel";

type Props = {
  variant: Variant;
  title: string;
  subtitle: string;
  amount?: string;
  transactionId?: string;
  method?: string;
  date?: string;
  merchant?: string;
  email?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export default function PaymentResultCard({
  variant,
  title,
  subtitle,
  amount = "$0.00",
  transactionId = "TXN-—",
  method = "—",
  date = new Date().toLocaleDateString(),
  merchant = "HealthCare",
  email = "—",
  primaryCta = { label: "Go to Dashboard", href: "/dashboard" },
  secondaryCta = { label: "Back to Home", href: "/" },
}: Props) {
  const ui = useMemo(() => {
    if (variant === "success") {
      return {
        ring: "bg-emerald-50",
        iconBg: "bg-emerald-100",
        iconBorder: "border-emerald-200",
        icon: <FiCheck className="h-6 w-6 text-emerald-700" />,
        title: "text-emerald-700",
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    }
    if (variant === "failed") {
      return {
        ring: "bg-rose-50",
        iconBg: "bg-rose-100",
        iconBorder: "border-rose-200",
        icon: <FiX className="h-6 w-6 text-rose-700" />,
        title: "text-rose-700",
        badge: "bg-rose-50 text-rose-700 border-rose-200",
      };
    }
    return {
      ring: "bg-amber-50",
      iconBg: "bg-amber-100",
      iconBorder: "border-amber-200",
      icon: <FiAlertTriangle className="h-6 w-6 text-amber-700" />,
      title: "text-amber-700",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
    };
  }, [variant]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto flex max-w-2xl items-center justify-center">
        <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-8 sm:p-10">
            <div className="flex flex-col items-center text-center">
              <div className={`grid h-16 w-16 place-items-center rounded-full ${ui.ring}`}>
                <div
                  className={`grid h-12 w-12 place-items-center rounded-full border ${ui.iconBg} ${ui.iconBorder}`}
                >
                  {ui.icon}
                </div>
              </div>

              <h1 className={`mt-5 text-3xl font-extrabold tracking-tight ${ui.title}`}>
                {title}
              </h1>
              <p className="mt-2 max-w-lg text-sm text-slate-600">{subtitle}</p>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <p className="text-sm font-semibold text-slate-600">Amount</p>
                <p className="text-lg font-extrabold text-slate-900">{amount}</p>
              </div>

              <div className="space-y-0">
                <Row label="Transaction ID">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${ui.badge}`}>
                    {transactionId}
                  </span>
                </Row>
                <Row label="Payment Method">{method}</Row>
                <Row label="Date">{date}</Row>
                <Row label="Merchant">{merchant}</Row>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-indigo-50 px-4 py-3 text-sm text-slate-700">
              <FiMail className="h-4 w-4 text-slate-600" />
              <span className="truncate">Receipt sent to {email}</span>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                href={primaryCta.href}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                {variant === "failed" ? (
                  <span className="inline-flex items-center gap-2">
                    <FiRefreshCw className="h-4 w-4" /> {primaryCta.label}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <FiHome className="h-4 w-4" /> {primaryCta.label}
                  </span>
                )}
              </Link>

              <Link
                href={secondaryCta.href}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <p className="text-sm font-semibold text-slate-600">{label}</p>
      <div className="text-sm font-semibold text-slate-900">{children}</div>
    </div>
  );
}