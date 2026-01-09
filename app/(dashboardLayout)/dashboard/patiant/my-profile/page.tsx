"use client";
import { useChangePassMutation } from "@/app/redux/api/authApi";
import {
  useGetMeQuery,
  useUpdateMyProfileMutation,
} from "@/app/redux/api/userApi";

import { useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import Loading from "@/app/loading/page";
import { clean, toBool } from "@/app/utils/toBoolean";
import PatiantBasicInfo from "@/app/component/Profile/Patiant/PatiantBasicInfo";
import PatiantHeaderContent from "@/app/component/Profile/Patiant/PatiantHeaderContent";
import ChangePass from "@/app/component/Shared/ChangePass";
import UpdatePatientInfo from "@/app/component/Profile/Patiant/UpdatepatientInfo";
import { useUpdatePatientMutation } from "@/app/redux/api/patiantApi";

const PatientProfile = () => {
  const { data, isLoading } = useGetMeQuery(undefined);
  const patient = data?.data;
  const isDeleted = patient?.isDeleted ?? false;
  const health = patient?.patientHealthData ?? {};
  console.log(patient)
  const reports = patient?.medicalReports ?? [];

  const [changePassword] = useChangePassMutation();
  const [updateMyProfile] = useUpdateMyProfileMutation();
  const [updatePatient, { isLoading: isUpdating }] = useUpdatePatientMutation();

  const [updateProfileOpen, setUpdateProfileOpen] = useState(false);
  const [changePassOpen, setChangePassOpen] = useState(false);

  const statusTone = useMemo(() => {
    if (isDeleted) return "rose";
    if (patient?.status === "ACTIVE") return "emerald";
    return "amber";
  }, [isDeleted, patient?.status]);

  const handleTopChangeImage = async (e: FieldValues) => {
    const image = e?.target?.files?.[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("data", JSON.stringify({}));

    try {
      const res = await updateMyProfile(formData).unwrap();
      if (res?.success) toast.success("Profile image updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update image");
    }
  };

  const handleUpdateAll = async (values: FieldValues) => {
    if (!patient?.id) return toast.error("Patient id not found");

    const patientData = clean({
      name: values?.name,
      contactNumber: values?.contactNumber,
      address: values?.address,
      profilePhoto: values?.profilePhoto,
    });

    const healthData = clean({
      gender: values?.gender,
      dateOfBirth: values?.dateOfBirth,
      bloodGroup: values?.bloodGroup,
      maritalStatus: values?.maritalStatus,
      height: values?.height,
      weight: values?.weight,
      hasAllergies: toBool(values?.hasAllergies),
      hasDiabetes: toBool(values?.hasDiabetes),
      smokingStatus: toBool(values?.smokingStatus),
      hasPastSurgeries: toBool(values?.hasPastSurgeries),
      dietaryPreferences: values?.dietaryPreferences,
      mentalHealthHistory: values?.mentalHealthHistory,
      immunizationStatus: values?.immunizationStatus,
    });

    const reportName = values?.reportName;
    const reportLink = values?.reportLink;

    const hasReportName = !!reportName;
    const hasReportLink = !!reportLink;

    if (
      (hasReportName && !hasReportLink) ||
      (!hasReportName && hasReportLink)
    ) {
      return toast.error(
        "Medical report add করতে reportName এবং reportLink দুইটাই দিন।"
      );
    }

    const payload: Record<string, any> = {
      ...patientData,
      ...(Object.keys(healthData).length > 0
        ? { patientHealthData: healthData }
        : {}),
      ...(hasReportName && hasReportLink
        ? { medicalReport: { reportName, reportLink } }
        : {}),
    };

    if (Object.keys(payload).length === 0) {
      return toast.error("Nothing to update");
    }

    try {
      const res = await updatePatient({ id: patient.id, payload }).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Updated successfully");
        setUpdateProfileOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
      setUpdateProfileOpen(false);
    }
  };

  const handleToChangePass = async (values: FieldValues) => {
    try {
      const res = await changePassword(values).unwrap();
      if (res?.success) toast.success(res?.message || "Password updated");
      setChangePassOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to change password");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!patient) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-6">
          Patient profile not found.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-900 via-indigo-900 to-violet-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-400 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-400 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
          <PatiantHeaderContent
            patient={patient}
            handleTopChangeImage={handleTopChangeImage}
            setChangePassOpen={setChangePassOpen}
            setUpdateProfileOpen={setUpdateProfileOpen}
            tone={statusTone}
          />
        </div>
      </section>
      <section>
        <PatiantBasicInfo health={health} patient={patient} reports={reports} />
      </section>
      <UpdatePatientInfo
        handleUpdateAll={handleUpdateAll}
        patient={patient}
        setUpdateProfileOpen={setUpdateProfileOpen}
        updateProfileOpen={updateProfileOpen}
      />

      <ChangePass
        changePassOpen={changePassOpen}
        setChangePassOpen={setChangePassOpen}
        handleToChangePass={handleToChangePass}
      />
    </main>
  );
};

export default PatientProfile;
