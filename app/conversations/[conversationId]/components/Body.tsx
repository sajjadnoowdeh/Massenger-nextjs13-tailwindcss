"use client";

import { FullMessangeType } from "@/app/types";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { MessageBox } from "./MessageBox";
import useConversation from "@/app/hooks/useConversationl";
import axios from "axios";
interface IMessages {
  messages: FullMessangeType[] | any;
}
const Body: React.FC<IMessages> = ({ messages }) => {
  const [messagesData,setMessagesData] = useState(messages)
  const bottomRef = useRef(null);

  const {conversationId} = useConversation()


  React.useEffect(()=>{
      axios.post(`/api/conversations/${conversationId}/seen`)
  },[conversationId])

  return (
    <div className="flex-1 overflow-y-auto">
      {messagesData.map((message: FullMessangeType, i: number) => (
        <MessageBox
          key={message.id}
          isLast={i === messagesData.length - 1}
          message={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
