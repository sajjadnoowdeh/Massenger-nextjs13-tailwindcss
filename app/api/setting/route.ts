import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'



export async function POST(requste:Request){
 
    try {
        const currentUser = await getCurrentUser()
         const body = await requste.json()
        const {name,image} = body
        if (!currentUser?.id || !currentUser.email) {
            return new NextResponse("Unauthroized", { status: 401 });
          }


          const updateUser = await prisma?.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                name:name,
                image:image
            }
          })


          return NextResponse.json(updateUser)
    } catch (error) {
        return new NextResponse('EROR NOT UPDATE USER',{status:500})
    }
}