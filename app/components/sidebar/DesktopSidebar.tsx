"use client"
import React from 'react'
import useRoutes from '@/app/hooks/useRoutes'
import DesktopSidebarItem from './DesktopSidebarItems'
const DesktopSidebar = ()=>{

    const routes = useRoutes()
    console.log(routes)
    return(
        <div> {
               routes.map((route)=>(
                <DesktopSidebarItem 
                  key={route.href}
                  lable={route.lable}
                  href={route.href}
                  onClick={route?.onClick}
                
                />
               ))
            } </div>
    )
}

export default DesktopSidebar