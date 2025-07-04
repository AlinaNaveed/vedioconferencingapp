import Sidebar from '@/components/Sidebar';
import Navbar from "@/components/Navbar";
import React, { ReactNode } from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "YoOm",
  description: "Video calling app",
  icons:{
    icon:'icons/logo.svg'
  }
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='relative'>
        <Navbar />

        <div className='flex'>
            <Sidebar />

            <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 mx-md:pb-14 sm:px-14'>

                <div className='w-full'>
                    { children }
                </div>

            </section>
        </div>
        
      
        
    </main>
  )
}

export default HomeLayout
