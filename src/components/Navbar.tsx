import Link from 'next/link'
import React from 'react'
import MobileMenu from './MobileMenu'
import Image from 'next/image'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const Navbar = () => {
    return (
        <div className='flex items-center justify-between h-20'>
            {/* // LEFT */}
            <div className='md:hidden lg:block w-[20%]'>
                <Link href={"/"} className='font-bold text-xl text-orange-600'>Swayy</Link>
            </div>
            {/* // CENTRE */}
            <div className='hidden md:flex w-[50%]'>
                <div className='flex gap-6 text-gray-600'>
                    <Link href={'/'} className='flex gap-2 items-center'>
                        <Image src={"/home.png"} width={16} height={16} alt={""} className='w-4 h-4' />
                        <span>Homepage</span>
                    </Link>
                    <Link href={'/'} className='flex gap-2 items-center'>
                        <Image src={"/friends.png"} width={16} height={16} alt={""} className='w-4 h-4' />
                        <span>Friends</span>
                    </Link>
                    <Link href={'/'} className='flex gap-2 items-center'>
                        <Image src={"/stories.png"} width={16} height={16} alt={""} className='w-4 h-4' />
                        <span>Stories</span>
                    </Link>
                </div>
                {/* <div className='hidden xl:flex p-2 bg-slate-100 items-center rounded-xl'>
                    <input type="text" placeholder="search..." className="bg-transparent outline-none" />
                    <Image src="/search.png" alt="" width={14} height={14} />
                </div> */}
            </div>
            {/* // RIGHT */}
            <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
                <ClerkLoading>
                    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <div className="cursor-pointer">
                            <Image src="/people.png" alt="" width={24} height={24} />
                        </div>
                        <div className="cursor-pointer">
                            <Image src="/messages.png" alt="" width={20} height={20} />
                        </div>
                        <div className="cursor-pointer">
                            <Image src="/notifications.png" alt="" width={20} height={20} />
                        </div>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <div className="hidden md:flex items-center gap-2 text-sm">
                            <Image src="/noAvatar.png" alt="" width={20} height={20} />
                            <Link href="/sign-in">Login/Register</Link>
                        </div>
                    </SignedOut>
                </ClerkLoaded>
                <MobileMenu />
            </div>
        </div>
    )
}

export default Navbar