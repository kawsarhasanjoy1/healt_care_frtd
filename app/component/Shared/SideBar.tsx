"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import type { IconType } from "react-icons";

import SideBarItem, { type UserRole } from "@/app/utils/sidebar/sideBar";
import MenuRow from "../ui/MenuRow/MenuRow";

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
  onNavigate,
}: {
  role: UserRole;
  onNavigate?: () => void;
}) => {

  const pathname = usePathname();
  const menu = useMemo(() => SideBarItem(role) as MenuItem[], [role]);
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  const isActive = (href?: string) =>
    !!href && (pathname === href || pathname.startsWith(href + "/"));

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
        <div className="px-2 py-2 text-[11px] font-semibold tracking-wider text-slate-400">
          MENU
        </div>

        <ul className="space-y-1.5">
          {menu.map((item) => {
            const hasChildren = !!item.children?.length;
            const expanded = openTitle === item.title;

            const groupActive =
              isActive(item.path) ||
              (item.children?.some((c) => isActive(c.path)) as any);

            const onParentClick = () =>
              setOpenTitle(expanded ? null : item.title);

            return (
              <li key={item.title}>
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={onParentClick}
                    className="w-full text-left"
                    aria-expanded={expanded}
                  >
                    <MenuRow
                      title={item.title}
                      icon={item.icon}
                      active={groupActive}
                      right={
                        <FiChevronDown
                          className={cn(
                            "h-4 w-4 transition",
                            groupActive ? "text-white/80" : "text-slate-400",
                            expanded && "rotate-180"
                          )}
                        />
                      }
                    />
                  </button>
                ) : (
                  <Link href={`/dashboard/${item.path} `|| "#"} onClick={() => onNavigate?.()}>
                    <MenuRow
                      title={item.title}
                      icon={item.icon}
                      active={groupActive}
                    />
                  </Link>
                )}
                {hasChildren && (
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-200",
                      expanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul className="mt-2 space-y-1 pl-12">
                        {item.children!.map((child) => {
                          const childActive = isActive(child.path);

                          return (
                            <li key={child.path || child.title}>
                              <Link
                                href={`/dashboard/${child.path}` || "#"}
                                onClick={() => onNavigate?.()}
                                className={cn(
                                  "group flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
                                  childActive
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-slate-600 hover:bg-white hover:text-slate-900",
                                  "border border-transparent hover:border-slate-200/60"
                                )}
                              >
                                <child.icon
                                  className={cn(
                                    "h-4 w-4 transition",
                                    childActive
                                      ? "text-indigo-700"
                                      : "text-slate-400 group-hover:text-indigo-600"
                                  )}
                                />
                                <span className="truncate">{child.title}</span>
                                <span
                                  className={cn(
                                    "ml-auto h-1.5 w-1.5 rounded-full transition",
                                    childActive
                                      ? "bg-indigo-600"
                                      : "bg-slate-300 group-hover:bg-indigo-300"
                                  )}
                                />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar

