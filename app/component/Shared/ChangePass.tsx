import HCForm from "@/app/component/Form/HCForm/HCForm";
import HCInput from "@/app/component/Form/HCInput/HCIput";
import ReusableModal from "@/app/component/Reusible/Model/ReusibleModel";
import { useState } from "react";
import { FiEye, FiKey } from "react-icons/fi";

type TChhangePass = { changePassOpen: any, setChangePassOpen: any , handleToChangePass: any}

const ChangePass = ({ changePassOpen, setChangePassOpen , handleToChangePass}: TChhangePass) => {
  const [oldPassVisible, setOldPassVisible] = useState(false);
  const [newPassVisible, setNewPassVisible] = useState(false);
  return (
    <div>
      {changePassOpen ? (
        <ReusableModal
          open={changePassOpen}
          onClose={() => setChangePassOpen(false)}
          title="Change password"
        >
          <div className="p-1">
            <HCForm
              defaultValues={{ oldPassword: "", newPassword: "" }}
              onsubmit={handleToChangePass}
            >
              <div className="space-y-5">
                <div className="relative">
                  <FiKey className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <HCInput
                    name="oldPassword"
                    placeholder="Enter your old password"
                    type={oldPassVisible ? "text" : "password"}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setOldPassVisible((v) => !v)}
                  >
                    <FiEye />
                  </button>
                </div>

                <div className="relative">
                  <FiKey className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <HCInput
                    name="newPassword"
                    placeholder="Enter your new password"
                    type={newPassVisible ? "text" : "password"}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setNewPassVisible((v) => !v)}
                  >
                    <FiEye />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setChangePassOpen(false)}
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
    </div>
  );
};


export default ChangePass;