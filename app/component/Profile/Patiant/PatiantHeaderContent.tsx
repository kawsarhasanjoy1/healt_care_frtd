import Badge from "@/app/component/Shared/Budge";
import Image from "next/image";

import {
  FiAlertTriangle,
  FiCheckCircle,
  FiEdit2,
  FiKey,
  FiShield,
  FiUser,
} from "react-icons/fi";
type TPatiantHeader = {
  setUpdateProfileOpen:any;
  setChangePassOpen: any;
  handleTopChangeImage: any;
  patient: any;
  tone: any
};

const PatiantHeaderContent = ({
  setUpdateProfileOpen,
  setChangePassOpen,
  handleTopChangeImage,
  patient,
  tone
}: TPatiantHeader) => {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="flex items-center gap-4">
        <div className="inline-flex flex-col items-center gap-2">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg sm:h-28 sm:w-28 md:h-24 md:w-24">
            <Image
              src={patient?.profilePhoto || "/placeholder-avatar.png"}
              alt=""
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
            {patient?.name}
          </h1>

          <div className="mt-1 flex flex-wrap items-center gap-2">
            <Badge tone="indigo">
              <FiUser className="h-3.5 w-3.5" />
              {patient?.role || "PATIANT"}
            </Badge>

            <Badge tone={tone as any}>
              {patient?.isDeleted ? (
                <>
                  <FiAlertTriangle className="h-3.5 w-3.5" />
                  DELETED
                </>
              ) : (
                <>
                  <FiCheckCircle className="h-3.5 w-3.5" />
                  {patient?.status || "ACTIVE"}
                </>
              )}
            </Badge>

            {patient?.needPasswordCng ? (
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
            Click submit in 'Edit Profile' to update basic, health, and optional
            report details.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setUpdateProfileOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
        >
          <FiEdit2 className="h-4 w-4" />
          Edit profile
        </button>

        <button
          onClick={() => setChangePassOpen(true)}
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
        >
          <FiKey className="h-4 w-4" />
          Change password
        </button>
      </div>
    </div>
  );
};


export default PatiantHeaderContent