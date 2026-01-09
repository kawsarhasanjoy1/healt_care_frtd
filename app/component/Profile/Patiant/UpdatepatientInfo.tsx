import {
  bloodGroup,
  booleanStatus,
  gender,
  maritalStatus,
} from "@/app/(dashboardLayout)/dashboard/patiant/my-profile/constance";
import HCForm from "../../Form/HCForm/HCForm";
import HCInput from "../../Form/HCInput/HCIput";
import HCSelect from "../../Form/HCInput/HCSelect";
import ReusableModal from "../../Reusible/Model/ReusibleModel";
import HCDatePicker from "../../Form/DatePicker/DatePicker";


type TPatientUp = {
  updateProfileOpen: boolean;
  setUpdateProfileOpen: any;
  handleUpdateAll: any;
  patient: any;
};

const UpdatePatientInfo = ({
  updateProfileOpen,
  setUpdateProfileOpen,
  handleUpdateAll,
  patient,
}: TPatientUp) => {
  const health = patient?.patientHealthData;
  return (
    <div>
      {updateProfileOpen ? (
        <ReusableModal
          open={updateProfileOpen}
          onClose={() => setUpdateProfileOpen(false)}
          className=" w-full md:max-w-5xl"
          title="Update profile (basic + health + report optional)"
        >
          <div className="p-1">
            <HCForm
              onsubmit={handleUpdateAll}
              defaultValues={{
                name: patient?.name ?? "",
                contactNumber: patient?.contactNumber ?? "",
                address: patient?.address ?? "",
                profilePhoto: patient?.profilePhoto ?? "",
                email: patient?.email ?? "",

                // health (optional => empty)
                gender: "",
                dateOfBirth: "",
                bloodGroup: "",
                maritalStatus: "",
                height: "",
                weight: "",
                hasAllergies: "",
                hasDiabetes: "",
                smokingStatus: "",
                hasPastSurgeries: "",
                dietaryPreferences: "",
                mentalHealthHistory: "",
                immunizationStatus: "",

                // report optional
                reportName: "",
                reportLink: "",
              }}
            >
              <div className="space-y-6">
                {/* Basic */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-4 text-sm font-bold text-slate-900">
                    Basic info
                  </p>

                  <div className="grid gap-4 md:grid-cols-3">
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
                        Address
                      </p>
                      <HCInput
                        type="text"
                        name="address"
                        placeholder="Enter address"
                      />
                    </div>
                  </div>
                </div>

                {/* Health */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-2 text-sm font-bold text-slate-900">
                    Health data (optional)
                  </p>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Gender
                      </p>
                      <HCSelect name="gender" options={gender} />
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Date of birth
                      </p>
                      <HCDatePicker name="dateOfBirth" />
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Blood group
                      </p>
                      <HCSelect name="bloodGroup" options={bloodGroup} />
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Marital status
                      </p>
                      <HCSelect name="maritalStatus" options={maritalStatus} />
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Height
                      </p>
                      <HCInput
                        name="height"
                        placeholder={health?.height || "170"}
                        type="text"
                      />
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Weight
                      </p>
                      <HCInput
                        name="weight"
                        placeholder={health?.weight || "65"}
                        type="text"
                      />
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Has allergies
                      </p>
                      <HCSelect name="hasAllergies" options={booleanStatus} />
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Has diabetes
                      </p>
                      <HCSelect name="hasDiabetes" options={booleanStatus} />
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Smoking
                      </p>
                      <HCSelect name="smokingStatus" options={booleanStatus} />
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Past surgeries
                      </p>
                      <HCSelect
                        name="hasPastSurgeries"
                        options={booleanStatus}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Dietary preferences
                      </p>
                      <HCInput
                        name="dietaryPreferences"
                        required={false}
                        placeholder={health?.dietaryPreferences || "Optional"}
                        type="text"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Mental health history
                      </p>
                      <HCInput
                        name="mentalHealthHistory"
                        required={false}
                        placeholder={health?.mentalHealthHistory || "Optional"}
                        type="text"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Immunization status
                      </p>
                      <HCInput
                        name="immunizationStatus"
                        required={false}
                        placeholder={health?.immunizationStatus || "Optional"}
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                {/* Report */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-2 text-sm font-bold text-slate-900">
                    Add medical report (optional)
                  </p>
                  <p className="mb-4 text-xs text-slate-600">
                    reportName + reportLink add and report create হবে।
                  </p>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="md:col-span-1">
                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Report name
                      </p>
                      <HCInput
                        required={false}
                        name="reportName"
                        placeholder="CBC / X-Ray / MRI..."
                        type="text"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Report link (URL)
                      </p>
                      <HCInput
                        required={false}
                        name="reportLink"
                        placeholder="https://..."
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUpdateProfileOpen(false)}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  //   disabled={isUpdating}
                  className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white hover:from-indigo-700 hover:to-violet-700 disabled:opacity-70"
                >
                  Update
                </button>
              </div>
            </HCForm>
          </div>
        </ReusableModal>
      ) : null}
    </div>
  );
};

export default UpdatePatientInfo;
