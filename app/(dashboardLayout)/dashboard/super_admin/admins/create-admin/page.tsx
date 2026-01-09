"use client";

import HCForm from "@/app/component/Form/HCForm/HCForm";
import HCInput from "@/app/component/Form/HCInput/HCIput";
import HCImageUploader from "@/app/component/Form/HCInput/HCUpload";
import { useCreateAdminMutation } from "@/app/redux/api/adminApi";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiPhone, FiKey, FiArrowLeft } from "react-icons/fi";

const defaultAdminValue = {
  name: "",
  email: "",
  password: "",
  contactNumber: "",
  profilePhoto: "",
};

const CreateAdmin = () => {
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const handleCreateAdmin = async (data: any) => {
    const image = data?.profilePhoto?.[0];
    console.log(data);
    const userData = {
      password: data?.password,
      admin: {
        name: data?.name,
        email: data?.email,
        contactNumber: data?.contactNumber,
      },
    };

    const formData = new FormData();
    if (image) formData.append("file", image);
    formData.append("data", JSON.stringify(userData));

    try {
      const res = await createAdmin(formData).unwrap();
      if (res?.success)
        toast.success(res?.message || "Admin created successfully");
      else toast.error(res?.message || "Failed to create admin");
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
            <span className="font-medium text-slate-700">Create Admin</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            Create Admin Account
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Add a new admin with login credentials and profile information.
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

      <div className="">
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-sm">
                <span className="text-lg font-semibold">A</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Admin Details
                </h2>
                <p className="text-sm text-slate-500">
                  Fill out the required fields to create an admin.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5">
            <HCForm
              onsubmit={handleCreateAdmin}
              defaultValues={defaultAdminValue}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative">
                  <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <HCInput name="name" placeholder="Full Name" type="text" />
                </div>

                <div className="relative">
                  <FiPhone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <HCInput
                    name="contactNumber"
                    placeholder="Contact Number"
                    type="text"
                  />
                </div>

                <div className="relative md:col-span-2">
                  <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <HCInput
                    name="email"
                    type="email"
                    placeholder="admin@healthcare.com"
                  />
                </div>

                <div className="relative md:col-span-2">
                  <FiKey className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <HCInput
                    name="password"
                    type="password"
                    placeholder="Create Password"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="mb-2 text-sm font-semibold text-slate-700">
                    Profile Photo (optional)
                  </div>
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
                    <HCImageUploader name="profilePhoto" className=" h-32" />
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? "Creating..." : "Create Admin"}
                </button>
              </div>
            </HCForm>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CreateAdmin;
