"use client";
import HCForm from "@/app/component/Form/HCForm/HCForm";
import HCInput from "@/app/component/Form/HCInput/HCIput";
import HCImageUploader from "@/app/component/Form/HCInput/HCUpload";
import ReusableModal from "@/app/component/Reusible/Model/ReusibleModel";
import { useChangePassMutation } from "@/app/redux/api/authApi";
import {
  useGetMeQuery,
  useUpdateMyProfileMutation,
} from "@/app/redux/api/userApi";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiMail,
  FiPhone,
  FiShield,
  FiClock,
  FiUser,
  FiEdit2,
  FiKey,
  FiCopy,
  FiCheckCircle,
  FiAlertTriangle,
  FiEye,
} from "react-icons/fi";
import Badge from "../../../../component/Shared/Budge";
import { copyText } from "@/app/utils/toBoolean";
import formatYYYYMMDD from "@/app/utils/formatYYYYMMDD";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  password?: string; // never render this
  profilePhoto?: string | null;
  contactNumber?: string | null;
  needPasswordCng: boolean;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  address?: string | null;
  isDeleted: boolean;
};





const Profile = () => {
  const [changePassword] = useChangePassMutation();
  const [updateProfile, setUpdateProfile] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const [oldPass, setOldPass] = useState(false);
  const [newPass, setNewPass] = useState(false);
  const { data } = useGetMeQuery(undefined);
  const user: UserProfile = data?.data;

  const [updateMyProfile] = useUpdateMyProfileMutation();
  const handleTopChangeImage = async (e: FieldValues) => {
    const image = e?.target?.files?.[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("data", JSON.stringify({}));
    try {
      const res = await updateMyProfile(formData).unwrap();
      if (res?.success) {
        toast.success("Profile image updated successful");
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const statusTone = useMemo(() => {
    if (user?.isDeleted) return "rose";
    if (user?.status === "ACTIVE") return "emerald";
    return "amber";
  }, [user?.isDeleted, user?.status]);

  const handleUpdate = (e: any) => {
    console.log(e);
  };

  const handleToChangePass = async (e: FieldValues) => {
    try {
      const res = await changePassword(e).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
    setChangePass(false);
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-900 via-indigo-900 to-violet-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-400 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-400 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-4">
              <div className="inline-flex flex-col items-center gap-2">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg sm:h-28 sm:w-28 md:h-24 md:w-24">
                  <Image
                    src={user?.profilePhoto || "/placeholder-avatar.png"} // put placeholder in /public
                    alt={""}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <input
                  id="profilePhotoInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleTopChangeImage}
                />

                <label
                  htmlFor="profilePhotoInput"
                  className="cursor-pointer text-md font-semibold text-indigo-300 hover:text-indigo-400"
                >
                  Change image
                </label>
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {user?.name}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Badge tone="indigo">
                    <FiUser className="h-3.5 w-3.5" />
                    {user?.role}
                  </Badge>
                  <Badge tone={statusTone as any}>
                    {user?.isDeleted ? (
                      <>
                        <FiAlertTriangle className="h-3.5 w-3.5" />
                        DELETED
                      </>
                    ) : (
                      <>
                        <FiCheckCircle className="h-3.5 w-3.5" />
                        {user?.status}
                      </>
                    )}
                  </Badge>
                  {user?.needPasswordCng ? (
                    <Badge tone="amber">
                      <FiShield className="h-3.5 w-3.5" />
                      Password change required
                    </Badge>
                  ) : (
                    <Badge tone="emerald">
                      <FiShield className="h-3.5 w-3.5" />
                      Security OK
                    </Badge>
                  )}
                </div>
                <p className="mt-3 text-sm text-white/80">
                  Manage your account details, contact info, and security
                  settings.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setUpdateProfile(!updateProfile)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
              >
                <FiEdit2 className="h-4 w-4" />
                Edit profile
              </button>
              <button
                onClick={() => setChangePass(!changePass)}
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                <FiKey className="h-4 w-4" />
                Change password
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-6 md:grid-cols-3 md:gap-6 md:px-6 md:py-10">
        {/* Left: Contact */}
        <div className="md:col-span-2">
          {user?.needPasswordCng ? (
            <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-xl bg-amber-100 p-2">
                  <FiShield className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Action needed</p>
                  <p className="mt-1 text-sm">
                    Your account requires a password change. Please update it to
                    keep your account secure.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="text-lg font-bold text-slate-900">
                Personal info
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your basic information and contact details.
              </p>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiMail className="h-4 w-4" />
                  EMAIL
                </div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <p className="truncate font-semibold text-slate-900">
                    {user?.email}
                  </p>
                  <button
                    type="button"
                    onClick={() => copyText(user?.email)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    title="Copy email"
                  >
                    <FiCopy className="h-4 w-4" />
                    Copy
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiPhone className="h-4 w-4" />
                  PHONE
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {user?.contactNumber || "—"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Used for account & appointment updates.
                </p>
              </div>

              {/* <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiMapPin className="h-4 w-4" />
                  ADDRESS
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {user?.address || "—"}
                </p>
              </div> */}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="text-lg font-bold text-slate-900">Security</h2>
              <p className="mt-1 text-sm text-slate-500">
                Account safety overview (password is never displayed).
              </p>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiShield className="h-4 w-4" />
                  PASSWORD
                </div>
                <p className="mt-2 font-semibold text-slate-900">••••••••••</p>
                <p className="mt-1 text-xs text-slate-500">
                  Stored securely (hashed). Not visible here.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiKey className="h-4 w-4" />
                  PASSWORD CHANGE
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {user?.needPasswordCng ? "Required" : "Not required"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  We recommend updating regularly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Account */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="text-lg font-bold text-slate-900">Account</h2>
              <p className="mt-1 text-sm text-slate-500">
                IDs, status and timestamps.
              </p>
            </div>

            <div className="space-y-4 p-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-500">
                      USER ID
                    </div>
                    <div className="mt-2 truncate font-mono text-sm font-semibold text-slate-900">
                      {user?.id}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(user?.id)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    title="Copy user id"
                  >
                    <FiCopy className="h-4 w-4" />
                    Copy
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiClock className="h-4 w-4" />
                  CREATED
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {formatYYYYMMDD(user?.createdAt)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiClock className="h-4 w-4" />
                  UPDATED
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {formatYYYYMMDD(user?.updatedAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Tip</p>
            <p className="mt-1 text-sm text-slate-600">
              If you change email/phone, make sure your notifications and
              appointment updates keep working.
            </p>
          </div>
        </aside>
      </section>

      <div>
        {updateProfile ? (
          <ReusableModal
            open={updateProfile}
            onClose={() => setUpdateProfile(false)}
            title="Update your profile"
          >
            <div className="p-1">
              <HCForm
                onsubmit={handleUpdate}
                defaultValues={{
                  name: user?.name ?? "",
                  password: "",
                  contactNumber: user?.contactNumber ?? "",
                  profilePhoto: user?.profilePhoto ?? "",
                  email: user?.email ?? "",
                }}
              >
                <div className=" space-y-5">
                  <div>
                    <p className="mb-2 text-sm font-semibold text-slate-700">
                      Name
                    </p>
                    <HCInput
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold text-slate-700">
                      Password
                    </p>
                    <HCInput
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-semibold text-slate-700">
                      Contact Number
                    </p>
                    <HCInput
                      type="number"
                      name="contactNumber"
                      placeholder="Enter contact number"
                    />
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-semibold text-slate-700">
                      Profile Photo URL
                    </p>
                    <HCImageUploader name="profilePhoto" />
                  </div>

                  {/* চাইলে email read-only দেখাতে পারো */}
                  <div>
                    <p className="mb-2 text-sm font-semibold text-slate-700">
                      Email
                    </p>
                    <HCInput
                      placeholder="Enter your email"
                      type="email"
                      name="email"
                      disabled
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setUpdateProfile(false)}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={false}
                    className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white hover:from-indigo-700 hover:to-violet-700 disabled:opacity-70"
                  >
                    Update
                  </button>
                </div>
              </HCForm>
            </div>
          </ReusableModal>
        ) : (
          ""
        )}

        {changePass ? (
          <ReusableModal
            open={changePass}
            onClose={() => setChangePass(false)}
            title="Change password"
          >
            <div className="p-1">
              <HCForm
                defaultValues={{ oldPassword: "", newPassword: "" }}
                onsubmit={handleToChangePass}
              >
                <div className=" space-y-5">
                  <div className="relative">
                    <FiKey className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <HCInput
                      name="oldPassword"
                      placeholder="Enter your old password"
                      type={oldPass ? "text" : "password"}
                    />

                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      onClick={() => setOldPass(!oldPass)}
                    >
                      <FiEye />
                    </button>
                  </div>
                  <div className="relative">
                    <FiKey className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <HCInput
                      name="newPassword"
                      placeholder="Enter your new password"
                      type={newPass ? "text" : "password"}
                    />

                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      onClick={() => setNewPass(!newPass)}
                    >
                      <FiEye />
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setChangePass(false)}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={false}
                    className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white hover:from-indigo-700 hover:to-violet-700 disabled:opacity-70"
                  >
                    Update
                  </button>
                </div>
              </HCForm>
            </div>
          </ReusableModal>
        ) : (
          ""
        )}
      </div>
    </main>
  );
};

export default Profile;
