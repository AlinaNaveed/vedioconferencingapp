import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignUp 
        appearance={{
          baseTheme: dark,
          elements: {
            // Input fixes
            formFieldInput: 'text-black bg-white placeholder-black',

            // Button override using inline styles
            formButtonPrimary: undefined, // Remove Tailwind class override
          },
          variables: {
            colorPrimary: '#2563eb', // ✅ Tailwind's blue-600
            colorTextOnPrimaryBackground: '#ffffff', // white button text
          },
        }}
        />
    </main>
  )
}

export default SignUpPage
