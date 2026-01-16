"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import type { IconType } from "react-icons";

import SideBarItem, { type UserRole } from "@/app/utils/sidebar/sideBar";
import MenuRow from "../ui/MenuRow/MenuRow";
import { FaHome } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";
import { MdOutlineHistory } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";

type MenuItem = {
  title: string;
  path?: string;
  icon: IconType;
  children?: MenuItem[];
};

const cn = (...c: Array<string | false | undefined | null>) =>
  c.filter(Boolean).join(" ");

const Sidebar = ({
  role,
  users,
  onNavigate,
}: {
  role: UserRole;
  users: any;
  onNavigate?: () => void;
}) => {
  const pathname = usePathname();

  const menu = useMemo(
    () => SideBarItem(role, users) as MenuItem[],
    [role, users]
  );

  const [openTitle, setOpenTitle] = useState<string | null>(null);
  const checkActive = (path?: string) => {
    if (!path) return false;

    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    const targetPath = cleanPath.startsWith("dashboard")
      ? `/${cleanPath}`
      : `/dashboard/${cleanPath}`;
    return pathname === targetPath || pathname === `${targetPath}/`;
  };

  return (
    <aside className="h-screen w-[290px] border-r border-slate-200/70 bg-gradient-to-b from-white via-white to-slate-50">
      <div className="px-5 py-5">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-3 shadow-sm backdrop-blur">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-sm">
            <span className="text-lg font-semibold">T</span>
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-slate-900">
              TailAdmin
            </div>
            <div className="truncate text-xs text-slate-500">Admin Panel</div>
          </div>
        </div>
      </div>

      <nav className="h-[calc(100vh-92px)] overflow-y-auto px-4 pb-6">
        <div className="px-2 py-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          Main Menu
        </div>

        <ul className="space-y-1.5">
          {menu.map((item) => {
            const hasChildren = !!item.children?.length;
            const expanded = openTitle === item.title;
            
            // চাইল্ড একটিভ কি না চেক
            const isAnyChildActive = item.children?.some((c) =>
              checkActive(c.path)
            );
            
            // প্যারেন্ট শুধু তখনই একটিভ হবে যখন সরাসরি ওই পাথে থাকবে
            const groupActive = checkActive(item.path);

            return (
              <li key={item.title}>
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => setOpenTitle(expanded ? null : item.title)}
                    className={cn(
                      "w-full transition-colors",
                      // যদি চাইল্ড একটিভ থাকে, প্যারেন্টের টেক্সট একটু ডার্ক হবে
                      isAnyChildActive && "text-slate-900 font-medium" 
                    )}
                  >
                    <MenuRow
                      title={item.title}
                      icon={item.icon}
                      active={groupActive as any}
                      right={
                        <FiChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-300 inline-block", 
                            expanded ? "rotate-180" : "rotate-0",
                            isAnyChildActive && "text-indigo-600"
                          )}
                        />
                      }
                    />
                  </button>
                ) : (
                  <Link className="" href={`/dashboard/${item.path}`} onClick={onNavigate}>
                    <MenuRow
                      title={item.title}
                      icon={item.icon}
                      active={checkActive(item.path)}
                    />
                  </Link>
                )}

                {hasChildren && expanded && (
                  <ul className="mt-1 space-y-0.5 pl-6 border-l ml-5 border-slate-100">
                    {item.children?.map((child) => (
                      <li key={child.path}>
                        <Link
                          href={`/dashboard/${child.path}`}
                          onClick={onNavigate}
                        >
                          <MenuRow
                            title={child.title}
                            icon={child.icon}
                            active={checkActive(child.path)}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <div className="my-4 border-t border-2 border-slate-100"></div>

        <ul className="space-y-0.5">
          <li className="mt-[10px]">
            <Link href={"/"} onClick={onNavigate}>
              <MenuRow title={"Home"} icon={FaHome} active={pathname === "/"} />
            </Link>
          </li>

          {role === "patiant" && (
            <div className="space-y-0.5  mt-2">
              {users?.isDonor && (
                <div className=" space-y-2">
                  <div>
                    <Link
                      href={`/dashboard/${role}/incoming-blood-requests`}
                      onClick={onNavigate}
                    >
                      <MenuRow
                        title={"Incoming Requests"}
                        icon={CiCircleInfo}
                        active={checkActive(`${role}/incoming-blood-requests`)}
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={`/dashboard/${role}/my-blood-donation`}
                      onClick={onNavigate}
                    >
                      <MenuRow
                        title={"My Blood Donation"}
                        icon={BiSolidDonateBlood}
                        active={checkActive(`${role}/my-blood-donation`)}
                      />
                    </Link>
                  </div>
                </div>
              )}

              {users?.isNeedBlood && (
                <div className=" space-y-2">
                  <div>
                    <Link
                      href={`/dashboard/${role}/available-donors`}
                      onClick={onNavigate}
                    >
                      <MenuRow
                        title={"Available Donors"}
                        icon={BiSolidDonateBlood}
                        active={checkActive(`${role}/available-donors`)}
                      />
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={`/dashboard/${role}/my-sent-requests`}
                      onClick={onNavigate}
                    >
                      <MenuRow
                        title={"Request History"}
                        icon={MdOutlineHistory}
                        active={checkActive(`${role}/my-sent-requests`)}
                      />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;