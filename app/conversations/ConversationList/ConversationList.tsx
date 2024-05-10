"use client";
import { Conversation, User } from "@prisma/client";
import { FullConvresationType } from "@/app/types";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversationl";
import { MdOutlineGroupAdd } from "react-icons/md";
import clsx from "clsx";
import ConversationBox from "../components/ConversationBox";
import GroupModalChat from "../components/GroupModalChat";
interface IConversatonList {
  initItems: FullConvresationType[];
  users:User[]
}

const ConversationList: React.FC<IConversatonList> = ({ initItems ,users}) => {
  const [items, setItems] = useState(initItems);
  const [isOpenModal,setIsOpenModal] = React.useState(false)
  const router = useRouter();

  const { isOpen, conversationId } = useConversation();
  return (
    <>
    <GroupModalChat
      isOpen={isOpenModal}
      onClose={()=>setIsOpenModal(true)}
      users={users}
    />
    <aside
      className={clsx(
        `
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        `,
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800">Message</div>

          <div className="rounded-s-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition">
            <MdOutlineGroupAdd size={20} onClick={()=>setIsOpenModal(true)}/>
          </div>
        </div>

        <div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              userItem={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </div>
    </aside>
    </>
  );
};

export default ConversationList;
