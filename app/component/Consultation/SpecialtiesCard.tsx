import { TSpecialties } from "@/app/types/global";
import Image from "next/image";

const SpecialtiesCard = ({ specialties }: { specialties: TSpecialties }) => {
  return (
    <div
      key={specialties?.id}
      className=" border h-[170px] w-[170px] md:w-[200px] md:h-[200px] flex flex-col justify-center items-center rounded-xl border-gray-200 shadow-sm hover:border-blue-500 duration-150"
    >
      <div>
        <Image
          className=" h-[70px] w-full"
          src={specialties?.icon}
          width={100}
          height={100}
          alt={specialties?.title}
        />
      </div>
      <p>{specialties?.title}</p>
    </div>
  );
};


export default SpecialtiesCard