"use client";
import { AlignHorizontalSpaceAround, ArrowUpFromLine, BookOpen, ClipboardPlus, LayoutDashboard, PercentCircle, Presentation } from "lucide-react";
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
      active: pathname.split('/')[2]==="main",
      icon: <Presentation  className="w-4 h-4"/>,
    },
    {
      label: "Blogs",
      href: "/dashboard/blogs",
      active:pathname.split('/')[2]==="blogs",
      icon: <BookOpen  className="w-4 h-4"/>,
    },
    {
      label: "Services",
      href: "/dashboard/services",
      active: pathname.split('/')[2]==="services",
      icon: <ClipboardPlus  className="w-4 h-4"/>,
    },
    {
      label: "Service Item",
      href: "/dashboard/service-items",
      active:pathname.split('/')[2]==="service-items",
      icon: <AlignHorizontalSpaceAround className="w-4 h-4"/>,
    },
    {
      label: "Offers",
      href: "/dashboard/offers",
      active:pathname.split('/')[2]==="offers",
      icon: <PercentCircle className="w-4 h-4"/>,
    },
    {
      label: "Subscriptions",
      href: "/dashboard/subscriptions",
      active:pathname.split('/')[2]==="subscriptions",
      icon: <ArrowUpFromLine className="w-4 h-4"/>,
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
