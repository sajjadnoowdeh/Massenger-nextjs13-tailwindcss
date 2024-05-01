import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { FullConvresationType } from "@/app/types";

const useOtherUsers = (
  conversation: FullConvresationType | { users: User[] }
) => {
  const session = useSession();
  const otherUsers = useMemo(() => {
    const userEmail = session.data?.user?.email;
    console.log({conversation});
    
    console.log(conversation?.users?.filter((user) => user.email !== userEmail));
    
    return conversation?.users?.filter((user) => user.email !== userEmail)[0]
  }, [session.data?.user?.email, conversation.users]);

  return otherUsers;
};

export default useOtherUsers;
