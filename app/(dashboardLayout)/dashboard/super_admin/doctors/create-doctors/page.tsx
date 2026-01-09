"use client";

import HCForm from "@/app/component/Form/HCForm/HCForm";
import HCInput from "@/app/component/Form/HCInput/HCIput";
import HCImageUploader from "@/app/component/Form/HCInput/HCUpload";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiKey,
  FiArrowLeft,
  FiMapPin,
  FiHash,
  FiBriefcase,
  FiAward,
  FiDollarSign,
  FiBookOpen,
} from "react-icons/fi";
import { useCreateDoctorsMutation } from "@/app/redux/api/doctorsApi";
import HCSelect from "@/app/component/Form/HCInput/HCSelect";

const defaultDoctorValue = {
  name: "",
  email: "",
  password: "",
  contactNumber: "",
  profilePhoto: "",
  address: "",
  registrationNumber: "",
  experience: 0,
  gender: "",
  appoinmentFee: "",
  qualification: "",
  currentWorkingPlace: "",
  designation: "",
};

const genderOptions = [
  { label: "MALE", value: "MALE" },
  { label: "FEMALE", value: "FEMALE" }
];

const CreateDoctor = () => {
  const [createDoctor, { isLoading }] = useCreateDoctorsMutation();

  const handleCreateDoctor = async (data: any) => {
    const image = data?.profilePhoto?.[0];

    const payload = {
      password: data?.password,
      doctor: {
        name: data?.name,
        email: data?.email,
        contactNumber: data?.contactNumber,
        profilePhoto: "", 
        address: data?.address || null,
        registrationNumber: data?.registrationNumber,
        experience: Number(data?.experience || 0),
        gender: data?.gender, 
        appoinmentFee: String(data?.appoinmentFee || ""),
        qualification: data?.qualification,
        currentWorkingPlace: data?.currentWorkingPlace,
        designation: data?.designation,
      },
    };
    console.log(payload)

    const formData = new FormData();
    if (image) formData.append("file", image);
    formData.append("data", JSON.stringify(payload));

    try {
      const res = await createDoctor(formData).unwrap();
      if (res?.success) toast.success(res?.message || "Doctor created successfully");
      else toast.error(res?.message || "Failed to create doctor");
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50 p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 font-medium text-indigo-700">
              Dashboard
            </span>
            <span>/</span>
            <span className="font-medium text-slate-700">Create Doctor</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            Create Doctor Account
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Add a new doctor with credentials and profile information.
          </p>
        </div>

        <Link
          href="#"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-sm">
              <span className="text-lg font-semibold">D</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Doctor Details</h2>
              <p className="text-sm text-slate-500">
                Fill out the required fields to create a doctor.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <HCForm onsubmit={handleCreateDoctor} defaultValues={defaultDoctorValue}>
            <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
              <div className="relative">
                <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput name="name" placeholder="Full Name" type="text" />
              </div>

              <div className="relative">
                <FiPhone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput name="contactNumber" placeholder="Contact Number" type="text" />
              </div>

              <div className="relative md:col-span-2">
                <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput name="email" type="email" placeholder="doctor@healthcare.com" />
              </div>

              <div className="relative md:col-span-2">
                <FiKey className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput name="password" type="password" placeholder="Create Password" />
              </div>

              <div className="relative">
                <FiHash className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput
                  name="registrationNumber"
                  type="text"
                  placeholder="Registration Number (e.g. BMDC-1234)"
                />
              </div>

              <div className="relative">
                <FiBriefcase className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput name="experience" type="number" placeholder="Experience (years)" />
              </div>

              <div className="md:col-span-1">
                <HCSelect name="gender" options={genderOptions} placeholder="Select Gender" />
              </div>

              <div className="relative md:col-span-1">
                <FiDollarSign className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput name="appoinmentFee" type="text" placeholder="Appointment Fee" />
              </div>

              <div className="relative md:col-span-2">
                <FiAward className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput name="designation" type="text" placeholder="Designation" />
              </div>

              <div className="relative md:col-span-2">
                <FiBriefcase className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput
                  name="currentWorkingPlace"
                  type="text"
                  placeholder="Current Working Place"
                />
              </div>

              <div className="relative md:col-span-2">
                <FiBookOpen className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput name="qualification" type="text" placeholder="Qualification" />
              </div>

              <div className="relative md:col-span-2">
                <FiMapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput name="address" type="text" placeholder="Address (optional)" />
              </div>

              <div className="md:col-span-2">
                <div className="mb-2 text-sm font-semibold text-slate-700">
                  Profile Photo (optional)
                </div>
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
                  <HCImageUploader name="profilePhoto" className="h-32" />
                  <p className="mt-2 text-xs text-slate-500">
                    Recommended: square image, max 2MB.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>

           
            </div>
          </HCForm>
        </div>
      </section>
    </main>
  );
}

export default CreateDoctor