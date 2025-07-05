import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignUp 
        appearance={{
          baseTheme: dark,
          elements: {
            formFieldInput: 'text-black bg-white placeholder-black',
            formButtonPrimary: undefined, 
          },
          variables: {
            colorPrimary: '#2563eb', 
            colorTextOnPrimaryBackground: '#ffffff', 
        }}
        />
    </main>
  )
}

export default SignUpPage
