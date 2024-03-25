import React, { useCallback, useMemo } from "react";
import useOtherUsers from "@/app/hooks/useOtherUsers";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface IConversationBox {
  userItem: any;
  selected: boolean;
}
const ConversationBox: React.FC<IConversationBox> = ({
  userItem,
  selected,
}) => {
  const otherUser = useOtherUsers(userItem);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${userItem.id}`);
  }, [userItem.id, router]);

  const lastMessage = useMemo(() => {
    const messages = userItem.messages || [];
    return messages[messages.legnth - 1];
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
  }, [lastMessage]);

  return <div>Conversation</div>;
};

export default ConversationBox;
