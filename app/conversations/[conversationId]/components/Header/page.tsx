"use client";
import Avatar from "@/app/components/Avatar";
import useOtherUsers from "@/app/hooks/useOtherUsers";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useMemo } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "../ProfileDrawer";

interface IHeader {
  conversation:
    | (Conversation & {
        users: User[];
      })
    | any;
}

const Header: React.FC<IHeader> = ({ conversation }) => {
  const otherUser = useOtherUsers(conversation);

  const [drawerOpen,setDrawerOpen] = React.useState(false) 
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.legnth} members`;
    }

    return "Active";
  }, [conversation]);

  return (

    <>
    <ProfileDrawer
      isOpen={drawerOpen}
      onClose={()=>setDrawerOpen(false)}
      data={conversation}
    />
    <div className="bg-whtie w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link
          className="lg:hidden block text-sky-500 hover:text-sky-600 transitaion cursour-pointer"
          href="/conversations"
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <div>{conversation?.name || otherUser?.name}</div>
          <div className="">{statusText}</div>
        </div>
      </div>

      <HiEllipsisHorizontal
        size={32}
        onClick={() => setDrawerOpen(true)}
        className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
      />
    </div>
    </>
  );
};

export default Header;
