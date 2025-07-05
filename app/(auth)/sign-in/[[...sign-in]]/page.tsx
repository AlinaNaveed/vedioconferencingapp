import { SignIn } from '@clerk/nextjs'
import React from 'react'
import { dark } from '@clerk/themes';

const SignInPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
<<<<<<< HEAD
      <SignIn 
        appearance={{
          baseTheme: dark,
          elements: {
            formFieldInput: 'text-black bg-white placeholder-black',
            formButtonPrimary: undefined, 
          },
          variables: {
            colorPrimary: '#2563eb', 
            colorTextOnPrimaryBackground: '#ffffff', 
          },
        }}
        />
=======
      <SignIn
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
>>>>>>> 70a3e9f (Enhanced Clerk SignIn and SignUp UI for better input visibility and blue button styling)
    </main>
  )
}

export default SignInPage
