"use client";
import Image from "next/image";
import { Calendar, User, Clock, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import "react-quill-new/dist/quill.snow.css";
import calculateReadingTime from "@/app/utils/calculateReadingTime";

const BlogDetails = ({ blog }: any) => {
  const blogData = blog?.data;

  return (
    <div className="bg-[#fcfdfe] min-h-screen pb-20 md:px-8">
      <div className="relative w-full h-[300px] md:h-[500px] shadow-lg">
        <Image
          src={blogData?.thumbnail || "/placeholder.jpg"}
          alt={blogData?.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/20 flex items-start p-6">
          <Link
            href="/blogs"
            className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-slate-700 hover:text-cyan-600 transition-all font-medium shadow-md"
          >
            <ArrowLeft size={18} />
            <span>ফিরে যান</span>
          </Link>
        </div>
      </div>

      <article className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        <header className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-50 mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-8 text-center md:text-left">
            {blogData?.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-100 shadow-sm">
                <Image
                  src={blogData?.author?.profilePhoto || "/avatar.png"}
                  fill
                  alt="Author"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-lg leading-none mb-1">
                  {blogData?.author?.name}
                </p>
                <p className="text-xs text-cyan-600 uppercase tracking-wider font-bold">
                  মেডিকেল কনসালটেন্ট
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-slate-500 text-sm font-medium">
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                <Calendar size={16} className="text-cyan-500" />
                <span>
                  {new Date(blogData?.createdAt).toLocaleDateString("bn-BD", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                <Clock size={16} className="text-cyan-500" />
                <span>
                  {calculateReadingTime(blogData?.content)} মিনিট পড়ার সময়
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="ql-snow bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-slate-50">
          <div
            className="ql-editor !p-0 text-slate-700 text-lg md:text-xl leading-relaxed prose prose-cyan max-w-none"
            dangerouslySetInnerHTML={{ __html: blogData?.content }}
          />
        </div>

        {/* <footer className="mt-12 flex justify-center">
          <button className="flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-full hover:bg-cyan-600 transition-all font-bold shadow-2xl hover:-translate-y-1">
            <Share2 size={20} />
            এই নিবন্ধটি শেয়ার করুন
          </button>
        </footer> */}
      </article>
    </div>
  );
};

export default BlogDetails;
