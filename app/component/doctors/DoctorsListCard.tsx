"use client";
import { TDoctors } from "@/app/types/global";
import Image from "next/image";
import Link from "next/link";
import { FcRating } from "react-icons/fc";
import { MdVideoCall } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useAppSelector } from "@/app/redux/hooks";

const DoctorsListCard = ({ doctors }: { doctors: TDoctors[] }) => {
  const {user} = useAppSelector((state) => state.auth)
  console.log(user)
  return (
    <div>
      <div className="bg-white py-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {doctors?.map((doctor) => (
          <div
            key={doctor.id}
            className="h-full bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition p-5 space-y-5 max-w-[500px]"
          >
            {/* Top */}
            <div className="flex gap-4">
              <div className="relative h-[180px] w-[160px] shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={doctor.profilePhoto || "/doctor-placeholder.png"}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 w-full bg-white/80 text-center text-sm font-semibold py-1 flex justify-center items-center gap-2">
                  <FcRating size={22} />
                  {doctor.averageRating ?? "N/A"}
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <p className="text-lg font-semibold">{doctor.name}</p>
                <p className="text-sm text-gray-600">{doctor.qualification}</p>

                <p className="text-sm font-semibold bg-blue-500 text-white w-fit px-3 py-1 rounded-tl-full rounded-br-full">
                  {doctor?.doctorSpecialties?.[0]?.specialties?.title ||
                    "Unknown"}
                </p>

                <div>
                  <p className="text-sm font-semibold">Working Place</p>
                  <p className="text-sm">{doctor.currentWorkingPlace}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold">Experience</p>
                  <p className="text-sm">{doctor.experience}+ Years</p>
                </div>
              </div>
            </div>

            <div className=" flex justify-between">
              <span className="text-sm font-bold">Per Consult</span>
              <p className="text-lg font-bold">৳{doctor.appoinmentFee}</p>
            </div>
            <div className="flex items-center justify-between border-t pt-4 bg-gray-100 py-4 px-2 rounded-md">
              <Link
                href={`/doctors/${doctor.id}`}
                className="flex text-sm font-bold border border-blue-500 hover:bg-blue-600 items-center gap-2  text-white md:px-3 px-1 py-2 rounded-md bg-blue-500  transition"
              >
                <CgProfile size={24} />
                Doctor Profile
              </Link>
              <button >
                <Link
                  href={`/checkout/${doctor.id}`}
                  className="flex text-sm font-bold items-center gap-2 border border-blue-500 text-blue-500 md:px-3 px-1 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
                >
                  <MdVideoCall size={24} />
                  See Doctor Now
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsListCard;
