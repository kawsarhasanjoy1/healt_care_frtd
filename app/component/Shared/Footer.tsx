"use client";

import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="mx-auto max-w-[1420px] py-14 px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">

          {/* ব্র্যান্ড এবং বর্ণনা */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              হেলথ<span className="text-blue-200">কেয়ার</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-blue-100">
              হেলথকেয়ার হলো একটি আধুনিক ডিজিটাল স্বাস্থ্যসেবা প্ল্যাটফর্ম যা যেকোনো সময়, 
              যেকোনো জায়গায় বিশ্বস্ত চিকিৎসা সেবা প্রদান করে।
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FiPhone className="shrink-0" /> <span>০৯৬৭৭৮৮৫৫৯৯</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="shrink-0" /> <span>support@healthcare.com</span>
              </div>
            </div>

            {/* সোশ্যাল আইকন */}
            <div className="mt-5 flex gap-3">
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaLinkedinIn />} />
              <SocialIcon icon={<FaInstagram />} />
              <SocialIcon icon={<FaYoutube />} />
            </div>
          </div>

          {/* সেবাসমূহ */}
          <FooterColumn
            title="সেবাসমূহ"
            links={[
              "ভিডিও কনসালটেশন",
              "হোম ডায়াগনস্টিক",
              "হেলথ প্ল্যান",
              "জরুরী সহায়তা",
            ]}
          />

          {/* কোম্পানি */}
          <FooterColumn
            title="প্রতিষ্ঠান"
            links={[
              "আমাদের সম্পর্কে",
              "আমাদের ডাক্তারগণ",
              "ব্লগ",
              "জিজ্ঞাসিত প্রশ্ন (FAQs)",
            ]}
          />

          {/* লিগ্যাল */}
          <FooterColumn
            title="আইনগত"
            links={[
              "গোপনীয়তা নীতি",
              "শর্তাবলী",
              "যোগাযোগ করুন",
              "হাসপাতাল পার্টনার",
            ]}
          />
        </div>
      </div>

      {/* নিচের অংশ */}
      <div className="border-t border-blue-500/40 py-4 text-center text-sm text-blue-100">
        © {new Date().getFullYear()} হেলথকেয়ার। সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
};

export default Footer;

/* ---------------- সাব-কম্পোনেন্টস ---------------- */

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: string[];
}) => (
  <div>
    <h4 className="mb-4 text-[13px] font-bold uppercase tracking-widest text-white border-b border-white/20 pb-1 w-fit">
      {title}
    </h4>
    <ul className="space-y-3 text-[14px] text-blue-100">
      {links.map((link) => (
        <li key={link} className="hover:text-white cursor-pointer transition-colors duration-200">
          {link}
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-all duration-300">
    {icon}
  </div>
);