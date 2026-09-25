import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface SideBar {
  isOpen: boolean;
  toggleSideBar: () => void;
}

export default function SideBarButton({ isOpen, toggleSideBar }: SideBar) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSideBar}
      className="h-9 w-9 rounded-full text-stone-700 hover:bg-stone-200/60 hover:text-stone-950 lg:hidden"
    >
      {isOpen ? <X size={20} /> : <Menu size={20} />}
    </Button>
  );
}
