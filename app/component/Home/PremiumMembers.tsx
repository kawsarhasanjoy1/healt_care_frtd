import Image from "next/image";
import Link from "next/link";
import { FiCheckCircle, FiArrowUpRight } from "react-icons/fi";

export default function PremiumMemberSection() {
  const benefits = [
    "২৪/৭ ভিডিও কল আনলিমিটেড কনসাল্টেশন",
    "পুরো পরিবারের জন্য হেলথ কভারেজ",
    "ল্যাব টেস্টে বিশেষ ডিসকাউন্ট এবং অফার",
    "জরুরী প্রয়োজনে অগ্রাধিকার সাপোর্ট"
  ];

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-white">
      {/* Background Glow */}
      <div className="absolute -top-24 right-0 h-[500px] w-[500px] rounded-full bg-blue-50/60 blur-[100px]" />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* Left: Interactive Image Block */}
          <div className="relative group">
            {/* Decorative Frame */}
            <div className="absolute -inset-4 rounded-[2.5rem] border-2 border-dashed border-blue-200/60 transition-transform group-hover:rotate-2" />
            
            <div className="relative z-10 overflow-hidden rounded-[2rem] bg-slate-100 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="https://t4.ftcdn.net/jpg/03/35/19/11/360_F_335191170_VmOUxKtYmYpK5BjLhtniayhH2E13n3J9.jpg"
                  alt="Healthy Family"
                  fill
                  className="object-cover transition-scale duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 p-4 backdrop-blur-md shadow-lg border border-white/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600">মেম্বারশিপ সুবিধা</p>
                    <p className="text-lg font-black text-slate-900">এক ক্লিকেই বিশেষজ্ঞ ডাক্তার</p>
                  </div>
                  <Link href={'/doctors'} className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <FiArrowUpRight size={24} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Premium Text Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-lg bg-blue-600/10 px-3 py-1 text-sm font-extrabold text-blue-600 uppercase tracking-tighter">
              প্রিমিয়াম মেম্বারশিপ
            </div>

            <h2 className="mt-6 text-4xl font-[900] leading-[1.1] text-slate-900 md:text-5xl lg:text-6xl tracking-tight">
              আপনার ও আপনার পরিবারের <br />
              <span className="text-blue-600">নিরাপদ ভবিষ্যতের নিশ্চয়তা</span>
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-slate-600 font-medium">
              দেশের শীর্ষস্থানীয় ডিজিটাল হেলথকেয়ার অ্যাপে যুক্ত হয়ে নিন সেরা সব স্বাস্থ্যসেবা। ২৪/৭ ডাক্তারের পরামর্শ থেকে শুরু করে সাশ্রয়ী হেলথ প্যাকেজ—সবই এখন আপনার হাতের মুঠোয়।
            </p>

            {/* Benefits List */}
            <div className="mt-10 space-y-4">
              {benefits.map((text, idx) => (
                <div key={idx} className="flex items-center gap-3 transition-all hover:translate-x-2">
                  <FiCheckCircle className="text-blue-600 shrink-0" size={22} />
                  <span className="text-base font-bold text-slate-800">{text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
              <button className="w-full sm:w-auto rounded-2xl bg-slate-950 px-10 py-5 text-lg font-bold text-white transition-all hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-200 active:scale-95">
                সবগুলো প্যাকেজ দেখুন
              </button>
              
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-blue-100 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-bold text-slate-500 underline decoration-blue-200">১ম মাসে ১০০০+ সাবস্ক্রিপশন</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}