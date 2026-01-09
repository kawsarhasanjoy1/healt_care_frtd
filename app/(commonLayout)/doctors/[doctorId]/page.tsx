"use client";
import DetailsBottom from "@/app/component/doctors/DetailsPage/DetailsBottom";
import DetailsHeaders from "@/app/component/doctors/DetailsPage/DetailsHeader";
import Loading from "@/app/loading/page";
import { useGetDoctorQuery } from "@/app/redux/api/doctorsApi";
import { useParams } from "next/navigation";
import { use } from "react";

const DoctorDetailsPage = () => {
  const params = useParams();
  const resolvedParams: any = use(params as any);
  const { doctorId } = resolvedParams;
  const { data, isLoading } = useGetDoctorQuery(doctorId);
  const doctorData = data?.data;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <DetailsHeaders doctorData={doctorData} />
      <DetailsBottom doctorData={doctorData} />
    </div>
  );
};

export default DoctorDetailsPage;
