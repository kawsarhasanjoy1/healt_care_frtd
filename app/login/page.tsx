"use client";
import { FiMail, FiKey, FiEye } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import HCForm from "../component/Form/HCForm/HCForm";
import HCInput from "../component/Form/HCInput/HCIput";
import Link from "next/link";
import { useLoginMutation } from "../redux/api/authApi";
import toast from "react-hot-toast";
import { useAppDispatch } from "../redux/hooks";
import { handleLoginSuccess } from "../utils/handleToLogin";
import { useState } from "react";
import { useRouter } from "next/navigation";
import verifyToken from "../utils/verifyToken";
import Cookies from 'js-cookie'
import { authKey } from "../constance/authKey";


const defaultLoginValue = {
  email: "",
  password: "kawsar12",
};

const LoginPage = () => {
  const router = useRouter();

  const [togglePass, setTogglePass] = useState(false);
  const dispatch = useAppDispatch();
  const [authLogin, { data, error,isLoading }] = useLoginMutation();
  const handleToLogin = async (e: any) => {
    try {
      const res = await authLogin(e).unwrap();
      const token = res.data.accessToken;
      if (res.success) {
        const users = verifyToken(token) as any;
        handleLoginSuccess(dispatch, token) as any;
        Cookies.set(authKey,token)
        toast.success(res?.message);
        const role = users?.role?.toLowerCase();
        router.push(`/dashboard/${role}`);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="fixed left-7 top-6 z-10 flex items-center gap-2 select-none">
        <div className="relative h-5 w-5">
          <span className="absolute left-0 top-1/2 h-2 w-5 -translate-y-1/2 rounded bg-rose-400" />
          <span className="absolute left-1/2 top-0 h-5 w-2 -translate-x-1/2 rounded bg-rose-400" />
        </div>
        <span className="text-sm font-extrabold tracking-wide text-teal-800">
          Health Care
        </span>
      </div>

      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-[1.2fr_1fr]">
        <section className="flex items-center justify-center">
          <Image
            src={"https://i.postimg.cc/kn8VqM13/3719220.jpg"}
            priority={true}
            width={600}
            height={600}
            alt=""
          />
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_16px_40px_rgba(8,20,26,.08)] space-y-3">
            <div className="mb-4 flex  gap-3 items-center justify-start">
              <div className="relative mt-0.5 h-9 w-9">
                <span className="absolute left-0 top-1/2 h-3 w-9 -translate-y-1/2 rounded-md bg-rose-400" />
                <span className="absolute left-1/2 top-0 h-9 w-3 -translate-x-1/2 rounded-md bg-rose-400" />
              </div>
              <div className=" font-bold text-xl">Health Care</div>
            </div>

            <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
              Welcome Back Health Care !
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Lets get you Logged in
            </p>

            <HCForm onsubmit={handleToLogin} defaultValues={defaultLoginValue}>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput
                  name="email"
                  placeholder="health@care.gmail.com"
                  type="email"
                />
              </div>
              <div className="relative">
                <FiKey className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput
                  name="password"
                  placeholder="••••••••••••••••"
                  type={togglePass ? "text" : "password"}
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setTogglePass(!togglePass)}
                >
                  <FiEye />
                </button>
              </div>
              <div className=" flex justify-end">
                <Link className=" hover:underline font-bold text-sm" href={'/forgot-password'}>Forgot Password</Link>
              </div>
              <button
              disabled={isLoading}
                type="submit"
                className="h-11 w-full rounded-md bg-teal-500 text-sm font-semibold text-white hover:bg-teal-600 active:bg-teal-700"
              >
                {isLoading ? "Submiting..." : "Login"}
              </button>

              <p className="pt-2 text-center text-xs text-slate-400">
                Alternative Login Options
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className="flex h-11 items-center justify-center gap-2 rounded-md border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <FcGoogle size={18} />
                  Login with Google
                </button>

                <button
                  type="button"
                  className="flex h-11 items-center justify-center gap-2 rounded-md border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <FaXTwitter size={16} />
                  Login with Twitter
                </button>
              </div>

              <div className="flex gap-2 justify-center items-center">
                Do your want to create account ?
                <Link href="/register" className=" text-teal-600 duration-200">
                  Registration
                </Link>
              </div>
            </HCForm>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
