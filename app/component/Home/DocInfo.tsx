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
  const doctorsData = await getDoctorsData
  ();
  const patiantData = await getPatiantData();
  const doctorTotal = doctorsData?.data?.meta?.total;
  const patiantTotal = patiantData?.data?.meta?.total;

  return (
    <section className="py-16 space-y-16">
      {/* সার্ভিস সেকশন */}
      <div className="relative">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* স্ট্যাটাস স্ট্রিপ - আধুনিক ও মিনিমালিস্ট ডিজাইন */}
      <div className="relative mt-12 rounded-[32px] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12">
        <div className="relative z-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center">
          <StatCard
            icon={
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
                <FiUsers size={24} />
              </div>
            }
            value={doctorTotal || "২০০কে+"}
            label="BMDC ভেরিফাইড অভিজ্ঞ ডাক্তার"
          />

          <StatCard
            icon={
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                <FiClock size={24} />
              </div>
            }
            value="১০ মিনিট"
            label="গড় অপেক্ষার সময়"
          />

          <StatCard
            icon={
              <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
                <FiUsers size={24} />
              </div>
            }
            value={patiantTotal || "৭০০কে+"}
            label="মানুষের আস্থা ও ভালোবাসা"
          />

          <StatCard
            icon={
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
                <FiStar size={24} />
              </div>
            }
            value="৯৫%"
            label="ইউজারদের ৫-স্টার রেটিং"
          />

          <StatCard
            icon={
              <div className="p-3 rounded-2xl bg-rose-50 text-rose-600">
                <FiDownload size={24} />
              </div>
            }
            value="১+ মিলিয়ন"
            label="প্লে-স্টোর ডাউনলোড"
          />
        </div>

        {/* ডেকোরেটিভ এলিমেন্ট - হালকা গ্লো */}
        <div className="absolute -top-10 -right-10 h-40 w-40 bg-blue-50 rounded-full blur-3xl opacity-50" />
      </div>
    </section>
  );
};

export default DocInfo;
