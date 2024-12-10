"use client";
import { privateKeyToAccount } from "viem/accounts";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import {auth} from "@/firebase"
import {
  
    createUserWithEmailAndPassword,
    sendEmailVerification,
  
}

from "firebase/auth"
import React, {FormEvent,useEffect,useState,useTransition} from "react"
import { useRouter } from 'next/navigation'
import { Hex } from "viem";


export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [success, setSuccess] = useState<string | null>(null); // State for success messages
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error state
    setIsLoading(true); // Set loading state to true
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Create user
      
      await sendEmailVerification(userCredential.user); // Send email verification
      //router.push("/verifyemail"); // Navigate to verification page
      setSuccess("Signup successful! Please check your email for verification."); // Set success message
      const privateKey = require("crypto").randomBytes(32).toString("hex")
      const account = privateKeyToAccount(`0x${privateKey}`);
      
      
    } catch (error: any) {
      if (error.code === "auth/invalid-phone-number") {
        setError("Invalid phone number. Please check the number");
      } else if (error.code == "auth/too-many-requests"){
        setError("Too many request at a time");
      }
      else{
        setError(error.message);
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const loadingIndicator = (
    <div role="status" className="flex justify-center items-center h-24 text-white ">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <circle fill="#fff" stroke="#000000" strokeWidth="15" r="35" cx="40" cy="100">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
        </circle>
        <circle fill="#fff" stroke="#000000" strokeWidth="15" r="35" cx="100" cy="100">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
        </circle>
        <circle fill="#fff" stroke="#000000" strokeWidth="15" r="35" cx="160" cy="100">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
        </circle>
      </svg>
    </div>
  );

  return (
    <>
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <Input 
          className="text-black p-2 mt-8 rounded-xl border"
          placeholder='User Name'
          type="text"
          name='username'
        />
        <Input 
          className="text-black p-2 mt-0 rounded-xl border"
          placeholder='Email'
          type="email"
          name='email'
          value={email} // Bind email state
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
        <Input 
          className="text-black p-2 mt-0 rounded-xl border w-full"
          placeholder='*************'
          type="password"
          name='password'
          value={password} // Bind password state
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
        <Button 
          className="rounded-xl text-white py-2 hover:scale-105 duration-100"
        >
          
          {isLoading ? loadingIndicator : `SignUp`}
        </Button>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        
      </form>
      <Button variant="ghost" className="mt-5 text-xs py-4 hover:scale-110 duration-100 hover:bg-transparent">
        <Link href={"/forgotpassword"}>
        Forgot your password?
        </Link>
        
       </Button>

       <hr className='mt-2'/>

       <div className="text-sm flex justify-between items-center mt-6 " >
             <p className="mr-4">Have an account?</p>
             <Button variant="ghost"  className="hover:scale-110 duration-100 hover:bg-transparent" >
              <Link href={`/login`}>
              Login
              </Link>
              </Button>
       </div>
  
  </>
  )
}
