"use client";

import { FullMessangeType } from "@/app/types";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { MessageBox } from "./MessageBox";
import useConversation from "@/app/hooks/useConversationl";
import axios from "axios";
import { pusherCient } from "@/app/libs/pusher";
import { find } from "lodash";
interface IMessages {
  messages: FullMessangeType[] | any;
}
const Body: React.FC<IMessages> = ({ messages }) => {
  const [messagesData,setMessagesData] = useState(messages)
  const bottomRef = useRef<HTMLDivElement>(null);

  const {conversationId} = useConversation()


  React.useEffect(()=>{
      axios.post(`/api/conversations/${conversationId}/seen`)
  },[conversationId])


  React.useEffect(()=>{
    pusherCient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView()

    const messageHandler = (message:FullMessangeType)=>{
      axios.post(`/api/conversations/${conversationId}/seen`)

        setMessagesData((current:FullMessangeType[])=>{
              if(find(current,{id:message.id})){
                return current
              }

              return [...current,message]
        })

        bottomRef?.current?.scrollIntoView()
    } 

    const messageHanlderUpdate = (newMessage:FullMessangeType)=>{
          console.log('newMessage--------->',newMessage)
    }

    pusherCient.bind('messages:new',messageHandler)
    pusherCient.bind('message:update',messageHanlderUpdate)
    return ()=>{
      pusherCient.unbind('messages:new',messageHandler)
      pusherCient.unbind('message:update',messageHanlderUpdate)
      pusherCient.unsubscribe(conversationId)
    }
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
