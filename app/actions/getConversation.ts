import React from "react";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversation = await prisma?.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        message: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return conversation;
  } catch (error) {
    return [];
  }
};

export default getConversations;
