"use client"

import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { sidebarLinks } from '@/constants';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const MobileNav = () => {
    const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
        <Sheet>
  <SheetTrigger asChild>
    <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="hamburger icon"
            className="cursor-pointer sm:hidden"
          />
  </SheetTrigger>
  <SheetContent side="left" className="border-none ">
    <SheetHeader>
    <SheetTitle>
      <span className="sr-only">Mobile Navigation</span>
    </SheetTitle>
  </SheetHeader>
  <Link href='/' className='flex items-center gap-1'>
        <Image 
        src="/icons/logo.svg"
        width={32}
        height={32}
        alt='YoOm logo'
        className='max-sm:size-10' />
        <p className='text-[26px] font-extrabold text-white '>YoOm</p>
      </Link>

      <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
        <SheetClose asChild>
            <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                {sidebarLinks.map((link) => {
          const isActive =
  pathname === link.route ||
  (link.route !== '/' && pathname.startsWith(link.route));


          return (
            <SheetClose asChild key={link.route}>
        <Link
              href={link.route}
              key={link.label}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-4 p-4 rounded-lg w-full max-w-60 hover:bg-dark-2 transition',
                { 'bg-blue-500': isActive }
              )}
            >

              <Image 
              src={link.imgUrl}
              alt={link.label}
              width={20}
              height={20}
              />
              <p className='font-semibold'>
                {link.label}
              </p>
            </Link>
            </SheetClose>
          );
        })}
            </section>
        </SheetClose>
      </div>
  </SheetContent>
</Sheet>
      
    </section>
  )
}

export default MobileNav
