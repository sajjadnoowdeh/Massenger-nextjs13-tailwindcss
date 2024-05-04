import React, { Children } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./ConversationList/ConversationList";
import getConversations from "../actions/getConversation";
import { useRouter } from "next/navigation";
import useConversation from "../hooks/useConversationl";

const ConversationLayout = async ({ children }: { children: React.ReactNode }) => {
  const conversations = await getConversations()

  return (
    <Sidebar>
        <div className="h-full">
            <ConversationList initItems={conversations} />
            {children}  
        </div>
    </Sidebar>
  );
};

export default ConversationLayout;
