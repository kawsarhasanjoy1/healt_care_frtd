import BlogCard from "@/app/component/Home/Blog/BlogCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "স্বাস্থ্য কথা | আমাদের সাম্প্রতিক ব্লগ ও নিবন্ধসমূহ",
  description: "চিকিৎসা বিশেষজ্ঞদেয় লেখা সাম্প্রতিক স্বাস্থ্য টিপস এবং নিবন্ধসমূহ পড়ুন।",
};

const BlogPage = () => {
  return (
    <main className="bg-[#f8fafc] min-h-screen">
      {/* ব্যানার বা হেডার সেকশন */}
      <section className="bg-[#1e293b] py-20 px-4 relative overflow-hidden">
        {/* ডেকোরেশন এলিমেন্ট */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            আমাদের <span className="text-cyan-400">স্বাস্থ্য কথা</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            বিশেষজ্ঞ ডাক্তারদের লেখা নির্ভরযোগ্য স্বাস্থ্য টিপস এবং আধুনিক চিকিৎসা বিজ্ঞানের সাম্প্রতিক তথ্যের জন্য আমাদের নিবন্ধগুলো পড়ুন।
          </p>
        </div>
      </section>

      {/* ব্লগ কার্ড সেকশন */}
      <section className="-mt-10">
        <BlogCard />
      </section>

      {/* নিউজলেটার সেকশন (ঐচ্ছিক কিন্তু প্রফেশনাল দেখায়) */}
      <section className="py-20 px-4 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto bg-cyan-600 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-cyan-100">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            নতুন স্বাস্থ্য টিপস পেতে সাবস্ক্রাইব করুন
          </h3>
          <p className="text-cyan-100 mb-8">
            আমাদের নতুন ব্লগ পোস্ট এবং স্বাস্থ্য সংক্রান্ত আপডেট সরাসরি আপনার ইমেইলে পেতে চান?
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="আপনার ইমেইল ঠিকানা দিন" 
              className="flex-grow px-6 py-4 rounded-full outline-none focus:ring-2 focus:ring-white transition-all text-slate-800"
            />
            <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg">
              সাবস্ক্রাইব
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;