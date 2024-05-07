import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface IParms {
  conversationId: any;
}
export async function POST(request: Request, { params }: { params: IParms }) {
  try {
    const currentUser = await getCurrentUser();

    const { conversationId } = params;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthrouired", { status: 401 });
    }

    //   find exsiting conversation
    const conversation = await prisma?.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        message: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse("NOT COVERSATION WITH ID", { status: 400 });
    }

    // Find lastMessage
    const lastMessage = conversation.message[conversation.message.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    // Update seen of lastMessage

    const updatedMessagesForSeen = await prisma?.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    return NextResponse.json(updatedMessagesForSeen);
  } catch (error) {
    return new NextResponse("ERROR SEEN CONVERSATION", { status: 500 });
  }
}
