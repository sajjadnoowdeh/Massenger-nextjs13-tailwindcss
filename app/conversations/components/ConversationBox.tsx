import React, { useCallback, useMemo } from "react";
import useOtherUsers from "@/app/hooks/useOtherUsers";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";
import { format } from "date-fns";
interface IConversationBox {
  userItem: any;
  selected: boolean;
}
const ConversationBox: React.FC<IConversationBox> = ({
  userItem,
  selected,
}) => {
  console.log('userItem conversationBox',userItem)
  const otherUser = useOtherUsers(userItem);
  const session = useSession();
  const router = useRouter();

  console.log({ otherUser });

  const handleClick = useCallback(() => {
    router.push(`/conversations/${userItem.id}`);
  }, [userItem.id, router]);

  const lastMessage = useMemo(() => {
    

    const messages = userItem.message || [];
    return messages[messages.length - 1];
  }, [userItem.messages]);


  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return (
      seenArray.filter((user: any) => user.email === userEmail).legnth !== 0
    );
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.img) {
      return "Sent a Immage";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Sent a Conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `relative w-full flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer`,
        selected ? "bg-neutral-50 p-3" : "bg-white"
      )}
    >
      <Avatar user={userItem} />
      <div className="min-w-0 flex">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {userItem.name || otherUser.name}

            </p>
            {
              true && (
                <p className="text-xs text-gray-400 font-light">
                  {format(new Date(), 'p')}
                </p>
              )
            }
          </div>
          <p className={clsx(`text-sm truncate`,hasSeen ? 'text-gray-500' : 'text-black font-medium')}>
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
