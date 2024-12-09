"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';

const HomeButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/home')}
      className="group flex items-center gap-2 px-4 py-2 rounded-lg 
                 bg-blue-500 text-white hover:bg-blue-600 
                 transition-all duration-200 ease-in-out
                 hover:shadow-md active:transform active:scale-95"
    >
      <Home 
        className="transition-transform group-hover:-translate-x-1" 
        size={20} 
      />
      <span className="font-medium">Inicio</span>
    </button>
  );
};

export default HomeButton;