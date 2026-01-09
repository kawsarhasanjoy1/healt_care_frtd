"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FiArrowLeft, FiEdit, FiX } from "react-icons/fi";
import PrescriptionForm from "../Prescription/PrescriptionForm";
import { useGetMyAppoinmentQuery } from "@/app/redux/api/appointmentApi";
import { useAppSelector } from "@/app/redux/hooks";

const AgoraUIKit = dynamic(() => import("agora-react-uikit"), { ssr: false });

const VideoCallPage = () => {
  const router = useRouter();
  const videoCallId = useSearchParams().get('videoCallId');
  const { data } = useGetMyAppoinmentQuery({videoCallingId: videoCallId});
  const { user } = useAppSelector((store) => store.auth);
  const appoinmentData = data?.data?.data;
  const [videoCall, setVideoCall] = useState(true);
  const [showPrescription, setShowPrescription] = useState(false);
  const [hasDevices, setHasDevices] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.mediaDevices) {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const hasCam = devices.some((d) => d.kind === "videoinput");
          const hasMic = devices.some((d) => d.kind === "audioinput");
          setHasDevices(hasCam && hasMic);
        })
        .catch(() => setHasDevices(false));
    }
  }, []);

  const rtcProps = {
    appId: process.env.NEXT_PUBLIC_AGORA_APP_ID || "YOUR_APP_ID",
    channel: videoCallId as string,
    token: null,
  };

  const callbacks = {
    EndCall: () => {
      setVideoCall(false);
      router.back();
    },
  };

  if (hasDevices === null)
    return (
      <div className="h-screen bg-slate-900 flex items-center justify-center text-white">
        Checking hardware...
      </div>
    );

  if (hasDevices === false) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-white p-6 text-center">
        <div className="max-w-md bg-slate-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Device Not Found
          </h2>
          <p className="text-slate-300 mb-6">
            ক্যামেরা বা মাইক্রোফোন পাওয়া যায়নি। দয়া করে নিশ্চিত করুন আপনার
            ডিভাইস কানেক্ট করা আছে এবং ব্রাউজারে পারমিশন দেওয়া হয়েছে।
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg transition"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col bg-slate-950 overflow-hidden font-sans">
      {user?.role === "DOCTOR" ? (
        <header className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 text-white z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition"
            >
              <FiArrowLeft size={20} />{" "}
              <span className="hidden sm:inline">Leave</span>
            </button>
            <div className="h-6 w-[1px] bg-slate-700"></div>
            <div className="text-sm font-medium">
              Room: <span className="text-indigo-400">{videoCallId}</span>
            </div>
          </div>

          <button
            onClick={() => setShowPrescription(!showPrescription)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg ${
              showPrescription
                ? "bg-rose-500 hover:bg-rose-600 text-white"
                : "bg-emerald-500 hover:bg-emerald-600 text-white"
            }`}
          >
            {showPrescription ? <FiX /> : <FiEdit />}
            {showPrescription ? "Close Form" : "Write Prescription"}
          </button>
        </header>
      ) : (
        ""
      )}

      <main className="relative flex flex-1 overflow-hidden">
        {/* Video Side */}
        <div
          className={`transition-all duration-500 ease-in-out relative bg-black ${
            showPrescription ? "w-full lg:w-2/3 xl:w-3/4" : "w-full"
          }`}
        >
          {videoCall ? (
            <div className="h-full w-full">
              <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-white">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Call Ended</h2>
                <button
                  onClick={() => setVideoCall(true)}
                  className="bg-indigo-600 px-8 py-3 rounded-xl font-bold"
                >
                  Rejoin Call
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Prescription Sidebar */}
        <aside
          className={`absolute right-0 top-0 h-full bg-white transition-all duration-500 ease-in-out z-30 shadow-2xl border-l border-slate-200 
          ${
            showPrescription
              ? "w-full md:w-1/2 lg:w-1/3 xl:w-1/4 translate-x-0"
              : "w-0 translate-x-full"
          }`}
        >
          {showPrescription && (
            <div className="flex flex-col h-full overflow-y-auto p-6">
              <PrescriptionForm appointmentId={appoinmentData?.[0]?.id as string} />
            </div>
          )}
        </aside>
      </main>
    </div>
  );
};

export default VideoCallPage;
