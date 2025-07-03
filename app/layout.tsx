import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import 'react-datepicker/dist/react-datepicker.css'

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YoOm",
  description: "Video calling app",
  icons:{
    icon:'icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <ClerkProvider
      appearance={{
        layout:{
          logoImageUrl:'/icons/yoom-logo.svg',
          socialButtonsVariant:'iconButton'
        },
        variables:{
          colorText:'#fff',
          colorPrimary:'#0E78F9',
          colorBackground:'#1c1f2e',
          colorInputText:'#fff'
        }
      }}
      >
      <body className={`${inter.className} bg-dark-3 text-white`}>
        {children}
        <Toaster />
        </body>
        </ClerkProvider>
        </html>
  );
}
