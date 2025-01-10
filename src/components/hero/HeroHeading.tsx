import React from 'react';

interface HeroHeadingProps {
  children: React.ReactNode;
}

export function HeroHeading({ children }: HeroHeadingProps) {
  return (
    <h1 className="text-[#EDEDED] text-5xl md:text-6xl font-bold tracking-wide mb-6 
      animate-fade-in font-sans">
      {children}
    </h1>
  );
}