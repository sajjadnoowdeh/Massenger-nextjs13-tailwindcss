import {Message,User,Conversation} from '@prisma/client'


export type FullMessangeType = Message & {
 sender:User,
 seen:User[]
}


export type FullConvresationType = Conversation & {
    users:User[],
    messages:FullMessangeType[]
}