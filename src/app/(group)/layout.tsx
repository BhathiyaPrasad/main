'use client';

import { checkAuth } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); 
  const router = useRouter();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const data = await checkAuth(); 
        if (data) {
          setIsAuthenticated(true); 
        }
      } catch (error) {
        setIsAuthenticated(false); 
        router.push('/login'); 
      }
    };

    authenticateUser(); 
  }, [router]);

  
  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex flex-col h-screen">
      
      <div className="flex overflow-hidden grow">
        
        <Navbar />
        
        <div className="flex w-full rounded bg-muted duration-300 transition-all lg:ms-[280px] ms-0 p-3 lg:p-5">
          {children}
        </div>
      </div>
    </div>
  );
}
