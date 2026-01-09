"use client";
import { useAppSelector } from "@/app/redux/hooks";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const Header = () => {
  const { user, token } = useAppSelector((store) => store.auth) as any;
  const role = user?.role.toLowerCase()
  return (
    <header className=" bg-gray-100 space-y-6">
      <div className=" flex items-center justify-between max-w-[1420px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 ">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white font-black">
            H
          </div>
          <div className="text-xl font-extrabold text-slate-900">
            Health Care
          </div>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href={"/"}
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-900 bg-white shadow-sm ring-1 ring-slate-200"
          >
            Home
          </Link>
          <Link
            href="/consultation"
            className="text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            Consultation
          </Link>
          <Link
            href="/doctors"
            className="text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            Doctors
          </Link>
          <Link
            href="#"
            className="text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            Health Plans
          </Link>
          <Link
            href="#"
            className="text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            Diagnostic
          </Link>
          <Link
            href="#"
            className="text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            NGOs
          </Link>
          <Link
            href="#"
            className="text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            Blog
          </Link>
          {user && token ? (
            <Link
              href={`/dashboard/${role}`}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900"
            >
              Dashboard
            </Link>
          ) : (
            ""
          )}
        </nav>

        {/* CTA */}
        <button className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
          Contact Us
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15">
            <FiArrowUpRight />
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
