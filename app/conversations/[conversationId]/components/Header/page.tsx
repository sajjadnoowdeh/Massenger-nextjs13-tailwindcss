"use client";
import useOtherUsers from "@/app/hooks/useOtherUsers";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useMemo } from "react";
import { HiChevronLeft } from "react-icons/hi";

interface IHeader {
  conversation:
    | (Conversation & {
        users: User[];
      })
    | any;
}

const Header: React.FC<IHeader> = ({ conversation }) => {
  const otherUser = useOtherUsers(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.legnth} members`;
    }

    return "Active";
  }, [conversation]);
  return (
    <div className="bg-whtie w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link
          className="lg:hidden block text-sky-500 hover:text-sky-600 transitaion cursour-pointer"
          href="/conversations"
        >
            <HiChevronLeft size={32} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
