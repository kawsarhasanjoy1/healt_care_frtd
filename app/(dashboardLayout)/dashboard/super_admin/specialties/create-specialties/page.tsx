"use client";

import HCForm from "@/app/component/Form/HCForm/HCForm";
import HCInput from "@/app/component/Form/HCInput/HCIput";
import HCImageUploader from "@/app/component/Form/HCInput/HCUpload";
import { useCreateSpecialtyMutation } from "@/app/redux/api/specialtiesApi"; 
import Link from "next/link";
import toast from "react-hot-toast";
import { FiArrowLeft, FiTag, FiImage } from "react-icons/fi";
import { MdDescription } from "react-icons/md";

const defaultSpecialtyValue = {
  title: "",
  description: "",
  icon: "",
};

const CreateSpecialtyPage = () => {
  const [createSpecialty, { isLoading }] = useCreateSpecialtyMutation();

  const handleCreateSpecialty = async (data: any) => {
    const iconFile = data?.icon?.[0];
    const payload = {
      title: data?.title,
      description: data?.description
    };

    const formData = new FormData();
    if (iconFile) formData.append("file", iconFile); 
    formData.append("data", JSON.stringify(payload));

    try {
      const res = await createSpecialty(formData).unwrap();
      if (res?.success) toast.success(res?.message || "Specialty created successfully");
      else toast.error(res?.message || "Failed to create specialty");
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
            <span className="font-medium text-slate-700">Create Specialty</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            Create Specialty
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Add a new specialty with title and icon.
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
              <FiTag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Specialty Details</h2>
              <p className="text-sm text-slate-500">Title এবং icon দিয়ে specialty create করো।</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <HCForm onsubmit={handleCreateSpecialty} defaultValues={defaultSpecialtyValue}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative md:col-span-2">
                <FiTag className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput name="title" placeholder="Specialty Title (e.g. Cardiology)" type="text" />
              </div>
              <div className="relative md:col-span-2">
                <MdDescription className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput name="description" placeholder="Enter description" type="text" />
              </div>

              <div className="md:col-span-2">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <FiImage className="h-4 w-4 text-slate-500" />
                  Icon (required)
                </div>

                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 overflow-hidden">
                  <HCImageUploader name="icon" className="h-32 w-full" />
                  <p className="mt-2 text-xs text-slate-500">
                    Recommended: square icon, max 2MB.
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

              <button
                type="submit"
                disabled={isLoading}
                className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Creating..." : "Create Specialty"}
              </button>
            </div>
          </HCForm>
        </div>
      </section>
    </main>
  );
}

export default CreateSpecialtyPage