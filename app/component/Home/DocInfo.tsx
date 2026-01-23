import getPatiantData from "@/app/hooks/patiant";
import {
  FiVideo,
  FiActivity,
  FiBriefcase,
  FiSettings,
  FiUsers,
  FiClock,
  FiStar,
  FiDownload,
} from "react-icons/fi";
import ServiceCard from "./Component/DocInfo/ServiceCard";
import StatCard from "./Component/DocInfo/StatCard";
import { getDoctorsData } from "@/app/hooks/doctors";

const DocInfo = async () => {
  const doctorsData = await getDoctorsData();
  const patiantData = await getPatiantData();
  const doctorTotal = doctorsData?.data?.meta?.total;
  const patiantTotal = patiantData?.data?.meta?.total;

  return (
    // কন্টেইনারে সর্বোচ্চ উইথ (max-w-7xl) এবং অটো মার্জিন যোগ করা হয়েছে
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
      
      {/* সার্ভিস সেকশন - গ্রিড লেআউট অপ্টিমাইজেশন */}
      <div className="relative">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ServiceCard
            title="সরাসরি ভিডিও পরামর্শ"
            desc="তাৎক্ষণিক ভিডিও পরামর্শ নিন অথবা আপনার সুবিধামতো অ্যাপয়েন্টমেন্ট বুক করুন"
            icon={<FiVideo className="text-2xl" />}
            accent="blue"
          />
          <ServiceCard
            title="ডায়াগনস্টিক টেস্ট"
            desc="নির্ভরযোগ্য ডায়াগনস্টিক সেন্টারে টেস্ট বুক করুন এবং রিপোর্ট সংগ্রহ করুন"
            icon={<FiActivity className="text-2xl" />}
            accent="amber"
          />
          <ServiceCard
            title="কর্পোরেট হেলথ-কেয়ার"
            desc="চাকরিজীবী এবং তাদের পরিবারের জন্য সম্পূর্ণ স্বাস্থ্যসেবা সমাধান"
            icon={<FiBriefcase className="text-2xl" />}
            accent="indigo"
          />
          <ServiceCard
            title="হেলথ-টেক সলিউশন"
            desc="আমাদের দক্ষ ইঞ্জিনিয়াররা আপনার হেলথ-টেক প্রজেক্ট তৈরিতে সাহায্য করবে"
            icon={<FiSettings className="text-2xl" />}
            accent="slate"
          />
        </div>
      </div>

      {/* স্ট্যাটাস স্ট্রিপ - মোবাইল ফ্রেন্ডলি ফ্লেক্সিবল গ্রিড */}
      <div className="relative overflow-hidden rounded-[24px] md:rounded-[40px] bg-white border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] p-6 sm:p-10 lg:p-14">
        
        {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট - পজিশনিং ঠিক করা হয়েছে */}
        <div className="absolute -top-12 -right-12 h-48 w-48 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -left-12 h-48 w-48 bg-purple-100/40 rounded-full blur-3xl" />

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4 sm:gap-8 items-start">
          <StatCard
            icon={
              <div className="p-3 w-fit rounded-2xl bg-blue-50 text-blue-600 transition-transform hover:scale-110">
                <FiUsers size={24} />
              </div>
            }
            value={doctorTotal || "২০০কে+"}
            label="BMDC ভেরিফাইড ডাক্তার"
          />

          <StatCard
            icon={
              <div className="p-3 w-fit rounded-2xl bg-emerald-50 text-emerald-600 transition-transform hover:scale-110">
                <FiClock size={24} />
              </div>
            }
            value="১০ মিনিট"
            label="গড় অপেক্ষার সময়"
          />

          <StatCard
            icon={
              <div className="p-3 w-fit rounded-2xl bg-purple-50 text-purple-600 transition-transform hover:scale-110">
                <FiUsers size={24} />
              </div>
            }
            value={patiantTotal || "৭০০কে+"}
            label="মানুষের আস্থা"
          />

          <StatCard
            icon={
              <div className="p-3 w-fit rounded-2xl bg-amber-50 text-amber-600 transition-transform hover:scale-110">
                <FiStar size={24} />
              </div>
            }
            value="৯৫%"
            label="৫-স্টার রেটিং"
          />

         
        </div>
      </div>
    </section>
  );
};

export default DocInfo;