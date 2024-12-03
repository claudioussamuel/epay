import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
export default function Verify() {
  return (
    <div>
     <Button variant="ghost" className="mt-8 text hover:scale-110 duration-100 hover:bg-transparent">
        
        Verification sent to the Email
        
      </Button>
    <div  className="flex flex-col">
     
  


          <Link href={`/login`}  className="flex justify-center rounded-xl text-white py-2 hover:scale-105 duration-100 bg-black"
     >
          Login</Link>
           
     
       </div>

       

      
  
  </div>
  )
}
