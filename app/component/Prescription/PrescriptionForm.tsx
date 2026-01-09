"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Editor styles
import { useCreatePrescriptionMutation } from "@/app/redux/api/prescriptionApi";
import toast from "react-hot-toast";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const PrescriptionForm = ({ appointmentId }: { appointmentId: string }) => {
  console.log(appointmentId)
  const [instructions, setInstructions] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [createPrescription, { isLoading }] = useCreatePrescriptionMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!instructions || instructions === "<p><br></p>") {
      return toast.error("Please write some instructions!");
    }

    const payload = {
      appointmentId,
      instructions,
      followUpDate: followUpDate ? new Date(followUpDate).toISOString() : null,
    };

    try {
     const res =  await createPrescription(payload).unwrap();
     if (res?.success) {
       toast.success("Prescription submitted successfully!");
     }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to submit prescription");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">
        Create Prescription
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-6">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Detailed Instructions (Medicines, Dosage, Advice)*
          </label>
          <div className="h-[300px] mb-12"> 
            <ReactQuill
              theme="snow"
              value={instructions}
              onChange={setInstructions}
              className="h-full"
              placeholder="Write medicines and detailed advice here..."
            />
          </div>
        </div>

        {/* Follow-up Date Field */}
        <div className="mt-4">
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Follow-up Date (Optional)
          </label>
          <input
            type="date"
            className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-bold text-white transition ${
            isLoading ? "bg-slate-400" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isLoading ? "Submitting..." : "Submit Prescription"}
        </button>
      </form>
    </div>
  );
};

export default PrescriptionForm;