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
    href: "/cart",
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
      className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-[115%]"} fixed bottom-4 left-4 top-24 z-[60] flex w-[17rem] flex-col items-start gap-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-lg transition-transform duration-300 lg:sticky lg:top-28 lg:z-10 lg:w-full lg:translate-x-0 lg:shadow-sm [&>*]:flex-shrink-0`}
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
