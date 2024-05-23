import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
export  async function POST(requste: Request) {
  try {


    const currentUser = await getCurrentUser();
    const body = await requste.json();

    const { message, conversationId ,image} = body;
    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse("Unauthroized", { status: 401 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    const updatedConversation = await prisma.conversation.update({
      // filter conversation when id compare conversationId URL
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        message: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        message: {
          include: {
            seen: true,
          },
        },
      },
    });


    await pusherServer.trigger(conversationId,'messages:new',newMessage)

    const lastMessages = updatedConversation.message[updatedConversation.message.length - 1]


    updatedConversation.users.map((user)=>{
      pusherServer.trigger(user.email!,'conversation:update',{
         id:conversationId,
         messages:[lastMessages]  
      })
    })

    return  NextResponse.json(newMessage)
  } catch (error) {
    console.log("ERROR_MESSAGES",error);
    return new NextResponse("MessagesError", { status: 500 });
  }
}
