import Image from "next/image";
import { MapPin } from "lucide-react"; // LocationEdit এর বদলে MapPin বেশি মানানসই
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { MdVideoCall } from "react-icons/md";
import { doctorPhoto } from "@/app/constance/constance";

const DoctorCard = (doctors: any) => {
  // স্পেশালিটি আছে কিনা চেক করার লজিক
  const hasSpecialties = doctors?.doctorSpecialties && doctors?.doctorSpecialties?.length > 0;

  return (
    <div className="group overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* ইমেজের অংশ */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <Image
          src={
            doctors?.profilePhoto ||
            doctorPhoto
          }
          alt={doctors?.name}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        {/* যদি স্পেশালিটি না থাকে তবে একটি ছোট ব্যাজ */}
        {!hasSpecialties && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
            বর্তমানে বুকিং বন্ধ
          </div>
        )}
      </div>

      {/* তথ্যের অংশ */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800 leading-tight">{doctors?.name}</h3>
          <p className="text-indigo-600 text-xs font-bold uppercase tracking-wider mt-1">
            {doctors?.designation}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-[13px] text-slate-500 font-medium">
          <span className="bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
            {doctors?.qualification}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <MapPin size={16} className="text-slate-400" />
          <p className="text-sm truncate font-medium">{doctors?.currentWorkingPlace}</p>
        </div>
      </div>

      {/* বাটন সেকশন */}
      <div className="flex items-center justify-between gap-3 px-5 pb-6">
        {hasSpecialties ? (
          <Link
            href={`/checkout/${doctors?.id}`}
            className="flex-1 flex gap-2 justify-center items-center rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
          >
            <MdVideoCall size={20} /> বুক করুন
          </Link>
        ) : (
          <button
            disabled
            className="flex-1 flex gap-2 justify-center items-center rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-400 cursor-not-allowed"
          >
            বুকিং বন্ধ
          </button>
        )}

        <Link
          href={`/doctors/${doctors?.id}`}
          className="flex-1 flex gap-2 justify-center items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-95"
        >
          <CgProfile size={20} /> প্রোফাইল
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;