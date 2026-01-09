"use client";
import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { RiUploadCloudFill } from "react-icons/ri";

interface EHImageUploaderProps {
  name: string;
  multiple?: boolean
  className?: string
}

const HCImageUploader = ({ name, multiple=false , className }: EHImageUploaderProps) => {
  const { control } = useFormContext();
  const [previews, setPreviews] = useState<string[]>([]);
  const [imageName, setImageName] = useState<any>('');
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <div className="space-y-2 overflow-hidden">
          <label className={`flex flex-col items-center justify-center border-2 border-dashed border-sky-400 rounded-xl p-6 cursor-pointer transition-all hover:border-sky-500 hover:bg-sky-50 dark:border-sky-600 dark:hover:bg-zinc-800 ${className}`}>
            <input
              type="file"
              multiple={multiple}
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;
                setImageName(e.target.files?.[0].name)
                if (files) {
                  onChange(files); 
                  const fileUrls = Array.from(files).map((file) =>
                    URL.createObjectURL(file)
                  );
                  setPreviews(fileUrls);
                }
              }}
            />
            <div className="relative">
            
             {imageName ? imageName :  <RiUploadCloudFill size={40} className="absolute -left-4  -translate-y-[50%]  text-blue-400 overflow-hidden" />}
            </div>
          </label>

          {previews.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-2">
              {previews?.map((src, idx) => (
                <div key={idx} className="w-24 h-24 rounded-lg overflow-hidden shadow-md relative">
                  <Image   src={src}
                    alt={`preview-${idx}`}
                    className="w-full h-full object-cover"  width={200} height={200}/>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default HCImageUploader;
