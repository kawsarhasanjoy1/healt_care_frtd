"use client";

import HCForm from "@/app/component/Form/HCForm/HCForm";
import { useGetSpecialtiesQuery } from "@/app/redux/api/specialtiesApi";
import { toast } from "react-hot-toast";
import HCInput from "@/app/component/Form/HCInput/HCIput";
import HCSelect from "@/app/component/Form/HCInput/HCSelect";
import HCImageUploader from "@/app/component/Form/HCInput/HCUpload";
import HCQuill from "@/app/component/Form/HCInput/HCQuill";
import { useCreateBlogMutation } from "@/app/redux/api/blogApi";

const CreateBlogPage = () => {
  const [createBlog, { isLoading }] = useCreateBlogMutation();

  // স্পেশালিটি ডাটা ফেচিং
  const { data: specialtiesRes } = useGetSpecialtiesQuery(undefined);
  const specialtiesOptions = specialtiesRes?.data?.data?.map((item: any) => ({
    label: item.title,
    value: item.id,
  }));

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    if (values.thumbnail) {
      formData.append("file", values.thumbnail[0]);
    }

    if (values.content_files) {
      values.content_files.forEach((file: File) => {
        formData.append("content_images", file);
      });
    }

    const blogData = {
      title: values.title,
      content: values.content,
      specialtiesId: values.specialtiesId,
    };
    formData.append("data", JSON.stringify(blogData));

    try {
      const res = await createBlog(formData).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-900">নতুন ব্লগ লিখুন</h1>
        <p className="text-sm text-slate-500">
          তথ্যবহুল এবং মানসম্মত কন্টেন্ট শেয়ার করুন
        </p>
      </div>

      <HCForm onsubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <HCInput
              name="title"
              label="ব্লগ টাইটেল"
              placeholder="যেমন: ডায়াবেটিস নিয়ন্ত্রণে রাখার সহজ উপায়"
            />
          </div>
          <div className=" md:col-span-2">
            <HCSelect
              name="specialtiesId"
              label="ক্যাটাগরি"
              options={specialtiesOptions || []}
            />
          </div>
          <div className="md:col-span-2">
            <HCImageUploader
              name="thumbnail"
              label="থাম্বনেইল ইমেজ"
              multiple={false}
            />
          </div>
          <div className="md:col-span-2 mt-4">
            <HCQuill name="content" label="ব্লগের বিস্তারিত কন্টেন্ট" />
          </div>

          <div className="md:col-span-2">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full h-12 rounded-xl bg-indigo-600 font-bold text-white transition-all hover:bg-indigo-700 disabled:bg-slate-300"
            >
              {isLoading ? "পাবলিশ হচ্ছে..." : "ব্লগ পাবলিশ করুন"}
            </button>
          </div>
        </div>
      </HCForm>
    </div>
  );
};

export default CreateBlogPage;
