import {
  adminLogo,
  dashboardIcon,
  logoutIcon,
  ordersIcon,
  productIcon,
  settingsIcon,
  usersIcon,
} from "@/assets";
import SidebarItem from "@/lib/components/SidebarItem";
import Image from "next/image";

const sidebarItems = [
  {
    href: "/admin/dashboard",
    title: "Dashboard",
    icon: dashboardIcon,
  },
  {
    href: "/admin/products",
    title: "Products",
    icon: productIcon,
  },
  {
    href: "/admin/orders",
    title: "Orders",
    icon: ordersIcon,
  },
  {
    href: "/admin/customers",
    title: "Customers",
    icon: usersIcon,
  },
  {
    href: "/admin/settings",
    title: "Settings",
    icon: settingsIcon,
  },
  {
    href: "/admin/logout",
    title: "Logout",
    icon: logoutIcon,
  },
];

export default function AdminSidebar() {
  return (
    <aside className="flex flex-col items-center gap-y-16 bg-white px-4 py-8">
      <Image src={adminLogo} alt="admin logo" />
      <ul className="flex w-full flex-col gap-y-4">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </ul>
    </aside>
  );
}
