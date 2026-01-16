import { TSpecialties } from "@/app/types/global";
import Image from "next/image";
import Link from "next/link";

const SpecialtiesCard = ({ specialties }: { specialties: TSpecialties }) => {
  return (
    <Link
      href={`/doctors?title=${specialties?.title}`}
      key={specialties?.id}
      className="group relative flex h-[120px] w-full max-w-[350px] items-center gap-5 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-[2px] transition-all duration-500 hover:scale-[1.02] hover:shadow-xl md:h-[140px]"
    >
      <div className="flex h-full w-full items-center gap-5 rounded-[2.4rem] bg-white/90 px-6 backdrop-blur-md transition-all group-hover:bg-white/100">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-blue-100 to-indigo-50 shadow-inner md:h-20 md:w-20">
          <Image
            className="h-10 w-10 object-contain transition-transform duration-500 group-hover:scale-110 md:h-12 md:w-12"
            src={specialties?.icon}
            width={60}
            height={60}
            alt={specialties?.title}
          />
          
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/10 transition-all group-hover:border-blue-500/30" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500/60 md:text-xs">
            মেডিক্যাল বিভাগ
          </span>
          <h3 className="text-lg font-black leading-tight text-slate-800 md:text-xl tracking-tight">
            {specialties?.title}
          </h3>
          <p className="mt-1 text-[11px] font-medium text-slate-400">
            বিশেষজ্ঞ ডাক্তার খুঁজুন →
          </p>
        </div>
      </div>
      <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-blue-400 opacity-10 blur-2xl transition-all group-hover:opacity-30" />
    </Link>
  );
};

export default SpecialtiesCard;