import React, { Children } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./ConversationList/ConversationList";
import getConversations from "../actions/getConversation";
import { useRouter } from "next/navigation";
import useConversation from "../hooks/useConversationl";
import getUsers from "../actions/getUsers";

const ConversationLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList 
           initItems={conversations} 
           users={users}
           
          />
        {children}
      </div>
    </Sidebar>
  );
};

export default ConversationLayout;
