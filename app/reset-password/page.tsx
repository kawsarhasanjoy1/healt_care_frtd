"use client";

import React, { useState } from "react";
import { FiLock, FiCheckCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { HiOutlineBolt } from "react-icons/hi2"; // আইকনটি যোগ করা হয়েছে
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import HCForm from "../component/Form/HCForm/HCForm";
import HCInput from "../component/Form/HCInput/HCIput";
import { useResetPasswordMutation } from "../redux/api/authApi";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (values: FieldValues) => {
    if (values.password !== values.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    try {
      await resetPassword({
        id: userId as string,
        token: token as string,
        password: values?.password,
      }).unwrap();

      setIsSubmitted(true);
      toast.success("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!");
    } catch (error: any) {
      toast.error(error?.data?.message || "কিছু একটা সমস্যা হয়েছে");
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-white px-4 py-10">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-2xl border border-emerald-200/70 bg-white px-8 py-10 shadow-sm text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-emerald-50 p-4">
                <FiCheckCircle className="h-10 w-10 text-emerald-500" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              সফল হয়েছে!
            </h2>
            <p className="mt-4 text-slate-600">
              আপনার পাসওয়ার্ড সফলভাবে রিসেট হয়েছে। এখন নতুন পাসওয়ার্ড দিয়ে লগইন করুন।
            </p>
            <Link
              href="/login"
              className="mt-10 block w-full rounded-xl bg-slate-900 py-4 text-sm font-semibold text-white hover:bg-slate-800 transition-all shadow-md"
            >
              লগইন পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
        <div className="w-full rounded-2xl border border-emerald-200/70 bg-white px-8 py-10 shadow-sm">
          {/* Header Section - Same as Forgot Password */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-amber-50">
              <HiOutlineBolt className="h-6 w-6 text-amber-500" />
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              নতুন পাসওয়ার্ড
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              আপনার অ্যাকাউন্টের জন্য একটি শক্তিশালী পাসওয়ার্ড সেট করুন।
            </p>
          </div>

          <HCForm
            onsubmit={handleSubmit}
            defaultValues={{ password: "", confirmPassword: "" }}
          >
            <div className="mt-10 space-y-6">
              {/* New Password Field */}
              <div className="relative">
                <div className="absolute left-3 top-[38px] z-10 text-slate-400">
                  <FiLock size={18} />
                </div>
                <HCInput
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="নতুন পাসওয়ার্ড"
                  placeholder="••••••••"
                  required={true}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] z-10 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <div className="absolute left-3 top-[38px] z-10 text-slate-400">
                  <FiLock size={18} />
                </div>
                <HCInput
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  label="পাসওয়ার্ড নিশ্চিত করুন"
                  placeholder="••••••••"
                  required={true}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[38px] z-10 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 shadow-md transition-all active:scale-[0.98]"
              >
                {isLoading ? "আপডেট হচ্ছে..." : "পাসওয়ার্ড আপডেট করুন"}
              </button>

              <div className="pt-2 text-center">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  ফিরে যান লগইন পেজে
                </Link>
              </div>
            </div>
          </HCForm>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;