"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase'; // Import the auth object
import { onAuthStateChanged } from 'firebase/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to login page if not authenticated
        router.push('/login'); // Change '/login' to your actual login route
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router]);

  return (
    <main className="flex items-center justify-center text-center min-h-screen">
      <h1 className="font-bold mb-5 text-5xl">
         We are still working on it
      </h1>
    </main>
  )
}
