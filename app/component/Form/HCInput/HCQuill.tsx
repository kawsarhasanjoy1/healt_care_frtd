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
        const reader = new FileReader();

        reader.onload = () => {
          const base64Url = reader.result as string;
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range?.index || 0, "image", base64Url);
          quill.setSelection((range?.index || 0) + 1);

          const fullContent = quill.root.innerHTML;
          onChange(fullContent);
          const currentFiles = getValues("content_files") || [];
          setValue("content_files", [...currentFiles, file]);
        };

        reader.readAsDataURL(file);
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: function () {
            // @ts-ignore
            imageHandler(this.quill.onChangeProxy);
          },
        },
      },
    }),
    []
  );

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
        render={({ field }) => {
          if (quillRef.current) {
            quillRef.current.getEditor().onChangeProxy = field.onChange;
          }

          return (
            <ReactQuill
              forwardedRef={quillRef}
              theme="snow"
              value={field.value}
              onChange={field.onChange}
              modules={modules}
              className="h-[300px]"
              placeholder="বিস্তারিত এখানে লিখুন..."
            />
          );
        }}
      />
    </div>
  );
};

export default HCQuill;
