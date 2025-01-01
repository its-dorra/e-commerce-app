"use client";
import { useAccountSidebarStore } from "@/lib/stores/account-sidebar.store";

import SidebarItem from "@/lib/components/SidebarItem";
import {
  cartIcon,
  deliveryIcon,
  heartIcon,
  logoutIcon,
  ordersIcon,
  userIcon,
} from "@/assets";

export const accountSidebarItems = [
  {
    id: 5,
    href: "/account/account-details",
    title: "Account Details",
    icon: userIcon,
  },
  {
    id: 1,
    href: "/account/orders",
    title: "Orders",
    icon: ordersIcon,
  },
  {
    id: 2,
    href: "/account/cart",
    title: "Cart",
    icon: cartIcon,
  },
  {
    id: 3,
    href: "/account/address",
    title: "Address",
    icon: deliveryIcon,
  },
  {
    id: 4,
    href: "/account/wishlist",
    title: "Wishlist",
    icon: heartIcon,
  },

  {
    id: 6,
    href: "/account/logout",
    title: "Logout",
    icon: logoutIcon,
  },
];

export default function AccountSidebar() {
  const { isSidebarOpen } = useAccountSidebarStore();

  return (
    <aside
      className={`${isSidebarOpen ? "-translate-x-6" : "-translate-x-[125%]"} absolute bottom-0 left-6 top-0 z-50 flex w-64 flex-col items-start gap-y-4 rounded-sm border bg-white p-6 transition-transform lg:static lg:translate-x-0 lg:border-b-0 lg:border-l-0 lg:border-r-[0.5px] lg:border-t-0 [&>*]:flex-shrink-0`}
    >
      {accountSidebarItems.map((item) => (
        <SidebarItem
          key={item.id}
          title={item.title}
          href={item.href}
          icon={item.icon}
        />
      ))}
    </aside>
  );
}
