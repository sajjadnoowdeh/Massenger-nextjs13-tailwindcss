import prisma from "@/app/libs/prismadb";
import { getSession } from "./getSession";

// Server Actions - function
const getCurrentUser = async () => {
  try {
    const session = await getSession();

   
    if(!session?.user?.email){
        return null
    }
    // console.log("session====>",{session})
    const currentUser = prisma.user.findUnique({
        where:{
            email:session.user.email as string
        }
    })
  
    if(!currentUser){
     return null
    }

    return currentUser
  } catch (error) {
    return null
  }
};

export default getCurrentUser;
