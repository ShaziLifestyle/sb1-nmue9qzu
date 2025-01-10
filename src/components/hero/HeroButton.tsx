import React from 'react';

interface HeroButtonProps {
  children: React.ReactNode;
}

export function HeroButton({ children }: HeroButtonProps) {
  return (
    <button
      className="bg-white text-[#2C003E] px-8 py-4 rounded-full text-lg font-bold
        transition-all duration-300 hover:bg-[#6D00C1] hover:text-white
        transform hover:scale-105 animate-fade-in animation-delay-400
        shadow-lg hover:shadow-xl"
    >
      {children}
    </button>
  );
}