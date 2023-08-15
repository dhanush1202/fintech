import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function NavBar() {
    const location = useLocation();
    const [home, sethome] = useState(false);
    const tochan = () => {
        sethome(!home);
    }

    const isDashboardPath = location.pathname === '/dashboard';

    return (
        <div className='w-full h-[50px] bg-slate-500 fixed z-30'>
            <div className='flex items-center h-full justify-between px-10'>
                <NavLink className=' text-2xl' to='/'>Fintech</NavLink>
                {isDashboardPath ? (
                    <NavLink className={`uppercase text-2xl text-red-800 hover:text-red-900`} to='/editprofile' onClick={tochan}>Profile</NavLink>
                ) : (
                    home ? (
                        <NavLink className={`uppercase text-2xl text-red-800 hover:text-red-900`} to='/' onClick={tochan}>Home</NavLink>
                    ) : (
                        <NavLink className={` uppercase text-2xl text-red-800 hover:text-red-900`} to='login' onClick={tochan}>Login</NavLink>
                    )
                )}
            </div>
        </div>
    );
}
