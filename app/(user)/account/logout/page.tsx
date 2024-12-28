"use client";

import { logout } from "@/lib/features/user/services";
import { authEvents } from "@/lib/providers/user-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await logout();
        window.dispatchEvent(new Event(authEvents.authChange));
        toast.success("You logged out successfully");
        router.replace("/");
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  return null;
}
