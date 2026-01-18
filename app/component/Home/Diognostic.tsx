import { getDoctorsData } from "@/app/hooks/doctors";
import getPatiantData from "@/app/hooks/patiant";
import Image from "next/image";
import { FiClock, FiFileText, FiUserCheck, FiArrowRight } from "react-icons/fi";

const DiagnosticHero = async() => {
  const doctorsData = await getDoctorsData();
  const patiantData = await getPatiantData();
  const doctorTotal = doctorsData?.data?.meta?.total;
  const patiantTotal = patiantData?.data?.meta?.total;
  return (
    <section className="relative overflow-hidden bg-[#FBFDFF] py-12 md:py-24">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -z-10 h-full w-1/3 bg-blue-50/50 skew-x-[-12deg] transform origin-top-right hidden lg:block" />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-bold text-blue-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600"></span>
              </span>
              হোম ডায়াগনস্টিক সার্ভিস
            </div>

            <h1 className="mt-6 text-4xl font-[900] leading-[1.2] text-slate-900 md:text-6xl tracking-tight">
              এখন আপনার দরজায় <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ল্যাব স্যাম্পল সংগ্রহ
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600 font-medium">
              স্বাস্থ্যসেবা এখন আপনার হাতের মুঠোয়। ঘরে বসেই বুক করুন টেস্ট, আমাদের দক্ষ প্রতিনিধি আপনার বাড়ি বা অফিস থেকে স্যাম্পল সংগ্রহ করবেন।
            </p>

            {/* Feature List */}
            <div className="mt-10 space-y-4">
              {[
                { icon: <FiClock />, text: "দ্রুত এবং সহজ টেস্ট বুকিং প্রক্রিয়া", color: "bg-blue-600" },
                { icon: <FiUserCheck />, text: "সার্টিফাইড প্রফেশনাল দ্বারা স্যাম্পল সংগ্রহ", color: "bg-indigo-600" },
                { icon: <FiFileText />, text: "২৪ ঘণ্টার মধ্যে অ্যাপে ডিজিটাল রিপোর্ট", color: "bg-cyan-500" },
              ].map((item, idx) => (
                <div key={idx} className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md">
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${item.color} text-white shadow-lg shadow-blue-100 transition-transform group-hover:scale-110`}>
                    {item.icon}
                  </div>
                  <p className="text-base font-bold text-slate-700">{item.text}</p>
                </div>
              ))}
            </div>

            <button className="group mt-10 flex items-center gap-3 rounded-2xl bg-slate-950 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200 active:scale-95">
              টেস্ট বুক করুন
              <FiArrowRight className="transition-transform group-hover:translate-x-2" size={22} />
            </button>
          </div>

          {/* Right Visuals */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[480px]">
              {/* Main Image */}
              <div className="relative z-20 overflow-hidden rounded-[3.5rem] border-[12px] border-white bg-white shadow-2xl">
                <Image
                  src="https://media.istockphoto.com/id/1345296778/photo/asian-woman-holding-covid-rapid-test-and-waiting-for-results.jpg?s=612x612&w=0&k=20&c=mG-iFoduA7D4ICDL9OWxdMzcN9r_78pQmEFh1PBmIa4=" 
                  alt="Main Sample Collection"
                  width={600}
                  height={800}
                  className="aspect-[4/5] object-cover"
                />
              </div>

              {/* Floating Card (Small Image) - Animated with Tailwind Class */}
              <div className="absolute -left-10 top-20 z-30 hidden w-44 overflow-hidden rounded-[2rem] border-8 border-white bg-white shadow-2xl md:block animate-[bounce_4s_infinite_ease-in-out]">
                <Image
                  src="https://media.istockphoto.com/id/1334323205/photo/young-woman-drops-swab-in-a-protective-plastic-tube.jpg?s=612x612&w=0&k=20&c=rlu_OhzfkrWrhmpCATCgufFyKXmpRfeeecFjVjYZOJI=" 
                  alt="Test Swab"
                  width={200}
                  height={200}
                  className="aspect-square object-cover"
                />
              </div>

              {/* Patient Trust Card */}
              <div className="absolute -right-8 bottom-12 z-30 rounded-[2rem] bg-white p-5 shadow-2xl border border-blue-50">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-blue-100 overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                      </div>
                    ))}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-[10px] font-bold text-white">
                      +1k
                    </div>
                  </div>
                  <div className="text-center leading-tight">
                    <p className="text-[14px] font-[900] text-slate-800">{patiantTotal || "৫০০০"} + রোগী</p>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">সেবা নিয়েছেন</p>
                  </div>
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute -bottom-10 -left-10 z-10 h-40 w-40 rounded-full bg-blue-400 opacity-20 blur-[80px]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default DiagnosticHero;