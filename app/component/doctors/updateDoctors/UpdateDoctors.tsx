"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";
import HCForm from "../../Form/HCForm/HCForm";
import ReusableModal from "../../Reusible/Model/ReusibleModel";
import HCInput from "../../Form/HCInput/HCIput";
import HCSelect from "../../Form/HCInput/HCSelect";
import HCTimeInput from "../../Form/TimePicker/TimePicker";
import {
  useGetDoctorQuery,
  useUpDoctorsMutation,
} from "@/app/redux/api/doctorsApi";
import toast from "react-hot-toast";

type Gender = "MALE" | "FEMALE" | "OTHER"; // আপনার Prisma enum অনুযায়ী change করবেন

type DoctorFormValues = {
  name: string;
  email: string;
  contactNumber: string;
  profilePhoto: string;
  address?: string;
  registrationNumber: string;
  experience: number;
  gender: Gender;
  appoinmentFee: string;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted?: boolean;
};

type TUPDoctors = {
  onClose: (open: boolean) => void;
  open: boolean;
  id: string;
};

const emptyValues: DoctorFormValues = {
  name: "",
  email: "",
  contactNumber: "",
  profilePhoto: "",
  address: "",
  registrationNumber: "",
  experience: 0,
  gender: "MALE",
  appoinmentFee: "",
  qualification: "",
  currentWorkingPlace: "",
  designation: "",
  isDeleted: false,
};

const UpDoctors = ({ onClose, open, id }: TUPDoctors) => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [initial, setInitial] = useState<DoctorFormValues | null>(null);
  const [error, setError] = useState<string>("");
  const { data, isFetching } = useGetDoctorQuery(id, { skip: !open || !id });
  const [updateDoctors] = useUpDoctorsMutation();
  const doc = data?.data;
  const doctorDefaultsValues = useMemo(() => {
    return {
      name: doc?.name ?? "",
      email: doc?.email ?? "",
      contactNumber: doc?.contactNumber ?? "",
      registrationNumber: doc?.registrationNumber ?? "",
      experience: Number(doc?.experience ?? 0),
      gender: (doc?.gender ?? "") as Gender,
      appoinmentFee: doc?.appoinmentFee ?? "",
      qualification: doc?.qualification ?? "",
      currentWorkingPlace: doc?.currentWorkingPlace ?? "",
      designation: doc?.designation ?? "",
      address: doc?.address ?? "",
      isDeleted: Boolean(doc?.isDeleted ?? false),
    };
  }, [doc]);

  if (isFetching) {
    return "Loading...";
  }
  const handleToSubmit = async (values: FieldValues) => {
    try {
      const res = await updateDoctors({ id, values }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  const genderOptions = [
    { label: "MALE", value: "MALE" },
    { label: "FEMALE", value: "FEMALE" },
  ];
  return (
    <ReusableModal
      onClose={() => onClose(false)}
      open={open}
      title="Update doctor"
    >
      {loading ? (
        <div className="p-4 text-sm text-slate-600">Loading...</div>
      ) : (
        <div className="space-y-3 p-1">
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <HCForm
            onsubmit={handleToSubmit}
            defaultValues={doctorDefaultsValues}
            key={`${id}-${open}`}
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <HCInput name="name" type="text" placeholder="Doctor name" />

              <HCInput name="email" type="email" placeholder="Email" disabled />

              <HCInput
                name="contactNumber"
                type="tel"
                placeholder="01XXXXXXXXX"
              />
              <HCInput
                name="registrationNumber"
                type="text"
                placeholder="BMDC/..."
              />
              <HCInput name="experience" type="text" placeholder="Experience" />
              <HCSelect
                defaultValue="MALE"
                name="gender"
                options={genderOptions}
              />
              <HCInput name="appoinmentFee" type="text" placeholder="500" />
              <HCInput
                name="qualification"
                type="text"
                placeholder="MBBS, FCPS..."
              />

              <HCInput
                name="currentWorkingPlace"
                type="text"
                placeholder="Hospital/Clinic name"
              />

              <HCInput
                name="designation"
                type="text"
                placeholder="Consultant..."
              />
            </div>

            <div className="mt-3">
              <HCInput
                name="address"
                placeholder="Address (optional)"
                type="text"
              />
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm"
                disabled={submitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? "Updating..." : "Update"}
              </button>
            </div>
          </HCForm>
        </div>
      )}
    </ReusableModal>
  );
};

export default UpDoctors;
