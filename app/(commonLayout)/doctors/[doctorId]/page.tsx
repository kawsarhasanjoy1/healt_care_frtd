import DetailsBottom from "@/app/component/doctors/DetailsPage/DetailsBottom";
import DetailsHeaders from "@/app/component/doctors/DetailsPage/DetailsHeader";
import { getDoctorData } from "@/app/hooks/doctors";
import { notFound } from "next/navigation";

const DoctorDetailsPage = async ({ params }: { params: Promise<{ doctorId: string }> }) => {
  const { doctorId } = await params;
  const res = await getDoctorData(doctorId);
  const doctorData = res?.data;

  if (!doctorData) {
    return notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
       <DetailsHeaders doctorData={doctorData} />
       <DetailsBottom doctorData={doctorData} />
    </div>
  );
};

export default DoctorDetailsPage;