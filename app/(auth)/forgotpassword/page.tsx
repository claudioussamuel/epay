import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPassword() {
  return (
    <>
     
    <form action="" className="flex flex-col gap-4">
       <Input 
               className="text-black p-2 mt-8 rounded-xl border"
               placeholder='Email'
               type="email"
               name='email'
              // value={phoneNumber}
               //onChange={(e)=> setPhoneNumber(e.target.value)}
               />

  
                

<Button 
      // disabled={!phoneNumber || isPending || resendCountdown > 0}
       //onClick={() => requestOpt()}
       className="rounded-xl text-white py-2 hover:scale-105 duration-100"
       >
           {/* {
               resendCountdown > 0 
               ? `Resend OTP in ${resendCountdown}`
               : isPending
               ? "Sending OTP"
               :"Send OTP"
           } */}
           Reset Password
       </Button>
       </form>
  
  </>
  )
}
