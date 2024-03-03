import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import getCurrentUser from '@/app/actions/getCurrentUser'

const Sidebar = async({children}:{children:React.ReactNode})=>{

    const currentUser = await getCurrentUser()
    console.log({currentUser});
    
    return(
        <div className='h-full'>
            <DesktopSidebar user={currentUser} />
            <main className='lg:pl-20 h-full'>
                {children}
            </main>
        </div>
    )
}

export default Sidebar