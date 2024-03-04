"use client"
import useRoutes from '@/app/hooks/useRoutes'
import React from 'react'
import MobileItem from './MobileItem'

const MobileFooter = ()=>{
    const routes = useRoutes()
    return (
        <div className='flex fixed justify-between w-full bottom-0 z-40 items-center bg-white border-t-[1px] lg:hidden'>
            {
               routes.map((route)=>(
                <MobileItem 
                
                key={route.href}
                label={route.lable}
                icon={route.icon}
                active={route.active}
                href={route.href}
                onClick={route.onClick} 
                />
            
               ))        
            }
        </div>
    )
}

export default MobileFooter