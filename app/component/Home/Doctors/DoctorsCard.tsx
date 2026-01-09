import Image from "next/image";
import { LocationEdit, Star } from "lucide-react";

type DoctorProps = {
  name: string;
  specialty: string;
  experience: string;
  avgRating: number;
  review: number;
  profilePhoto: string;
};

const DoctorCard = (doctors: any) => {
  return (
    <div className="rounded-2xl  bg-white  shadow-sm hover:shadow-md transition">
      <div className="border border-blue-200">
        <Image
          src={doctors?.profilePhoto || "/doctors/default-doctor.png"}
          alt={doctors?.name}
          width={80}
          height={80}
          className=" object-center object-cover w-full h-[350px]"
        />
      </div>
      <div className=" px-3 space-y-2 py-3">
      <div>
         <p className=" text-2xl font-semibold">{doctors?.name}</p>
      </div>
      <div className=" flex gap-2 text-sm">
        <p>{doctors?.qualification}</p>
        <p>{doctors?.designation}</p>
      </div>
      <div className=" flex items-center gap-2">
        <LocationEdit/>
        <p>{doctors?.currentWorkingPlace}</p>
      </div>
      </div>
      <div className=" flex justify-between px-3 py-4">
          <button className=" rounded-sm bg-blue-600 px-7 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Book Now
            </button>
          <button className=" rounded-sm bg-transparent border border-blue-500 px-7 py-3 text-sm font-semibold text-black hover:bg-blue-700 hover:text-white duration-300 transition-all">
              View Profile
          </button>
      </div>
    </div>
  );
};

export default DoctorCard;
