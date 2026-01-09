"use client";
import Drawer from "@/app/component/Shared/Drawer";
import { useAppSelector } from "@/app/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  // const router = useRouter()
  // const {user} = useAppSelector((store) => store.auth)
  // const role = user?.role?.toLowerCase() as any;

  // const path = usePathname().split("/")[2];
  // if (!(path === role)) {
  //   router.push('/login')
  // }
  // if (!role) {
  //   router.push('/login')
  // }
  return (
    <div>
      <Drawer children={children} />
    </div>
  );
};

export default DashboardLayout;
