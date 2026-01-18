"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/app/redux/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, token } = useAppSelector((store) => store.auth) as any;
  const role = user?.role?.toLowerCase();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Consultation", href: "/consultation" },
    { name: "Doctors", href: "/doctors" },
    { name: "Health Plans", href: "/health-plans" },
    { name: "Diagnostic", href: "/diagnostic" },
    { name: "NGOs", href: "/ngos" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1420px] items-center justify-between px-4 py-4 md:px-8">
        
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 font-black text-white shadow-lg shadow-indigo-200">
            H
          </div>
          <div className="text-xl font-extrabold tracking-tight text-slate-900">
            Health<span className="text-indigo-600">Care</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          {user && token && (
            <Link
              href={`/dashboard/${role}`}
              className="ml-2 rounded-full border border-indigo-200 px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden sm:inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95">
            Contact Us
            <FiArrowUpRight className="text-lg" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 lg:hidden"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-[73px] z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-[73px] z-50 h-[calc(100vh-73px)] w-full max-w-sm border-l border-slate-200 bg-white p-6 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-transparent p-4 text-base font-bold text-slate-700 hover:border-indigo-100 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    {link.name}
                    <FiArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
                
                {user && token ? (
                  <Link
                    href={`/dashboard/${role}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between rounded-xl bg-indigo-600 p-4 text-base font-bold text-white"
                  >
                    My Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-slate-900 p-4 text-base font-bold text-white"
                  >
                    Login / Register
                  </Link>
                )}
                
                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 p-4 font-bold text-slate-900 hover:bg-slate-50">
                  Contact Support
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;