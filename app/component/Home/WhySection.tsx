import Image from "next/image";
import { FiCheck } from "react-icons/fi";
import FeatureItem from "./Component/WhySection/FeatureItem";

const WhySection = () => {
  return (
    <section className="relative overflow-hidden bg-[#f8fafc] py-20 px-6 lg:px-16">
      <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-blue-50/50 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="relative group">
            <div className="relative z-10 overflow-hidden rounded-[40px] border-8 border-white shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <Image
                src="https://i.postimg.cc/dtKgPfCG/3719220.jpg"
                alt="Main Doctor"
                width={600}
                height={700}
                className="h-[500px] w-full object-cover"
              />
            </div>

            <div className="absolute -right-8 top-12 z-20 hidden md:block w-56 animate-bounce duration-[4000ms]">
              <div className="rounded-2xl border border-white/50 bg-white/80 p-4 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <FiCheck size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      ১০০% ভেরিফাইড
                    </p>
                    <p className="text-[10px] text-slate-500">
                      বিশেষজ্ঞ চিকিৎসক
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-10 bottom-10 z-20 hidden md:block w-64 transition-transform hover:-translate-y-2">
              <div className="rounded-2xl border border-white/50 bg-white/90 p-5 shadow-2xl backdrop-blur-md">
                <p className="text-sm font-bold text-slate-800 italic">
                  "সেরা মানের সেবা"
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-900">
                      সাফওয়ান চৌধুরী
                    </p>
                    <p className="text-[9px] text-slate-500">সন্তুষ্ট রোগী</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute right-0 bottom-0 z-10 h-48 w-48 overflow-hidden rounded-3xl border-4 border-white shadow-xl hidden lg:block">
              <Image
                src="https://i.postimg.cc/2ympw9Fh/male-entrepreneur-using-laptop-while-having-online-meeting-talking-his-colleague-about-business-repo.jpg"
                alt="Consultation"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:pl-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              কেন আমাদের বেছে নেবেন?
            </div>

            <h2 className="mt-6 text-4xl font-black leading-[1.3] text-slate-900 md:text-5xl">
              অনলাইন ডাক্তার পরামর্শের জন্য <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                দেশের সেরা হেলথ অ্যাপ
              </span>
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              আমরা আপনাকে দিচ্ছি ঘরে বসেই দেশের সেরা বিশেষজ্ঞ ডাক্তারদের সাথে
              কথা বলার নিশ্চয়তা। আপনার সুস্বাস্থ্যই আমাদের মূল লক্ষ্য।
            </p>

            <div className="mt-10 space-y-6">
              <FeatureItem
                color="blue"
                title="যেকোনো সময়, যেকোনো স্থান থেকে"
                desc="আপনার প্রয়োজন অনুযায়ী সাধারণ বা বিশেষজ্ঞ ডাক্তারদের সেবা নিন ২৪/৭।"
              />
              <FeatureItem
                color="green"
                title="ডিজিটাল প্রেসক্রিপশন ও ঔষধ ডেলিভারি"
                desc="অনলাইন প্রেসক্রিপশন পান এবং দ্রুত ঔষধ ও ল্যাব টেস্টের সুবিধা উপভোগ করুন।"
              />
              <FeatureItem
                color="purple"
                title="সাশ্রয়ী হেলথ প্যাকেজ"
                desc="আপনার ও পরিবারের সুরক্ষায় রয়েছে আমাদের বিশেষ সাবস্ক্রিপশন প্ল্যান।"
              />
            </div>

            <button className="mt-12 rounded-full bg-slate-900 px-10 py-4 text-sm font-bold text-white transition-all hover:bg-blue-600 hover:shadow-xl active:scale-95">
              আরও বিস্তারিত জানুন
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
