"use client";

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { SiGoogletasks } from "react-icons/si";

const NavBar = () => {

    const currentPathName = usePathname();

    const navlinks = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]

    return (
        <nav className='flex space-x-5 px-6 h-12 items-center border-y-2 mb-2'>
            {/* <div className=""> */}
            <Link href={'/'} className='flex space-x-5 items-center font-bold text-purple-700' ><SiGoogletasks />Ticker</Link>
            {/* </div> */}
            <ul className='flex space-x-5'>
                {
                    navlinks.map(({ label, href }) => {
                        return <Link key={href} className={
                            classNames({
                                'text-gray-600': currentPathName !== href,
                                'text-gray-900 font-medium': currentPathName === href,
                                'transition-colors': true
                            })
                        } href={href}>{label}</Link>
                    })
                }

            </ul>
        </nav>
    )
}

export default NavBar;