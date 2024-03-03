"use client"
import React from "react";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import {HiChat} from 'react-icons/hi'
import {HiUsers,HiArrowLeftOnRectangle} from 'react-icons/hi2'
import { signOut } from "next-auth/react";
import useConversation from "./useConversationl";
const useRoutes = ()=>{
    const {pathname} = useParams()

    const {conversationId} = useConversation()
    const routes = useMemo(()=>[
       {
        lable:'Chat',
        href:'/conversation',
        icon:HiChat,
        active:pathname === '/conversation' || !!conversationId
       },
       {
        lable:'Users',
        href:'/users',
        icon:HiChat,
        active:pathname === '/users' || !!conversationId
       },
       {
        lable:"Logout",
        href:"#",
        onClick:()=>signOut()
       }
    ]
    ,[pathname,conversationId])


    return routes
}



export default useRoutes