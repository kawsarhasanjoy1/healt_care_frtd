import formatYYYYMMDD from "@/app/utils/formatYYYYMMDD";
import { copyText, yesNo } from "@/app/utils/toBoolean";
import {
  FiClock,
  FiCopy,
  FiFileText,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

const PatiantBasicInfo = ({
  patient,
  health,
  reports,
}: {
  patient: any;
  health: any;
  reports: any[];
}) => {
  const profileEmail = patient?.email ?? "—";
  const contactNumber = patient?.contactNumber ?? null;
  const address = patient?.address ?? null;
  return (
    <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 md:grid-cols-3 md:gap-6 md:px-6 md:py-10">
      {/* Left */}
      <div className="md:col-span-2">
        {/* Personal info */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-lg font-bold text-slate-900">Personal info</h2>
            <p className="mt-1 text-sm text-slate-500">
              Basic information and contact details.
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
                  {profileEmail}
                </p>
                <button
                  type="button"
                  onClick={() => copyText(profileEmail)}
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
                {contactNumber || "—"}
              </p>
            </div>

            <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <FiMapPin className="h-4 w-4" />
                ADDRESS
              </div>
              <p className="mt-2 font-semibold text-slate-900">
                {address || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Health summary */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-lg font-bold text-slate-900">Health summary</h2>
            <p className="mt-1 text-sm text-slate-500">
              Patient health data overview.
            </p>
          </div>

          {Object.keys(health)?.length > 0 ? (
            <div className="grid gap-4 p-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-500">
                  GENDER
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {health?.gender || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-500">
                  BLOOD GROUP
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {health?.bloodGroup || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-500">
                  HEIGHT
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {health?.height || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-500">
                  WEIGHT
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {health?.weight || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-500">
                  ALLERGIES
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {yesNo(health?.hasAllergies)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold text-slate-500">
                  DIABETES
                </div>
                <p className="mt-2 font-semibold text-slate-900">
                  {yesNo(health?.hasDiabetes)}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              Please update your health data
            </div>
          )}
        </div>

        {/* Medical reports */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-lg font-bold text-slate-900">
              Medical reports
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Uploaded reports and documents.
            </p>
          </div>

          <div className="p-5">
            {reports?.length ? (
              <div className="space-y-3">
                {reports?.map((r: any) => (
                  <a
                    key={r?.id}
                    href={r?.reportLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-slate-900">
                        <FiFileText className="h-4 w-4 text-slate-500" />
                        <p className="truncate font-semibold">{r?.reportName}</p>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        Uploaded: {formatYYYYMMDD(r?.createdAt)}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-indigo-700">
                      Open
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                No medical reports found.
              </div>
            )}
          </div>
        </div>
      </div>
       {/* right */}
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
                    USER ID
                  </div>
                  <div className="mt-2 truncate font-mono text-sm font-semibold text-slate-900">
                    {patient?.id}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(patient?.id)}
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
                {formatYYYYMMDD(patient?.createdAt)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <FiClock className="h-4 w-4" />
                UPDATED
              </div>
              <p className="mt-2 font-semibold text-slate-900">
                {formatYYYYMMDD(patient?.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default PatiantBasicInfo;
