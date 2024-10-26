import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface SideBar {
  isOpen: boolean;
  toggleSideBar: () => void;
}

export default function SideBarButton({ isOpen, toggleSideBar }: SideBar) {
  return (
    <Button
      onClick={toggleSideBar}
      className="flex h-10 w-10 flex-col items-center justify-center gap-y-0.5 rounded-md border-[1px] hover:bg-gray-300 lg:hidden"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </Button>
  );
}
