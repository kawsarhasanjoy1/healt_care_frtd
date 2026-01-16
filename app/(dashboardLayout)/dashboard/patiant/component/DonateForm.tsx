"use client";
import { FiDroplet } from "react-icons/fi";
import HCButton from "@/app/component/ui/Button/HCButton";
import { FieldValues } from "react-hook-form";
import HCForm from "@/app/component/Form/HCForm/HCForm";
import HCInput from "@/app/component/Form/HCInput/HCIput";
import HCDatePicker from "@/app/component/Form/DatePicker/DatePicker";
import HCRadioGroup from "@/app/component/Form/HCInput/HCRadioGroup";
import { BLOOD_GROUPS } from "./constance";
import { useCreateBloodDanateMutation } from "@/app/redux/api/bloodDonateApi";
import toast from "react-hot-toast";

const BloodDonateForm = ({
  user,
  onSuccess,
}: {
  user: any;
  onSuccess: () => void;
}) => {
  const [createBloodDonate, { isLoading }] = useCreateBloodDanateMutation();
  const defaultBlood = user?.patientHealthData?.bloodGroup;
  const onSubmit = async (values: FieldValues) => {
    const payload = {
      bloodGroup: values?.bloodGroup,
      address: values.location,
      lastDonationDate: values.lastDonationDate || null,
      donatedBags: Number(values?.donatedBags),
      nowDonateBags: Number(values?.nowDonateBags)
    };

    try {
      const res = await createBloodDonate(payload).unwrap();
      if (res?.success) {
        toast.success("অভিনন্দন! আপনি এখন একজন নিবন্ধিত রক্তদাতা।");
        onSuccess();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "তথ্য আপডেট করতে সমস্যা হয়েছে");
    }
  };

  const defaultValues = {
    bloodGroup: defaultBlood || "",
    location: user?.address || "",
    lastDonationDate: user?.lastDonationDate || "",
    donatedBags: 0,
    nowDonateBags: 0,
  };

  return (
    <HCForm onsubmit={onSubmit} defaultValues={defaultValues}>
      <div className="space-y-6">
        <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 flex items-start gap-3">
          <FiDroplet className="text-rose-500 mt-1 flex-shrink-0" />
          <p className="text-xs text-rose-700 leading-relaxed">
            রক্তদান একটি মহৎ কাজ। আপনার সঠিক তথ্য দিয়ে জীবন বাঁচাতে সাহায্য
            করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <HCRadioGroup
            name="bloodGroup"
            label="রক্তের গ্রুপ নির্বাচন করুন"
            options={BLOOD_GROUPS}
            cols={4}
          />

          <HCInput
            name="location"
            type="text"
            placeholder="আপনার ঠিকানা লিখুন"
          />

          <HCDatePicker
            name="lastDonationDate"
            placeholder="সর্বশেষ রক্তদান তারিখ লিখুন"
          />
          <HCInput
            name="donatedBags"
            type="number"
            placeholder="সর্বশেষ কত ব্যাগ রক্তদান করেছেন"
          />
          <HCInput
            name="nowDonateBags"
            type="number"
            placeholder="এখন কত ব্যাগ রক্তদান করবেন"
          />
        </div>

        <div className="pt-4 border-t border-slate-100">
          <HCButton
            type="submit"
            isLoading={isLoading}
            variant="primary"
            className="w-full bg-rose-600 hover:bg-rose-700"
          >
            ডোনার হিসেবে নিবন্ধন করুন
          </HCButton>
        </div>
      </div>
    </HCForm>
  );
};

export default BloodDonateForm;
