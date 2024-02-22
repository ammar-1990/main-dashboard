"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import React, { ReactNode, useEffect, useState } from "react";

type Props = { children: ReactNode };

const SidebarSheet = ({ children }: Props) => {

  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="px-0 pb-1">{children}</SheetContent>
    </Sheet>
  );
};

export default SidebarSheet;
