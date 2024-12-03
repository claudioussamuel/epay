
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Login() {
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

        <Button variant="ghost" className="mt-5 text-xs py-4 hover:scale-110 duration-100 hover:bg-transparent">
          Forgot your password?
        </Button>

        <hr className='mt-2'/>

        <div className="text-sm flex justify-between items-center mt-6 " >
              <p className="mr-4">Don't have an account?</p>
              <Button variant="ghost"  className="hover:scale-110 duration-100 hover:bg-transparent" >Register</Button>
        </div>
   
   </>
   
  )
}
