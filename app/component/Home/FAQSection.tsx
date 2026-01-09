// components/FAQ.tsx
"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  { question: "আমরা কী কী রোগ বা সমস্যা চিকিৎসা করি?", answer: "আমরা বিভিন্ন ধরণের সাধারণ ও বিশেষায়িত রোগ, স্বাস্থ্য সমস্যা এবং জরুরি অবস্থা সহ চিকিৎসা প্রদান করি।" },
  { question: "এটি কীভাবে কাজ করে?", answer: "আপনি আমাদের প্ল্যাটফর্মে লগইন করে ডাক্তার নির্বাচন, সময় নির্ধারণ এবং অনলাইনে পরামর্শ নিতে পারবেন।" },
  { question: "স্বাস্থ্য পরামর্শ দিচ্ছেন কারা?", answer: "পরামর্শ দিচ্ছেন বিভিন্ন বিশেষায়িত ও অভিজ্ঞ নিবন্ধিত ডাক্তাররা।" },
  { question: "নিবন্ধিত ডাক্তাররা কি যাচাইপ্রাপ্ত?", answer: "হ্যাঁ, সকল ডাক্তার সরকারি এবং প্রফেশনাল লাইসেন্স অনুযায়ী যাচাইপ্রাপ্ত।" },
  { question: "ডাক্তাররা কখন পরামর্শ দেওয়ার জন্য উপলব্ধ থাকেন?", answer: "ডাক্তাররা সাধারণত সপ্তাহের সাতদিন, সকাল ৮টা থেকে রাত ৮টা পর্যন্ত উপলব্ধ থাকেন। জরুরি ক্ষেত্রে ২৪/৭ পরিষেবা।" },
  { question: "আমি কি নিজের পছন্দের ডাক্তার নির্বাচন করতে পারি?", answer: "হ্যাঁ, আপনি আপনার পছন্দের ডাক্তার নির্বাচন করে পরামর্শ নিতে পারবেন।" },
  { question: "পরামর্শের জন্য আমাকে কত টাকা দিতে হবে?", answer: "পরামর্শের খরচ নির্ভর করে ডাক্তার এবং পরামর্শের ধরনের উপর।" },
  { question: "আমি কীভাবে পেমেন্ট করতে পারি?", answer: "আপনি ক্রেডিট/ডেবিট কার্ড, বিকাশ, নগদ বা অনলাইন পেমেন্ট গেটওয়ের মাধ্যমে পেমেন্ট করতে পারবেন।" },
  { question: "পেমেন্ট করার পর যদি আমি পরামর্শ বাতিল করি, তাহলে কিভাবে টাকা ফেরত পাবো?", answer: "নির্দিষ্ট সময়ের মধ্যে বাতিল করলে টাকা সম্পূর্ণ ফেরত পাবেন। বিস্তারিত নীতি আমাদের টার্মস & কন্ডিশনে পাওয়া যাবে।" },
  { question: "আমার ডেটা কি নিরাপদ?", answer: "হ্যাঁ, আমরা উন্নত এনক্রিপশন এবং নিরাপদ সার্ভারের মাধ্যমে আপনার ব্যক্তিগত ও মেডিকেল ডেটা সুরক্ষিত রাখি।" },
  { question: "ভিডিও পরামর্শের আগে কি আমাকে কিছু প্রস্তুতি নিতে হবে?", answer: "পরামর্শের আগে নিশ্চিত করুন আপনার ইন্টারনেট সংযোগ, ক্যামেরা এবং মাইক্রোফোন ঠিকভাবে কাজ করছে।" },
  { question: "আমার পরামর্শের জন্য কিভাবে প্রেসক্রিপশন পাবো?", answer: "ডাক্তার পরামর্শ শেষে প্রয়োজনে ডিজিটাল প্রেসক্রিপশন ইমেইল বা প্ল্যাটফর্মের মাধ্যমে প্রদান করবেন।" },
  { question: "যদি ডাক্তার দেখেন যে আমার সমস্যা ভিডিও কলের মাধ্যমে চিকিৎসা করা সম্ভব নয়, তাহলে কী হবে?", answer: "ডাক্তার আপনাকে প্রয়োজনীয় ফিজিক্যাল চেকআপ বা নিকটস্থ হাসপাতালের রেফারেল দেবেন।" },
  { question: "আমি কি বাংলাদেশ ছাড়াও পরামর্শ নিতে পারি?", answer: "হ্যাঁ, আপনি যে কোনো দেশ থেকে অনলাইনে পরামর্শ নিতে পারবেন।" },
  { question: "কে নিশ্চিত করে যে সঠিক ডাক্তার পরামর্শ দিচ্ছেন?", answer: "আমাদের নিয়মিত যাচাই ও মনিটরিং প্রক্রিয়ার মাধ্যমে নিশ্চিত করা হয় যে ডাক্তারের তথ্য সঠিক এবং বৈধ।" },
  
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-5xl mx-auto p-6 md:p-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-blue-700">
        প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border rounded-xl shadow-sm overflow-hidden">
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="font-medium text-lg">{item.question}</span>
              <span className="ml-2 text-2xl text-blue-600">   {activeIndex === index ? "−" : "+"}</span>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                activeIndex === index ? "max-h-96 p-4 border-t bg-gray-50 text-gray-700" : "max-h-0 p-0 border-0"
              }`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
