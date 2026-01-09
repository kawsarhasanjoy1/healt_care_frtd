import Image from "next/image";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { FiArrowUpRight, FiPlay } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="mt-6">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-indigo-600 via-blue-500 to-sky-400 px-7 py-10 md:px-10 md:py-14">
        {/* Content grid */}
        <div className="grid items-center gap-10 md:grid-cols-[1.05fr_.95fr]">
          {/* Left */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20">●</span>
              Your health, your choice
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">
              Secure Your Doctor Visit <br className="hidden md:block" />
              Anytime, Anywhere
            </h1>

            <p className="mt-4 max-w-lg text-sm/6 text-white/85">
              Easily schedule a medical consultation with your preferred doctor
              at a time that suits you best.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 hover:bg-white/90">
                Contact Us
                <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-white">
                  <FiArrowUpRight />
                </span>
              </button>

              <button className="grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/25 hover:bg-white/20">
                <FiPlay />
              </button>
            </div>

            {/* Bottom mini cards */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <MiniCard>
                <div className="text-[16px] font-bold text-slate-900">
                  Latest visited doctors
                </div>
                <div className="mt-3 flex -space-x-2">
                  <Avatar />
                  <Avatar />
                  <Avatar />
                </div>
                <div className="mt-3 text-[14px] text-slate-600">
                  More than 5k doctors <br /> at your services
                </div>
              </MiniCard>

              <MiniCard>
                <div className="flex items-center justify-between">
                  <div className="text-[16px] font-bold text-slate-900">
                    Video consult
                  </div>
                  <span className="text-[14px] font-semibold text-slate-500">
                    Live
                  </span>
                </div>

                <div className="mt-3 grid h-16 place-items-center rounded-xl bg-slate-100 text-xs font-semibold text-slate-500">
                  Doctor preview
                </div>

                <div className="mt-3 flex items-center justify-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500 text-white text-xs font-black">
                   <AiOutlineCheck />
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-rose-500 text-white text-xs font-black">
                    <AiOutlineClose />
                  </span>
                </div>
              </MiniCard>

              <MiniCard>
                <div className="text-[16px] font-bold text-slate-900">
                  Statistical
                </div>
                <div className="mt-3 grid h-16 place-items-center rounded-xl bg-slate-100">
                  <div className="text-lg font-extrabold text-slate-900">96%</div>
                </div>
                <div className="mt-3 text-[14px] text-slate-600">
                  Successful Diagnosis
                </div>
              </MiniCard>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex items-end justify-center">
            {/* Badge */}
            <div className="absolute right-2 top-4 md:right-6 md:top-6">
              <div className="rounded-full bg-white/20 px-4 py-3 text-white ring-1 ring-white/25 backdrop-blur">
                <div className="text-center text-sm font-extrabold">100k+</div>
                <div className="text-center text-[11px] text-white/80">
                  Satisfied patients
                </div>
              </div>
            </div>

            {/* Doctor image */}
            <div className="relative h-[600px] w-full">
              <Image
                src="https://i.postimg.cc/pXqRLxRj/young-doctor-getting-ready-work-removebg-preview.png"
                alt="Doctor"
                fill
                priority
                className="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,.25)]"
              />
            </div>
          </div>
        </div>

        {/* Soft highlights */}
        {/* <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/15 blur-2xl" /> */}
      </div>
    </section>
  );
}


function MiniCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      {children}
    </div>
  );
}

function Avatar() {
  return (
    <div className="h-9 w-9 rounded-full bg-slate-200 ring-2 ring-white" />
  );
}

export default Hero