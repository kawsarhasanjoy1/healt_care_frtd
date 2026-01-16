import SpecialtiesCard from "@/app/component/Consultation/SpecialtiesCard";
import { TSpecialties } from "@/app/types/global";


const page = async() => {
  const res = await fetch(`https://healthcareserver-two.vercel.app/api/v1/specialties?limit=${100}`, {
    next: {revalidate: 20}
  })
  const data = await res.json()
  const specialties = (data?.data?.data)
  return (
    <div>
      <div className=" flex justify-between items-center text-black mb-6">
        <p className="text-4xl font-semibold">Choose a Department </p>
        <button className="flex items-center gap-2 text-3xl font-medium">
          Specialties
        </button>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-4 justify-items-center md:justify-items-start  gap-5  md:gap-10">
        {
            specialties?.map((item: TSpecialties) => <SpecialtiesCard key={item?.id} specialties={item}/>)
    }
      </div>
    </div>
  );
};


export default page