"use client";
import { BookOpen, LayoutDashboard, Presentation } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import SignoutButton from "./signout-button";

type Props = {};

const NavLinks = (props: Props) => {
  const pathname = usePathname();

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      active: pathname === "/dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      label: "Main page",
      href: "/dashboard/main",
      active: pathname === "/dashboard/main",
      icon: <Presentation  className="w-4 h-4"/>,
    },
    {
      label: "Blogs",
      href: "/dashboard/blogs",
      active: pathname === "/dashboard/blogs",
      icon: <BookOpen  className="w-4 h-4"/>,
    },
    {
      label: "Services",
      href: "/dashboard/services",
      active: pathname === "/dashboard/blogs",
      icon: <BookOpen  className="w-4 h-4"/>,
    },
  ];
  return (
    <div className="flex flex-col gap-1 w-full  flex-1">
      {links.map((link) => (
        <Button key={link.href} asChild variant={link.active ? 'secondary' : 'ghost'} className="flex justify-start gap-2">
          <Link  href={link.href}>{link.icon}{link.label}</Link>
        </Button>
      ))}
      <div className="mt-auto w-full">
<SignoutButton/>
      </div>
    </div>
  );
};

export default NavLinks;
