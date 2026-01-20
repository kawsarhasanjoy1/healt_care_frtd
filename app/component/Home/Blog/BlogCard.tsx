"use client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ChevronRight, Clock } from "lucide-react";
import { useGetAllBlogsQuery } from "@/app/redux/api/blogApi";
import calculateReadingTime from "@/app/utils/calculateReadingTime";

const BlogCard = () => {
  const { data: blogs, isLoading } = useGetAllBlogsQuery({});

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="bg-[#f8fafc] py-24 px-4 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-3 block">
          আমাদের চিকিৎসা সংক্রান্ত তথ্য
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1e293b] mb-6">
          সাম্প্রতিক স্বাস্থ্য <span className="text-blue-500">নিবন্ধসমূহ</span>
        </h2>
        <div className="w-24 h-1.5 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {blogs?.data?.map((blog: any) => (
          <article
            key={blog.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col group"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={blog.thumbnail || "/placeholder.jpg"}
                alt={blog.title}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-blue-500 text-white text-[12px] font-bold px-3 py-1 rounded-full tracking-wider">
                চিকিৎসা
              </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-slate-500 text-xs mb-5 font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-blue-500" />
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("bn-BD", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-blue-500" />
                  <span>{calculateReadingTime(blog?.content)} মিনিট পড়ার সময়</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#1e293b] mb-4 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                {blog.title}
              </h3>

              <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100">
                    <Image
                      src={blog?.author?.profilePhoto || "/avatar.png"}
                      fill
                      className="object-cover"
                      alt={blog?.author?.name}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-none mb-1">
                      {blog.author?.name || "বিশেষজ্ঞ ডাক্তার"}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-tighter">
                      মেডিকেল এক্সপার্ট
                    </p>
                  </div>
                </div>

                <Link
                  href={`/blogs/${blog.id}`}
                  title="পুরো নিবন্ধটি পড়ুন"
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
