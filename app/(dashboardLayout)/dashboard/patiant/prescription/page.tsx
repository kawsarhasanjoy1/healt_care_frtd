'use client'
import PrescriptionView from "@/app/component/Prescription/Prescription";
import Loading from "@/app/loading/page";
import { useGetPrescriptionQuery } from "@/app/redux/api/prescriptionApi";

const page = () => {
  
const {data, isLoading} = useGetPrescriptionQuery(undefined)
if (isLoading) {
  return <Loading/>
}
const prescription =(data?.data)
  return (
    <div>
      {
        prescription?.map((item: any,idx:number) => <PrescriptionView key={idx} data={item} />)
      }
    </div>
  );
};


export default page