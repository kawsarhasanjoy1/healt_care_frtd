"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiKey,
} from "react-icons/fi";
import HCForm from "../component/Form/HCForm/HCForm";
import HCInput from "../component/Form/HCInput/HCIput";
import HCImageUploader from "../component/Form/HCInput/HCUpload";
import { useCreatePatientMutation } from "../redux/api/userApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



const defaultRegisterValue = {
  name: "",
  email: "",
  password: "",
  contactNumber: "",
  profilePhoto: ""
};

const PatientRegisterPage = () => {
  const router = useRouter()
  const [createPatient,{data}] = useCreatePatientMutation()
  const handleRegister = async(data: any) => {
    const userData = {
      password: data?.password,
      patient: {
        name: data?.name,
        email: data?.email,
        contactNumber: data?.contactNumber
      }
    }
    const image = data?.profilePhoto?.[0]
    
    const formData = new FormData()
     formData.append('file', image)
     formData.append('data', JSON.stringify(userData))
     try{
      const res = await createPatient(formData).unwrap()
      if (res?.success) {
        toast.success(res?.message)
        router.push('/login')
      }
     }catch(err: any){
      toast.error(err?.data?.message)
     }
   
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="fixed left-7 top-6 z-10 flex items-center gap-2 select-none">
        <div className="relative h-5 w-5">
          <span className="absolute left-0 top-1/2 h-2 w-5 -translate-y-1/2 rounded bg-rose-400" />
          <span className="absolute left-1/2 top-0 h-5 w-2 -translate-x-1/2 rounded bg-rose-400" />
        </div>
        <span className="text-sm font-extrabold tracking-wide text-teal-800">
          Health Care
        </span>
      </div>

      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-[1.2fr_1fr]">
        {/* Left illustration */}
        <section className="hidden md:flex items-center justify-center">
          <Image
            src="https://i.postimg.cc/kn8VqM13/3719220.jpg"
            width={600}
            height={600}
            alt="Health Care Illustration"
            priority
          />
        </section>

  
        <section className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_16px_40px_rgba(8,20,26,.08)] space-y-3">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-9 w-9">
                <span className="absolute left-0 top-1/2 h-3 w-9 -translate-y-1/2 rounded-md bg-rose-400" />
                <span className="absolute left-1/2 top-0 h-9 w-3 -translate-x-1/2 rounded-md bg-rose-400" />
              </div>
              <div className="font-bold text-xl">Health Care</div>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900">
              Create Patient Account
            </h2>
            <p className="text-sm text-slate-500">
              Register to access doctor services
            </p>

            {/* Form */}
            <HCForm onsubmit={handleRegister} defaultValues={defaultRegisterValue}>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput name="name" placeholder="Full Name" type="text" />
              </div>

              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput
                  name="email"
                  type="email"
                  placeholder="health@care.gmail.com"
                />
              </div>

              <div className="relative">
                <FiKey className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput
                  name="password"
                  type="password"
                  placeholder="Create Password"
                />
              </div>

              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <HCInput
                  name="contactNumber"
                  placeholder="Contact Number"
                  type="number"
                />
              </div>
              <div className="">
               
                <HCImageUploader  name="profilePhoto"/>
              </div>

              

              <button
                type="submit"
                className="mt-2 h-11 w-full rounded-md bg-teal-500 text-sm font-semibold text-white hover:bg-teal-600 active:bg-teal-700"
              >
                Register
              </button>

              <div className="flex gap-2 justify-center items-center pt-3 text-sm text-slate-500">
                Already have an account?
                <Link
                  href="/login"
                  className="font-semibold text-teal-600 hover:underline"
                >
                  Login
                </Link>
              </div>
            </HCForm>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PatientRegisterPage;
