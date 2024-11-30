"use client";

import {auth} from "@/firebase"
import {
    ConfirmationResult,
    RecaptchaVerifier,
    signInWithPhoneNumber
}
from "firebase/auth"

import React, {FormEvent,useEffect,useState,useTransition} from "react"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from "@/components/ui/input-otp"

import { Input} from "@/components/ui/input"

import {Button} from "./ui/button"

import { useRouter } from "next/navigation";

export default function OtpLogin() {
const router = useRouter();


const [phoneNumber, setPhoneNumber] = useState("")
const [otp, setOtp] = useState("")
const [error, setError] = useState<string | null>(null)
const [success, setSuccess] = useState("")
const [resendCountdown, setResendCountdown] = useState(0)

const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);


const [confirmationResult,setConfirmationResult] = useState<ConfirmationResult | null>(null);

const [isPending,startTransition] = useTransition();

useEffect(() => {
    let timer: NodeJS.Timeout;

    if (resendCountdown > 0) {
        timer = setTimeout(()=> setResendCountdown(resendCountdown -1),1000);
    }
    return () => clearTimeout(timer);
},[resendCountdown]);

useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
            size: "invisible",
        }
    );

    setRecaptchaVerifier(recaptchaVerifier);

    return () => {
        recaptchaVerifier.clear();
    };
},[auth]);


const requestOpt = async (e?: FormEvent<HTMLFormElement>) => {
e?.preventDefault();

startTransition(async() => {
    setError("");

    if (!recaptchaVerifier) {
        return setError("RecaptchaVerify Error is not inintialized");
    }

    try {
        const confirmationResult = await signInWithPhoneNumber(
            auth,
            phoneNumber,
            recaptchaVerifier
        );
        setConfirmationResult(confirmationResult);
        setSuccess("OTP sent successfully")
    } catch (error:any) {
        console.log(error)
        setResendCountdown(0);

        if (error.code === "auth/invalid-phone-number") {
            setError("Invalid phone number. Please check the number");
          
        } else if (error.code == "auth/too-many-requests"){
            setError("Too many request at a time");
          
        }
            else{
                setError(error.message);
            }
    }
})
}


const loadingIndicator =(
    <div role="status" className="flex justify-center h-24">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#000000" stroke="#000000" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="15" r="15" cx="100" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="15" r="15" cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
    </div>
)

  return (
    <div>
        {!confirmationResult && (
            <form onSubmit={requestOpt}>
                <Input 
                className="text-black"
                type="tel"
                value={phoneNumber}
                onChange={(e)=> setPhoneNumber(e.target.value)}
                />

                <p className="text-xs text-gray-400 mt-2">
                    Please enter your number with the country code (i.e +233 for GH)
                </p>
            </form>
        )}

        <Button 
        disabled={!phoneNumber || isPending || resendCountdown > 0}
        onClick={() => requestOpt()}
        className="mt-5"
        >
            {
                resendCountdown > 0 
                ? `Resend OTP in ${resendCountdown}`
                : isPending
                ? "Sending OTP"
                :"Send OTP"
            }
        </Button>

        <div className="p-10 text-center">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </div>
        {
          isPending && loadingIndicator  
        }
      <div id="recaptcha-container" />
    </div>
  )
}
