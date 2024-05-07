"use client";
import React from "react";
import useRoutes from "@/app/hooks/useRoutes";
import DesktopSidebarItem from "./DesktopSidebarItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import SettingModal from "../SettingModal";

interface IDesktopSidebar {
  user: User;
}
const DesktopSidebar: React.FC<IDesktopSidebar> = ({ user }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = React.useState(false);
  console.log({ user });

  return (
    <>
    <SettingModal
      isOpen={isOpen}
      onClose={()=>setIsOpen(false)}
      currentUser={user}
    />
    <div
      className="
            hidden
            lg:fixed
            lg:inset-y-0
            lg:left-0
            lg:z-40
            lg:w-20
            xl:px-6
            lg:overflow-y-auto
            lg:bg-white
            lg:border-r-[1px]
            lg:pb-4
            lg:flex
            lg:flex-col
            justify-between
          "
    >
      <nav className="mt-4 flex flex-col justify-between">
        <ul className="flex flex-col items-center space-y-1">
          {routes.map((route) => (
            <DesktopSidebarItem
              key={route.href}
              lable={route.lable}
              icon={route?.icon}
              href={route.href}
              active={route.active}
              onClick={route?.onClick}
            />
          ))}{" "}
        </ul>
      </nav>

      <nav
        className="mt-4 flex flex-col items-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        <div className="cursor-pointer hover:opacity-5 transition">
          <Avatar user={user} />
        </div>
      </nav>
    </div>
    
    </>
  );
};

export default DesktopSidebar;
