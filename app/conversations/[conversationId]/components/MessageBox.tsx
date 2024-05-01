"use client";
import React from "react";
import { FullMessangeType } from "@/app/types";
import { useSession } from "next-auth/react";
import Avatar from "@/app/components/Avatar";
import clsx from "clsx";
import { format } from "date-fns/format";
import Image from "next/image";

interface IMessageBox {
  isLast: boolean;
  message: FullMessangeType;
}

export const MessageBox: React.FC<IMessageBox> = ({ isLast, message }) => {
  const session = useSession();
  const isOwn = session.data?.user?.email === message?.sender.email;
  console.log('isOwn',message)
  const seenList = (message.seen || [])
    .filter((user) => user.email !== message?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  console.log({ seenList });

  const container = clsx("flex gap-4 p-4", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const messageItem = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    message.image ? "rounded-md p2" : "rounded-full py-2 px-3"
  );
  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={message.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{message.sender.name}</div>
          <div className="text-s text-gray-400">
            {format(new Date(message.createdAt), "p")}
          </div>
        </div>
        <div className={messageItem}>
          {message.image ? (
            <Image
              alt="Image"
              width={"288"}
              height={"288"}
              src={message.image}
              className="
                       object-cover
                       transition
                       hover:scale-110
                       cursor-pointer
                       translate
                      "
            />
          ) : (
            <div>{message.body}</div>
          )}
        </div>
          {isOwn && seenList.length > 0 && isLast &&  
               (
                 <div className="text-xs font-light text-gray-500">Seen by {seenList}</div>
               )
          }
      </div>
    </div>
  );
};
