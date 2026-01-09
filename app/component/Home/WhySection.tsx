import Image from "next/image";
import { FiCheck } from "react-icons/fi";

const WhySection = () => {
  return (
    <section className="bg-white p-8">
      <div className="mx-auto ">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left collage */}
          <div className="relative">
            <div className="relative mx-auto max-w-[520px] rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              {/* base image */}
              <div className="relative overflow-hidden rounded-2xl">
                <div className="relative h-[200px] md:h-[400px] w-full">
                  <Image
                    src="https://i.postimg.cc/dtKgPfCG/3719220.jpg"
                    alt="Why section main"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 520px"
                    priority
                  />
                </div>
              </div>

              {/* overlay left image */}
              <div className="absolute left-36 top-2 w-[70%] h-[60%] overflow-hidden rounded-2xl border border-white/60 bg-white shadow-lg hidden md:block">
                <div className="relative h-full w-full">
                  <Image
                    src="https://i.postimg.cc/2ympw9Fh/male-entrepreneur-using-laptop-while-having-online-meeting-talking-his-colleague-about-business-repo.jpg"
                    alt="Why overlay left"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 60vw, 300px"
                  />
                </div>
              </div>

              {/* overlay bottom image */}
              <div className="absolute left-2 bottom-2 w-[70%] h-[60%] overflow-hidden rounded-2xl border border-white/60 bg-white shadow-lg hidden md:block">
                <div className="relative h-full w-full">
                  <Image
                    src="https://media.istockphoto.com/id/1460981468/photo/smiling-indian-caring-doctor-supporting-holding-hand-of-olde-senior-female-patient-lying-on.jpg?s=612x612&w=0&k=20&c=qZrcUANaJBbDned216IM40I94CqSktxIONW0pbSzTD8="
                    alt="Why overlay bottom"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 240px"
                  />
                </div>
              </div>
              <div className="absolute right-10 bottom-[24%] w-[30%] h-[30%] overflow-hidden rounded-2xl border border-white/60 bg-white shadow-lg hidden md:block">
                <div className="relative h-full w-full">
                  <Image
                    src="https://e7.pngegg.com/pngimages/636/852/png-clipart-gray-and-black-stethoscope-vintage-stethoscope-tools-and-parts-stethoscopes.png"
                    alt="Why overlay bottom"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 240px"
                  />
                </div>
              </div>

              {/* spacing for overlays */}
              <div className="h-20" />
            </div>
          </div>

          {/* Right content */}
          <div>
            <p className="text-sm font-semibold text-blue-600">Why DocTime?</p>

            <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
              Bangladesh&apos;s leading healthcare app for online doctor
              consultation
            </h2>

            <div className="mt-8 space-y-5">
              <Feature
                color="blue"
                text="Access any GP or specialist doctor you need at anytime from anywhere."
              />
              <Feature
                color="green"
                text="Access to online prescriptions, medicine delivery, and diagnostic tests."
              />
              <Feature
                color="purple"
                text="Easy subscription packages to protect you and your loved one’s health and wellbeing."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  text,
  color,
}: {
  text: string;
  color: "blue" | "green" | "purple";
}) => {
  const map = {
    blue: "bg-blue-600",
    green: "bg-emerald-500",
    purple: "bg-violet-500",
  } as const;

  return (
    <div className="flex gap-4">
      <span
        className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${map[color]} text-white`}
      >
        <FiCheck className="text-lg font-bold" size={22} />
      </span>
      <p className="text-base leading-7 text-slate-700">{text}</p>
    </div>
  );
}


export default WhySection