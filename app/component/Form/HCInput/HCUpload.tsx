"use client";
import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { FiUploadCloud, FiImage } from "react-icons/fi";

const HCImageUploader = ({ name, label, multiple = false }: any) => {
  const { control } = useFormContext();
  const [previews, setPreviews] = useState<string[]>([]);

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <div className="w-full">
            <label className="flex flex-col items-center justify-center w-full min-h-[120px] border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50/50 hover:bg-indigo-50/30 hover:border-indigo-300 transition-all group">
              <input
                type="file"
                multiple={multiple}
                className="hidden"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    onChange(multiple ? files : files);
                    const fileUrls = Array.from(files).map((file) => URL.createObjectURL(file));
                    setPreviews(fileUrls);
                  }
                }}
              />
              <div className="flex flex-col items-center justify-center py-4">
                <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  <FiUploadCloud size={24} className="text-indigo-500" />
                </div>
                <p className="mt-2 text-xs text-slate-500 font-medium">
                  {multiple ? "ছবিগুলো এখানে আপলোড করুন" : "একটি ছবি নির্বাচন করুন"}
                </p>
              </div>
            </label>

            {previews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative group w-20 h-20 rounded-xl overflow-hidden border-2 border-white shadow-md">
                    <Image src={src} alt="preview" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <FiImage className="text-white" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default HCImageUploader;