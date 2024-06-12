import SideBar from "@/components/side-bar";
import SidebarSheet from "@/components/sidebar-sheet";
import React, { ReactNode } from "react";

type Props = { children: ReactNode };

const layout = ({ children }: Props) => {
  return (
    <div>
      <div className="md:block hidden fixed left-0 top-0 w-52 border-r h-screen">
      <SideBar />
      </div>
      <div className="md:hidden block fixed top-8 right-8">
        <SidebarSheet>
        <SideBar/>
          </SidebarSheet>
      </div>
 
      <main className="md:p-14 p-6 md:pl-60 bg-slate-100 min-h-screen">{children}</main>
    </div>
  );
};

export default layout;
