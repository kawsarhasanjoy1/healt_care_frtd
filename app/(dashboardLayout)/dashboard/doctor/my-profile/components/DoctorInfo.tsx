import Image from "next/image";
import Badge from "../../../../../component/Shared/Budge";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
  FiClock,
  FiUser,
  FiEdit2,
  FiKey,
  FiCopy,
  FiCheckCircle,
  FiAlertTriangle,
  FiEye,
  FiBriefcase,
  FiAward,
  FiDollarSign,
  FiHash,
  FiStar,
} from "react-icons/fi";
import formatYYYYMMDD from "@/app/utils/formatYYYYMMDD";
import toast from "react-hot-toast";
import { useMemo } from "react";
import { FieldValues } from "react-hook-form";
import { useUpdateMyProfileMutation } from "@/app/redux/api/userApi";

export type DoctorProfile = {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  profilePhoto?: string;
  address?: string | null;

  registrationNumber: string;
  experience: number;
  gender: string;
  appoinmentFee: string;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;

  averageRating: number;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;
  status?: string; // e.g. ACTIVE
  role?: string; // e.g. DOCTOR
  needPasswordCng?: boolean;
};

const copyText = async (text?: string) => {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied");
  } catch {
    toast.error("Copy failed");
  }
};

const DoctorInfo = ({
  doctor,
  setChangePassOpen,
  setEditOpen,
}: {
  doctor: DoctorProfile;
  setChangePassOpen: any;
  setEditOpen: any;
}) => {
  const [updateMyProfile] = useUpdateMyProfileMutation();
  const statusTone = useMemo(() => {
    if (doctor?.isDeleted) return "rose";
    if (doctor?.status === "ACTIVE") return "emerald";
    return "amber";
  }, [doctor?.isDeleted, doctor?.status]);

  const profilePhoto =
    doctor?.profilePhoto && doctor.profilePhoto.trim().length > 0
      ? doctor.profilePhoto
      : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

  const handleTopChangeImage = async (e: FieldValues) => {
    const image = e?.target?.files?.[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("data", JSON.stringify({}));
    try {
      const res = await updateMyProfile(formData).unwrap();
      if (res?.success) {
        toast.success('Profile image updated successful')
      }
    } catch (error: any) {
      
      toast.error(error?.data?.message)
    }
  };

  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-900 via-indigo-900 to-violet-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-400 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-400 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full md:max-w-6xl px-4 py-10 md:px-6 md:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-4">
              <div className="inline-flex flex-col items-center gap-2">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg sm:h-28 sm:w-28 md:h-24 md:w-24">
                  <Image
                    src={profilePhoto || "/placeholder-avatar.png"} // put placeholder in /public
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
                  {doctor?.name ?? "—"}
                </h1>

                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Badge tone="indigo">
                    <FiBriefcase className="h-3.5 w-3.5" />
                    {doctor?.designation ?? "Doctor"}
                  </Badge>

                  <Badge tone={statusTone as any}>
                    {doctor?.isDeleted ? (
                      <>
                        <FiAlertTriangle className="h-3.5 w-3.5" />
                        DELETED
                      </>
                    ) : (
                      <>
                        <FiCheckCircle className="h-3.5 w-3.5" />
                        {doctor?.status ?? "ACTIVE"}
                      </>
                    )}
                  </Badge>

                  <Badge tone="emerald">
                    <FiStar className="h-3.5 w-3.5" />
                    {typeof doctor?.averageRating === "number"
                      ? doctor.averageRating.toFixed(1)
                      : "—"}
                  </Badge>

                  {doctor?.needPasswordCng ? (
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
                  Manage your professional info, clinic details, and security.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setEditOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
              >
                <FiEdit2 className="h-4 w-4" />
                Edit profile
              </button>

              <button
                type="button"
                onClick={() => setChangePassOpen(true)}
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
      <section className="mx-auto md:grid md:max-w-6xl w-full gap-4 px-4 py-6 md:grid-cols-3 md:gap-6 md:px-6 md:py-10">
        {/* Left */}
        <div className="md:col-span-2 space-y-6">
          {/* Contact */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="text-lg font-bold text-slate-900">Contact</h2>
              <p className="mt-1 text-sm text-slate-500">
                Email, phone, and address.
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
                    {doctor?.email ?? "—"}
                  </p>
                  <button
                    type="button"
                    onClick={() => copyText(doctor?.email)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
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
                  {doctor?.contactNumber ?? "—"}
                </p>
              </div>

              <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiMapPin className="h-4 w-4" />
                  ADDRESS
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {doctor?.address ?? "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Professional */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="text-lg font-bold text-slate-900">Professional</h2>
              <p className="mt-1 text-sm text-slate-500">
                Registration, qualification, experience, and workplace.
              </p>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiHash className="h-4 w-4" />
                  REGISTRATION NO
                </div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <p className="truncate font-mono text-sm font-semibold text-slate-900">
                    {doctor?.registrationNumber ?? "—"}
                  </p>
                  <button
                    type="button"
                    onClick={() => copyText(doctor?.registrationNumber)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <FiCopy className="h-4 w-4" />
                    Copy
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiBriefcase className="h-4 w-4" />
                  EXPERIENCE
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {typeof doctor?.experience === "number"
                    ? `${doctor.experience} years`
                    : "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiAward className="h-4 w-4" />
                  QUALIFICATION
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {doctor?.qualification ?? "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiUser className="h-4 w-4" />
                  GENDER
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {doctor?.gender ?? "—"}
                </p>
              </div>

              <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiBriefcase className="h-4 w-4" />
                  CURRENT WORKING PLACE
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {doctor?.currentWorkingPlace ?? "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Fee */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="text-lg font-bold text-slate-900">Consultation</h2>
              <p className="mt-1 text-sm text-slate-500">
                Appointment fee and designation.
              </p>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiDollarSign className="h-4 w-4" />
                  APPOINTMENT FEE
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {doctor?.appoinmentFee ?? "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiBriefcase className="h-4 w-4" />
                  DESIGNATION
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {doctor?.designation ?? "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="text-lg font-bold text-slate-900">Account</h2>
              <p className="mt-1 text-sm text-slate-500">IDs and timestamps.</p>
            </div>

            <div className="space-y-4 p-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-500">
                      DOCTOR ID
                    </div>
                    <div className="mt-2 truncate font-mono text-sm font-semibold text-slate-900">
                      {doctor?.id ?? "—"}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyText(doctor?.id)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
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
                  {formatYYYYMMDD(doctor?.createdAt)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiClock className="h-4 w-4" />
                  UPDATED
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {formatYYYYMMDD(doctor?.updatedAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Tip</p>
            <p className="mt-1 text-sm text-slate-600">
              Keep your registration, qualification and fee up to date to avoid
              appointment confusion.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default DoctorInfo;
