import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export  async function POST(requste: Request) {
  try {

    console.log('enter try!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    const currentUser = await getCurrentUser();
    const body = await requste.json();

    const { message, conversationId ,image} = body;
    console.log('after distract conversationId!!!!!!!!!!!!!!!!!!!!!!!!!!!',conversationId)
    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse("Unauthroized", { status: 401 });
    }

    console.log('conversationId Route=========================>',conversationId)
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

    // const updatedConversation = await prisma.conversation.update({
    //   // filter conversation when id compare conversationId URL
    //   where: {
    //     id: conversationId,
    //   },
    //   data: {
    //     lastMessageAt: new Date(),
    //     message: {
    //       connect: {
    //         id: newMessage.id,
    //       },
    //     },
    //   },
    //   include: {
    //     users: true,
    //     message: {
    //       include: {
    //         seen: true,
    //       },
    //     },
    //   },
    // });


    return  NextResponse.json(newMessage)
  } catch (error) {
    console.log("ERROR_MESSAGES",error);
    return new NextResponse("MessagesError", { status: 500 });
  }
}
