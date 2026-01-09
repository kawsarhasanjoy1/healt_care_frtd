import Image from "next/image";
import { FiClock, FiFileText, FiUserCheck } from "react-icons/fi";

const DiagnosticHero = () => {
  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto  px-4">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left */}
          <div>
            <p className="text-lg font-semibold text-blue-600">
              Home Diagnostic Service
            </p>

            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              Sample collection{" "}
              <span className="font-black">at your Doorstep</span>
            </h1>

            <p className="mt-4 max-w-xl text-slate-600">
              Making healthcare easily accessible anytime, anywhere.
            </p>

            <ul className="mt-7 space-y-4">
              <li className="flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <FiClock className="text-lg" />
                </span>
                <p className="text-sm font-medium text-slate-700">
                  Faster and convenient tests booking
                </p>
              </li>

              <li className="flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <FiUserCheck className="text-lg" />
                </span>
                <p className="text-sm font-medium text-slate-700">
                  Certified professionals will collect sample from home/office
                </p>
              </li>

              <li className="flex items-center gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <FiFileText className="text-lg" />
                </span>
                <p className="text-sm font-medium text-slate-700">
                  Get report at DocTime app within 24 hours
                </p>
              </li>
            </ul>

            <button className="mt-8 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Book Test
            </button>
          </div>

      
          <div className="relative mx-auto w-full max-w-md">
 
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white shadow-sm">
              <Image
                src="https://media.istockphoto.com/id/1345296778/photo/asian-woman-holding-covid-rapid-test-and-waiting-for-results.jpg?s=612x612&w=0&k=20&c=mG-iFoduA7D4ICDL9OWxdMzcN9r_78pQmEFh1PBmIa4=" 
                alt="hero"
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm">
                <Image
                  src="https://media.istockphoto.com/id/1334323205/photo/young-woman-drops-swab-in-a-protective-plastic-tube.jpg?s=612x612&w=0&k=20&c=rlu_OhzfkrWrhmpCATCgufFyKXmpRfeeecFjVjYZOJI=" 
                  alt="hero2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm">
                <Image
                  src="https://media.istockphoto.com/id/1326428197/photo/doctor-making-covid-19-pcr-test-for-male-patient-at-home-viral-disease-prevention-and.jpg?s=612x612&w=0&k=20&c=H3pMiRh7Fh8SvkMoqc1ITyjTUYFerJpwKQ4VuAtEB8A="
                  alt="hero3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* little overlap card (optional like screenshot) */}
            <div className="absolute bottom-16 left-1/2 w-44 -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-md md:w-48">
              <div className="relative aspect-[3/4]">
                <Image
                  src="https://media.istockphoto.com/id/1201417258/photo/im-experiencing-headaches-so-my-blood-pressure-might-be-high.jpg?s=612x612&w=0&k=20&c=mVqu2G2r4y3ZzBSgl1_gWTD3ruTKEFJeooXkeiTFHGc=" // change
                  alt="phone"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default DiagnosticHero