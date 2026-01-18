"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "../redux/api/authApi";
import { HiOutlineBolt } from "react-icons/hi2";
import { FiMail } from "react-icons/fi";
import toast from "react-hot-toast";

type FormValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: { email: "" },
    mode: "onSubmit",
  });

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await forgotPassword(values).unwrap();
      if (res.success) {
        toast.success('পাসওয়ার্ড রিসেট লিঙ্ক আপনার ইমেইলে পাঠানো হয়েছে');
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'কিছু একটা সমস্যা হয়েছে');
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
        <div className="w-full rounded-2xl border border-emerald-200/70 bg-white px-8 py-10 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-amber-50">
              <HiOutlineBolt className="h-6 w-6 text-amber-500" />
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              পাসওয়ার্ড ভুলে গেছেন?
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              আপনার ইমেইল এড্রেসটি দিন, আমরা আপনাকে পাসওয়ার্ড রিসেট করার একটি লিঙ্ক পাঠাবো।
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                ইমেইল এড্রেস
              </label>

              <div className="mt-2 flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 focus-within:ring-4 focus-within:ring-slate-100">
                <FiMail className="h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="আপনার ইমেইল লিখুন"
                  className="h-full w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  {...register("email", {
                    required: "ইমেইল দিতেই হবে",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "সঠিক ইমেইল এড্রেস লিখুন",
                    },
                  })}
                />
              </div>

              {formState.errors.email?.message ? (
                <p className="mt-2 text-sm font-medium text-rose-600">
                  {formState.errors.email.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 transition-all"
            >
              {isLoading ? "পাঠানো হচ্ছে..." : "পাসওয়ার্ড রিসেট করুন"}
            </button>

            <div className="pt-2 text-center">
              <Link
                href="/login"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                লগইন পেজে ফিরে যান
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}