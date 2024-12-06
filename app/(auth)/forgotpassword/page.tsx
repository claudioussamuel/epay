"use client";

import { auth } from "@/firebase"; // Import Firebase auth
import { sendPasswordResetEmail } from "firebase/auth"; // Import password reset function
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { useState } from "react"; // Import useState for managing state
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPassword() {
  const [email, setEmail] = useState(""); // State for email
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [success, setSuccess] = useState<string | null>(null); // State for success messages
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const router = useRouter(); // Initialize router

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

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Reset error state
    setSuccess(null); // Reset success state
    setIsLoading(true); // Set loading state to true
    try {
      await sendPasswordResetEmail(auth, email); // Send password reset email
      setSuccess("Password reset email sent!"); // Set success message
      setTimeout(() => {
        router.push("/login"); // Redirect to login page after 3 seconds
      }, 3000);
    } catch (error: any) {
      setError(error.message); // Set error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <form onSubmit={handlePasswordReset} className="flex flex-col gap-4">
      {success && <p className="text-black">{success}</p>} {/* Display success message */}
        <Input 
          className="text-black p-2 mt-8 rounded-xl border"
          placeholder='Email'
          type="email"
          name='email'
          value={email} // Bind email state
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
        <Button 
          className="rounded-xl text-white py-2 hover:scale-105 duration-100"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? loadingIndicator : "Reset Password"} {/* Show loading text */}
        </Button>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

      </form>
    </>
  );
}
