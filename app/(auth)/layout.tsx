import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Image from 'next/image'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}> <main>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center"
          style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: 'cover' }}>
    <div className="bg-gray-50 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
      <div className="md:w-1/2 px-16">
        <h2 className='font-bold text-2xl'>
          Epay
        </h2>
        <p className="text-sm mt-4">
          Financial Freedom Awaits You
        </p>
      {children}
      </div>

      <div className="md:block hidden w-1/2 ">
        <Image src={`/usdc.jpg`} alt='' width={1200} height={1200} className='rounded-2xl'/>
      </div>
    </div>

   </section>
    </main></body>
    </html>
  )
}
