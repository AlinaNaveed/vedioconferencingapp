'use client';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link'; 
import { usePathname } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="hidden sm:flex sticky left-0 top-0 h-screen w-full lg:w-[264px] flex-col justify-between bg-dark-1 p-6 pt-28 text-white">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
  pathname === link.route ||
  (link.route !== '/' && pathname.startsWith(link.route));


          return (
        <Link
              href={link.route}
              key={link.label}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-4 p-4 rounded-lg justify-start hover:bg-dark-2 transition',
                { 'bg-blue-1': isActive }
              )}
            >

              <Image 
              src={link.imgUrl}
              alt={link.label}
              width={24}
              height={24}
              />
              <p className='text-lg font-semibold max-lg:hidden'>
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>

      {/* ✅ Force Tailwind to include these custom classes */}
      <div className="hidden bg-blue-1 bg-dark-2"></div>
    </section>
  );
};

export default Sidebar;

