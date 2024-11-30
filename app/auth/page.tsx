import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'

export default function Auth() {
  return (
    <main>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
    <div className="bg-gray-50 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
      <div className="md:w-1/2 px-16">
        <h2 className='font-bold text-2xl'>
          Login
        </h2>
        <p className="text-sm mt-4">
          Financial Freedom Awaits You
        </p>
        <form action="" className="flex flex-col gap-4">
        <Input 
                className="text-black p-2 mt-8 rounded-xl border"
                placeholder='Email'
                type="email"
                name='email'
               // value={phoneNumber}
                //onChange={(e)=> setPhoneNumber(e.target.value)}
                />

    <div className="relative">
    <Input 
                className="text-black p-2 mt-0 rounded-xl border w-full"
                placeholder='*************'
                type="password"
                name='password'
               // value={phoneNumber}
                //onChange={(e)=> setPhoneNumber(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye-fill absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg>
    </div>
                 

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
            Login
        </Button>
        </form>

        <p className="mt-5 text-xs border-b py-4">
          Forgot your password?
        </p>

        <div className="text-sm flex justify-between items-center mt-3" >
              <p className="mr-4">Don't have an account?</p>
              <Button className="py-2 px-5 text-black bg-white border rounded-xl hover:scale-110 duration-100">Register</Button>
</div>
      </div>

      <div className="md:block hidden w-1/2 ">
        <Image src={`/usdc.jpg`} alt='' width={1200} height={1200} className='rounded-2xl'/>
      </div>
    </div>

   </section>
    </main>
   
  )
}
