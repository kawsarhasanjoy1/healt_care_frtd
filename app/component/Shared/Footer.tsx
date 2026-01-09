"use client";

import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r  from-blue-600 to-blue-700 text-white">
      <div className="mx-auto max-w-[1420px] py-14 px-2">
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Health<span className="text-blue-200">Care</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-blue-100">
              HealthCare is a modern digital healthcare platform providing
              trusted medical services anytime, anywhere.
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <FiPhone /> <span>09677885599</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMail /> <span>support@healthcare.com</span>
              </div>
            </div>

            {/* Social */}
            <div className="mt-5 flex gap-3">
              <SocialIcon icon={<FaFacebookF />} />
              <SocialIcon icon={<FaLinkedinIn />} />
              <SocialIcon icon={<FaInstagram />} />
              <SocialIcon icon={<FaYoutube />} />
            </div>
          </div>

          {/* Services */}
          <FooterColumn
            title="Services"
            links={[
              "Video Consultation",
              "Home Diagnostics",
              "Health Plans",
              "Emergency Support",
            ]}
          />

          {/* Company */}
          <FooterColumn
            title="Company"
            links={[
              "About Us",
              "Our Doctors",
              "Blogs",
              "FAQs",
            ]}
          />

          {/* Legal */}
          <FooterColumn
            title="Legal"
            links={[
              "Privacy Policy",
              "Terms of Service",
              "Contact Us",
              "Hospital Partners",
            ]}
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-blue-500/40 py-4 text-center text-sm text-blue-100">
        © {new Date().getFullYear()} HealthCare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

/* ---------------- components ---------------- */

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: string[];
}) => (
  <div>
    <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
      {title}
    </h4>
    <ul className="space-y-2 text-sm text-blue-100">
      {links.map((link) => (
        <li key={link} className="hover:text-white cursor-pointer">
          {link}
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/15 hover:bg-white/25">
    {icon}
  </div>
);
