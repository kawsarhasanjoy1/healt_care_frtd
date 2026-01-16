"use client";

import HCForm from "@/app/component/Form/HCForm/HCForm";
import HCInput from "@/app/component/Form/HCInput/HCIput";
import HCMultiSelect from "@/app/component/Form/HCInput/HCMultiSelect";
import ReusableModal from "@/app/component/Reusible/Model/ReusibleModel";
import { useUpDoctorsMutation } from "@/app/redux/api/doctorsApi";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
const UpdateDoctor = ({ specialties, setEditOpen, editOpen, doctor }: any) => {
  const [UpDoctors] = useUpDoctorsMutation();

  const lockedOptions: any[] =
    doctor?.doctorSpecialties
      ?.map((ds: any) => ({
        label: ds?.specialties?.title ?? ds?.title ?? "",
        value: ds?.specialtiesId ?? ds?.specialties?.id,
      }))
      .filter((o: any) => o.value && o.label) ?? [];

  const lockedIds = lockedOptions.map((o) => o.value);

  const allOptions: any[] =
    specialties?.map((item: any) => ({
      label: item?.title,
      value: item?.id,
    })) ?? [];

  const availableOptions = allOptions.filter(
    (opt) => !lockedIds.includes(opt.value)
  );

  const handleUpdate = async (values: FieldValues) => {
    try {
      const selectedIds: string[] = Array.isArray(values.specialties)
        ? values.specialties
        : [];

      const newSpecialtiesIds = selectedIds.filter(
        (id) => !lockedIds.includes(id)
      );

      const payload = {
        ...values,
        specialties: newSpecialtiesIds,
      };

      const res = await UpDoctors({ id: doctor?.id, values: payload }).unwrap();
      console.log(res);

      toast.success("Doctor updated");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message ?? "Update failed");
    }
  };

  return (
    <>
      {editOpen ? (
        <ReusableModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          title="Update doctor profile"
          className="w-full max-w-5xl"
        >
          <div className="p-1">
            <HCForm
              key={doctor?.id}
              onsubmit={handleUpdate}
              defaultValues={{
                name: doctor?.name ?? "",
                contactNumber: doctor?.contactNumber ?? "",
                address: doctor?.address ?? "",
                experience:
                  typeof doctor?.experience === "number"
                    ? String(doctor.experience)
                    : doctor?.experience ?? "0",
                gender: doctor?.gender ?? "",
                appoinmentFee: doctor?.appoinmentFee ?? "",
                qualification: doctor?.qualification ?? "",
                currentWorkingPlace: doctor?.currentWorkingPlace ?? "",
                designation: doctor?.designation ?? "",
                specialties: lockedIds,
              }}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-700">
                    Name
                  </p>
                  <HCInput name="name" type="text" placeholder="Enter name" />
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-700">
                    Contact Number
                  </p>
                  <HCInput
                    name="contactNumber"
                    type="text"
                    placeholder="Enter contact number"
                  />
                </div>

                <div className="md:col-span-2">
                  <p className="mb-2 text-sm font-semibold text-slate-700">
                    Address
                  </p>
                  <HCInput
                    name="address"
                    type="text"
                    placeholder="Enter address"
                  />
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-700">
                    Experience (years)
                  </p>
                  <HCInput name="experience" type="number" placeholder="0" />
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-700">
                    Gender
                  </p>
                  <HCInput
                    name="gender"
                    type="text"
                    placeholder="MALE/FEMALE"
                  />
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-700">
                    Appointment Fee
                  </p>
                  <HCInput
                    name="appoinmentFee"
                    type="text"
                    placeholder="e.g. 500"
                  />
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-700">
                    Designation
                  </p>
                  <HCInput
                    name="designation"
                    type="text"
                    placeholder="e.g. Consultant"
                  />
                </div>

                <div className="md:col-span-2">
                  <p className="mb-2 text-sm font-semibold text-slate-700">
                    Qualification
                  </p>
                  <HCInput
                    name="qualification"
                    type="text"
                    placeholder="e.g. MBBS, FCPS"
                  />
                </div>

                <div className="md:col-span-2">
                  <p className="mb-2 text-sm font-semibold text-slate-700">
                    Current Working Place
                  </p>
                  <HCInput
                    name="currentWorkingPlace"
                    type="text"
                    placeholder="Hospital/Clinic"
                  />
                </div>
              </div>

              <div className="mt-4 w-full">
                <p className="mb-2 text-sm font-semibold text-slate-700">
                  Specialties
                </p>

                <HCMultiSelect
                  className=""
                  name="specialties"
                  options={availableOptions}
                  lockedOptions={lockedOptions}
                  lockedIds={lockedIds}
                />
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white hover:from-indigo-700 hover:to-violet-700 disabled:opacity-70"
                >
                  Update
                </button>
              </div>
            </HCForm>
          </div>
        </ReusableModal>
      ) : null}
    </>
  );
};

export default UpdateDoctor;
