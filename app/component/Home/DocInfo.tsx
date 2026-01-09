"use client";

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

const DocInfo = () => {
  return (
    <section className=" space-y-10">
      <div>
        <div className="grid gap-6 md:grid-cols-4">
          <ServiceCard
            title="Live Video Consultation"
            desc="Get instant video consultation or schedule your appointment"
            icon={<FiVideo />}
            accent="blue"
          />
          <ServiceCard
            title="Diagnostic Tests"
            desc="Book tests and get reports with reliable diagnostics"
            icon={<FiActivity />}
            accent="amber"
          />
          <ServiceCard
            title="Corporate Healthcare"
            desc="Complete health & wellbeing solutions for employees and families"
            icon={<FiBriefcase />}
            accent="indigo"
          />
          <ServiceCard
            title="Healthcare IT Services"
            desc="Our expert engineers can help build your health-tech solutions"
            icon={<FiSettings />}
            accent="slate"
          />
        </div>
      </div>

      {/* Stats strip */}
      <div className="mx-auto px-5 py-10 bg-blue-100 opacity-90 rounded-2xl">
        <div className="grid gap-8 md:grid-cols-5">
          <StatItem
            icon={<FiUsers />}
            value="1700+"
            label="BMDC verified doctors"
          />
          <StatItem
            icon={<FiClock />}
            value="10 Minutes"
            label="Average waiting time"
          />
          <StatItem
            icon={<FiUsers />}
            value="700K+"
            label="People have trusted us with their health"
          />
          <StatItem
            icon={<FiStar />}
            value="95%"
            label="Users gave 5 star rating"
          />
          <StatItem
            icon={<FiDownload />}
            value="1+ Million"
            label="App download on Playstore"
          />
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({
  title,
  desc,
  icon,
  accent,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  accent: "blue" | "amber" | "indigo" | "slate";
}) => {
  const accentMap: Record<typeof accent, string> = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
    slate: "text-slate-700 bg-slate-50 border-slate-200",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`grid h-12 w-12 place-items-center rounded-2xl border ${accentMap[accent]} text-xl`}
        >
          {icon}
        </div>

        <div className="h-12 w-12 rounded-2xl bg-slate-100" />
      </div>

      <h3 className="mt-5 text-lg font-extrabold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
    </div>
  );
};

const StatItem = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-2xl text-blue-700 shadow-sm ring-1 ring-slate-200">
        {icon}
      </div>
      <div className="mt-4 text-2xl font-extrabold text-slate-900">{value}</div>
      <div className="mt-2 text-sm leading-6 text-slate-600">{label}</div>
    </div>
  );
};

export default DocInfo;
