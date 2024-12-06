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
  const router = useRouter(); // Initialize router

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Reset error state
    setSuccess(null); // Reset success state
    try {
      await sendPasswordResetEmail(auth, email); // Send password reset email
      setSuccess("Password reset email sent!"); // Set success message
      setTimeout(() => {
        router.push("/login"); // Redirect to login page after 3 seconds
      }, 3000);
    } catch (error: any) {
      setError(error.message); // Set error message
    }
  };

  return (
    <>
      <form onSubmit={handlePasswordReset} className="flex flex-col gap-4">
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
        >
          Reset Password
        </Button>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      </form>
    </>
  );
}
