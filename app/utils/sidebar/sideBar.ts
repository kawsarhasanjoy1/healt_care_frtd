import { USER_ROLE } from "@/app/constance/constance";
import {
  FaBlogger,
  FaUserSecret,
  FaUserShield,
} from "react-icons/fa";
import { FaStaffSnake, FaUsersGear, FaUsersRectangle } from "react-icons/fa6";
import { GrFormSchedule, GrUserAdmin } from "react-icons/gr";
import { IoIosCreate, IoMdCalendar } from "react-icons/io";
import {
  MdAccountCircle,
  MdAddBox,
  MdLibraryAdd,
  MdOutlineDashboard,
  MdOutlineSchedule,
  MdOutlineShoppingCart,
  MdPayment,
  MdReviews,
} from "react-icons/md";

export type UserRole = keyof typeof USER_ROLE;

const SideBarItem = (role: UserRole) => {
  const roleMenu: Record<string, any>[] = [];
  switch (role) {
    case USER_ROLE.super_admin:
      roleMenu.push(
        {
          title: "Dashboard",
          path: `/${role}`,
          icon: MdOutlineDashboard,
        },
   
       {
          title: "Admins",
          icon: GrUserAdmin,
          children: [
            {
              title: "Create Admin",
              path: `/${role}/admins/create-admin`,
              icon: IoIosCreate,
            },
            {
              title: "All Admin",
              path: `/${role}/admins`,
              icon: FaUsersRectangle,
            },
          ],
        },
        {
          title: "Doctors",
          icon: MdAddBox,
          children: [
             {
              title: "Create Doctor",
              path: `/${role}/doctors/create-doctors`,
              icon: IoIosCreate,
            },
            {
              title: "All Doctor",
              path: `/${role}/doctors`,
              icon: FaUsersRectangle,
            },
          ]
        },
        {
          title: "Schedules",
          icon: GrFormSchedule,
          children: [
             {
              title: "Create Schedule",
              path: `/${role}/schedule/create-schedule`,
              icon: IoIosCreate,
            },
            {
              title: "All Schedules",
              path: `/${role}/schedule`,
              icon: FaUsersRectangle,
            },
          ]
        },
        {
          title: "Specialties",
          icon: FaStaffSnake,
          children: [
             {
              title: "Create Specialties",
              path: `/${role}/specialties/create-specialties`,
              icon: IoIosCreate,
            },
            {
              title: "All Specialties",
              path: `/${role}/specialties`,
              icon: FaUsersRectangle,
            },
          ]
        },

        {
          title: "Patiant",
          path: `/${role}/patiant`,
          icon: FaUserSecret,
        },
        {
          title: "Users",
          path: `/${role}/users`,
          icon: FaUsersGear,
        },
        {
          title: "Blogs",
          icon: FaBlogger,
          children: [
            {
              title: "All Blogs",
              path: `/${role}/blog`,
              icon: FaBlogger,
            },
            {
              title: "Create Blog",
              path: `/${role}/blog/create-blog`,
              icon: MdLibraryAdd,
            },
          ],
        },
        {
          title: "Reviews",
          path: `/${role}/reviews`,
          icon: MdReviews,
        },
        {
          title: "Profile",
          path: `/${role}/my-profile`,
          icon: MdAccountCircle,
        }
      );
      break;
    case USER_ROLE.admin:
      roleMenu.push(
        {
          title: "Dashboard",
          path: `/${role}`,
          icon: MdOutlineDashboard,
        },
        {
          title: "Payments-history",
          path: `/${role}/payments`,
          icon: MdPayment,
        },
        {
          title: "Create Admin",
          path: `/${role}/create-admin`,
          icon: FaUserShield,
        },
        {
          title: "Create Doctor",
          path: `/${role}/create-admin`,
          icon: FaUserShield,
        },
        {
          title: "Users",
          path: `/${role}/users`,
          icon: FaUsersGear,
        },
        {
          title: "Blogs",
          icon: FaBlogger,
          children: [
            {
              title: "All Blogs",
              path: `/${role}/blog`,
              icon: FaBlogger,
            },
            {
              title: "Create Blog",
              path: `/${role}/blog/create-blog`,
              icon: MdLibraryAdd,
            },
          ],
        },
        {
          title: "Reviews",
          path: `/${role}/reviews`,
          icon: MdReviews,
        },
        {
          title: "Profile",
          path: `/${role}/my-profile`,
          icon: MdAccountCircle,
        }
      );
      break;
    case USER_ROLE.doctor:
      roleMenu.push(
        {
          title: "Dashboard",
          path: `/${role}`,
          icon: MdOutlineDashboard,
        },
        {
          title: "Schedule",
          icon: GrFormSchedule,
          children: [
            {
              title: "Create Schedule",
              path: `/${role}/doctor-schedule/create-doctor-schedule`,
              icon: IoIosCreate
            },
            {
              title: "Schedules",
              path: `/${role}/doctor-schedule`,
              icon: MdOutlineSchedule
            }
          ]
        },
         {
          title: "Appoinment",
          path: `/${role}/appoinment`,
          icon: IoMdCalendar,
        },
        {
          title: "Payment-History",
          path: `/${role}/payment-history`,
          icon: MdPayment,
        },
        {
          title: "Review",
          path: `/${role}/my-review`,
          icon: MdReviews,
        },
        {
          title: "Profile",
          path: `/${role}/my-profile`,
          icon: MdAccountCircle,
        }
      );
      break
      case USER_ROLE.patiant: 
      roleMenu.push(
         {
          title: "Dashboard",
          path: `/${role}`,
          icon: MdOutlineDashboard,
        },
         {
          title: "Appoinment",
          path: `/${role}/appoinment`,
          icon: IoMdCalendar,
        },
         {
          title: "Payment",
          path: `/${role}/my-payment`,
          icon: MdPayment,
        },
         {
          title: "Review",
          path: `/${role}/my-review`,
          icon: MdReviews,
        },
        {
          title: "Profile",
          path: `/${role}/my-profile`,
          icon: MdAccountCircle,
        }
      )
  }
  return [...roleMenu];
};

export default SideBarItem;
