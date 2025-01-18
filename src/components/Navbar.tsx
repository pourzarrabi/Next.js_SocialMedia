"use client";

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedOut,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import SearchBox from "./SearchBox";

const Navbar = () => {
  return (
    <div className='flex items-center justify-between h-24 dir-rtl'>
      <div className='max-md:hidden lg:block '>
        <Link href='/' className='font-bold text-2xl text-blue-600'>
          یکتا
        </Link>
      </div>
      <div className='hidden md:flex items-center justify-between'>
        <div className='flex gap-6 text-gray-600'>
          <Link href='/' className='flex gap-2 items-center '>
            <Image
              src='/home.png'
              alt='خانه'
              width={16}
              height={16}
              className='w-4 h-4'
            />
            <span>خانه</span>
          </Link>
          <Link href='/' className='flex gap-2 items-center '>
            <Image
              src='/friends.png'
              alt='دوستان'
              width={16}
              height={16}
              className='w-4 h-4'
            />
            <span>دوستان</span>
          </Link>
          <Link href='/' className='flex gap-2 items-center '>
            <Image
              src='/stories.png'
              alt='داستان'
              width={16}
              height={16}
              className='w-4 h-4'
            />
            <span>داستان</span>
          </Link>
        </div>
      </div>
      <SearchBox />
      <MobileMenu />
      <div className='dir-ltr hidden md:flex items-center gap-4 xl:gap-8 justify-start'>
        <ClerkLoading>
          <div className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white' />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton />
            <div className='cursor-pointer'>
              <Image src='/notifications.png' alt='' width={20} height={20} />
            </div>
            <div className='cursor-pointer'>
              <Image src='/messages.png' alt='' width={20} height={20} />
            </div>
            <div className='cursor-pointer'>
              <Image src='/people.png' alt='' width={24} height={24} />
            </div>
          </SignedIn>

          <SignedOut>
            <div className='flex items-center gap-2'>
              <Link href='/sign-in'>ورود/ثبت نام</Link>
              <Image src='/noAvatar.png' alt='' width={20} height={20} />
            </div>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </div>
  );
};

export default Navbar;
