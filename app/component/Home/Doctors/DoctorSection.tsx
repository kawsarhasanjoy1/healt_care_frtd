import Image from "next/image";
import { FaLinkedinIn, FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";

type Doctor = {
  name: string;
  role: string;
  img: string;
  featured?: boolean;
};

const doctors: Doctor[] = [
  { name: "Martin", role: "Strategic & finance", img: "/doctors/1.png" },
  { name: "Max Delly", role: "Strategic & finance", img: "/doctors/2.png" },
  { name: "Shelly", role: "Strategic & finance", img: "/doctors/3.png", featured: true },
  { name: "Kullok Dash", role: "Strategic & finance", img: "/doctors/4.png" },
  { name: "Sarah", role: "Strategic & finance", img: "/doctors/5.png" },
];

export default function DoctorsSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-5">
        {/* Top heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-500">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            Meet expert doctors for better care.
          </div>

          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Let’s Meet With <br className="hidden md:block" />
            Expert Doctors
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Let’s meet with expert doctors who are ready to provide
            trusted care, accurate guidance,
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid items-end gap-6 md:grid-cols-5">
          {doctors.map((d) =>
            d.featured ? <FeaturedDoctorCard key={d.name} d={d} /> : <DoctorCard key={d.name} d={d} />
          )}
        </div>
      </div>
    </section>
  );
}

function DoctorCard({ d }: { d: Doctor }) {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-3xl bg-slate-100 p-6">
        <div className="relative mx-auto h-52 w-full">
          <Image
            src={d.img}
            alt={d.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 20vw"
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="text-2xl font-extrabold text-slate-900">{d.name}</div>
        <div className="mt-1 text-sm text-slate-500">{d.role}</div>

        <div className="mt-4 flex items-center gap-3">
          <SocialIcon><FaLinkedinIn /></SocialIcon>
          <SocialIcon><FaInstagram /></SocialIcon>
          <SocialIcon><FaXTwitter /></SocialIcon>
          <SocialIcon><FaFacebookF /></SocialIcon>
        </div>
      </div>
    </div>
  );
}

function FeaturedDoctorCard({ d }: { d: Doctor }) {
  return (
    <div className="md:translate-y-0">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-sky-400 to-indigo-500 p-6 shadow-[0_18px_50px_rgba(59,130,246,.25)]">
        <div className="relative mx-auto h-60 w-full">
          <Image
            src={d.img}
            alt={d.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 20vw"
          />
        </div>

        {/* Bottom info panel like screenshot */}
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-center text-xl font-extrabold text-slate-900">{d.name}</div>
          <div className="mt-1 text-center text-sm text-slate-500">{d.role}</div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <SocialIcon active><FaLinkedinIn /></SocialIcon>
            <SocialIcon><FaInstagram /></SocialIcon>
            <SocialIcon><FaXTwitter /></SocialIcon>
            <SocialIcon><FaFacebookF /></SocialIcon>
          </div>
        </div>

        {/* Blue underline base like screenshot */}
        <div className="pointer-events-none absolute -bottom-2 left-1/2 h-2 w-40 -translate-x-1/2 rounded-full bg-indigo-600/70" />
      </div>
    </div>
  );
}

function SocialIcon({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={[
        "grid h-9 w-9 place-items-center rounded-full border text-sm transition",
        active
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
      ].join(" ")}
    >
      {children}
    </span>
  );
}
