import Image from "next/image";

export default function PremiumMemberSection() {
  return (
    <section className="pb-14 mt-14">
      <div className="mx-auto  px-4">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left image */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="https://t4.ftcdn.net/jpg/03/35/19/11/360_F_335191170_VmOUxKtYmYpK5BjLhtniayhH2E13n3J9.jpg" // change
                alt="family"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right text */}
          <div>
            <p className="text-lg font-semibold text-blue-600">Become a Premium Member</p>

            <h2 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              A secure future for you <br className="hidden md:block" />
              and your family
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-slate-600">
              DocTime is the leading digital healthcare app in the country. DocTime is committed
              to bringing modern healthcare to people along with 24/7 doctor video consultation.
              Choose your favorite packages based on your needs. Anyone can enjoy this service
              by paying a one-time annual subscription fee.
            </p>

            <button className="mt-8 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              View All Packages
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
