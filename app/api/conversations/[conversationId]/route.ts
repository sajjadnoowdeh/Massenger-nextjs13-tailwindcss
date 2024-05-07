import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IDelete{
    conversationId:string
}


export default async function DELETE (
    requste:Request,
    {params}:{params:IDelete}
){

  try {
    const currentUser = await getCurrentUser()

    const { conversationId } = params;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthrouired", { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
        where:{
            id:conversationId
        },
        include:{
            users:true
        }
    })


    if(!existingConversation){
        return new NextResponse('Invalid ID',{status:400})
    }

    const deletedConversation  = await prisma.conversation.deleteMany({
        where:{
            id:conversationId,
            userIds:{
                   hasSome: [currentUser.id]
            }
        },
    })


    return NextResponse.json(deletedConversation)
  } catch (error) {
    
    console.log('ERROR DELETE CONVERSATION')
    return new NextResponse('ERROR DELETE CONVERSATION',{status:500})
  }
}