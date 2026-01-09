"use client";
import { useChangePassMutation } from "@/app/redux/api/authApi";
import { useGetMeQuery } from "@/app/redux/api/userApi";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import UpdateDoctor from "./components/UpdateDoctor";
import { DoctorProfile } from "./components/DoctorInfo";
import DoctorInfo from "./components/DoctorInfo";
import { useGetSpecialtiesQuery } from "@/app/redux/api/specialtiesApi";
import ChangePass from "@/app/component/Shared/ChangePass";

const DoctorProfilePage = () => {
  const { data } = useGetMeQuery(undefined);

  const doctor: DoctorProfile =
    (data?.data?.doctor as DoctorProfile) ?? (data?.data as DoctorProfile);
    console.log(doctor)
  const {data: specialtiesData} = useGetSpecialtiesQuery({limit: 50})
  const specialties = (specialtiesData?.data?.data)
  const [changePassword] = useChangePassMutation();
  const [editOpen, setEditOpen] = useState(false);
  const [changePassOpen, setChangePassOpen] = useState(false);

  const handleToChangePass = async (values: FieldValues) => {
    try {
      const res = await changePassword(values).unwrap();
      if (res?.success) toast.success(res?.message ?? "Password updated");
      else toast.error(res?.message ?? "Failed to update password");
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to update password");
    }
    setChangePassOpen(false);
  };



  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50">
      <DoctorInfo
        doctor={doctor}
        setChangePassOpen={setChangePassOpen}
        setEditOpen={setEditOpen}
      />
     {/* update doctor model  */}
      <UpdateDoctor
        specialties={specialties}
        setEditOpen={setEditOpen}
        editOpen={editOpen}
        doctor={doctor}
      />
      {/* Change Password Modal */}
      <ChangePass
        setChangePassOpen={setChangePassOpen}
        changePassOpen={changePassOpen}
        handleToChangePass={handleToChangePass}
      />
    </main>
  );
};

export default DoctorProfilePage;
