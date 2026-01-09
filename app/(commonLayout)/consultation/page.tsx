import AvailableDoctors from "@/app/component/Consultation/AvailableDoctors"
import ConsultSwiper from "@/app/component/Consultation/ConsultSwiper"
import FindSpecialties from "@/app/component/Consultation/FindSpecialties"
import PopulerDoctorsSpecialties from "@/app/component/Consultation/PopulerDoctorSpecialties"



const page = () => {
 return (
    <div className=" space-y-10">
        <ConsultSwiper/>
        <PopulerDoctorsSpecialties/>
        <FindSpecialties/>
        <AvailableDoctors/>
    </div>
 )
}

export default page