"use client";
import { useRef, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    return ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );
  },
  { ssr: false }
);

const HCQuill = ({ name, label }: { name: string; label?: string }) => {
  const { control, setValue, getValues } = useFormContext();
  const quillRef = useRef<any>(null);

  const imageHandler = (onChange: (value: string) => void) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        // ১. Blob URL তৈরি (এডিটরে প্রিভিউ দেখানোর জন্য)
        const blobUrl = URL.createObjectURL(file);

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();

        // ২. এডিটরে সঠিক পজিশনে ইমেজ ইনসার্ট করা
        quill.insertEmbed(range?.index || 0, "image", blobUrl);

        // ৩. গুরুত্বপূর্ণ: এডিটরের পুরো কন্টেন্ট নিয়ে ফর্মের মেইন ভ্যালু (onChange) আপডেট করা
        // এটি না করলে কন্টেন্টের ভেতরে <img> ট্যাগ সেভ হবে না
        const updatedContent = quill.root.innerHTML;
        onChange(updatedContent);

        // ৪. ফাইলটিকে আলাদা 'content_files' এরেতে জমা রাখা (ব্যাকএন্ডে পাঠানোর জন্য)
        const existingFiles = getValues("content_files") || [];
        setValue("content_files", [...existingFiles, file], {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    };
  };

  const createModules = (onChange: (value: string) => void) => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: () => imageHandler(onChange),
      },
    },
  });

  return (
    <div className="mb-20">
      {label && (
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ReactQuill
            forwardedRef={quillRef}
            theme="snow"
            value={field.value}
            onChange={field.onChange}
            modules={useMemo(
              () => createModules(field.onChange),
              [field.onChange]
            )}
            className="h-[300px]"
            placeholder="বিস্তারিত এখানে লিখুন..."
          />
        )}
      />
    </div>
  );
};

export default HCQuill;
