"use client";
import { useState } from "react";
import Sidebar from "./SideBar";
import Topbar from "./TopBar";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { logOut } from "@/app/redux/api/fetures/auth";
import { useRouter } from "next/navigation";
import { removeUser } from "@/app/services/auth.services";
import Cookies from "js-cookie";
import { authKey } from "@/app/constance/authKey";

const Drawer = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleToLogout = async () => {
    dispatch(logOut());
    Cookies.remove(authKey)
    removeUser()
    router.replace("/login");
  };
  const { user } = useAppSelector((store) => store.auth);
  const role = user?.role?.toLowerCase()
  return (
    <div className="min-h-screen bg-slate-50">
      {sidebarOpen && (
        <button
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={[
          "fixed inset-y-0 left-0 z-50 w-[280px] transform bg-white transition-transform duration-200 lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <Sidebar
          role={role as any}
          onNavigate={() => setSidebarOpen(false)}
        />
      </div>

      <div className="flex min-h-screen">
        <div className="hidden lg:block">
          <Sidebar role={role as any} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar
            onMenu={() => setSidebarOpen(true)}
            onLogout={handleToLogout}
          />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
