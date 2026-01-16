"use client";

import { useGetMeQuery } from "@/app/redux/api/userApi";
import { useEffect, useId, useRef, useState } from "react";
import { FiBell, FiMenu, FiSearch } from "react-icons/fi";
import HCButton from "../ui/Button/HCButton";
import { useUpPatiantDonorStatusMutation } from "@/app/redux/api/patiantApi";
import toast from "react-hot-toast";
import ReusableModal from "../Reusible/Model/ReusibleModel";
import BloodDonateForm from "@/app/(dashboardLayout)/dashboard/patiant/component/DonateForm";

const getInitials = (name: string) => {
  const parts = name?.trim().split(/\s+/)?.filter(Boolean);
  const first = parts?.[0]?.[0] ?? "";
  const last = parts?.length > 1 ? parts?.[parts?.length - 1][0] : "";
  return (first + last).toUpperCase();
};

const Topbar = ({
  onMenu,
  onLogout,
}: {
  onMenu: () => void;
  onLogout: () => void;
}) => {
  const { data } = useGetMeQuery(undefined);
  const user = data?.data;
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const menuId = useId();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (!open) return;
      const el = wrapRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);
  const [upDonorStatus, { isLoading }] = useUpPatiantDonorStatusMutation();
  const handleToDonorStatus = async () => {
    try {
      const res = await upDonorStatus().unwrap();
      console.log(res);
      if (res?.success) {
        toast.success("You are donor now");
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const donateModal = () => {
    setOpenModal(!openModal);
  };
  console.log(openModal);
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center gap-3 px-4 md:px-6">
        <button
          onClick={onMenu}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <FiMenu className="h-5 w-5" />
        </button>

        <div className="hidden flex-1 lg:block">
          <div className="relative max-w-xl">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {user?.role === "PATIANT" &&
            (user?.isDonor ? (
              <HCButton onClick={donateModal} variant="danger">
                Donate Now
              </HCButton>
            ) : (
              <HCButton
                isLoading={isLoading}
                disabled={isLoading}
                onClick={handleToDonorStatus}
                variant="primary"
              >
                Become a donor
              </HCButton>
            ))}
          <button
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Notifications"
          >
            <FiBell className="h-5 w-5" />
          </button>
          {openModal ? (
            <ReusableModal
              open={openModal}
              title="Complete Your Donor Profile"
              onClose={() => setOpenModal(false)}
              heightClassName="h-auto max-h-[90vh]" 
            >
              <BloodDonateForm
                user={user}
                onSuccess={() => setOpenModal(false)}
              />
            </ReusableModal>
          ) : (
            ""
          )}
          <div className="relative" ref={wrapRef}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-slate-200 ring-1 ring-slate-200 hover:ring-slate-300"
              aria-label="Open profile menu"
              aria-haspopup="menu"
              aria-expanded={open}
              aria-controls={menuId}
            >
              {user?.profilePhoto ? (
                <img
                  src={user?.profilePhoto}
                  alt={`${user?.name} avatar`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs font-semibold text-slate-700">
                  {getInitials(user?.name)}
                </span>
              )}
            </button>

            {open && (
              <div
                id={menuId}
                role="menu"
                className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
              >
                <div className="px-3 py-2">
                  <div className="text-sm font-semibold text-slate-900">
                    {user?.name}
                  </div>
                  <div className="text-xs text-slate-500">{user?.email}</div>
                </div>

                <div className="my-2 border-t border-slate-100 " />

                <div className=" px-3">
                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 px-5 py-1 text-white rounded-md"
                    role="menuitem"
                    onClick={async () => {
                      setOpen(false);
                      await onLogout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
