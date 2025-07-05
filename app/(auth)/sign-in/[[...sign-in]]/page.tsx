import { SignIn } from '@clerk/nextjs'
import React from 'react'
import { dark } from '@clerk/themes';

const SignInPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
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
    </main>
  )
}

export default SignInPage
