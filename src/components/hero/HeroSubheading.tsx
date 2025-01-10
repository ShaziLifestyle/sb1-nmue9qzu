import React from 'react';

interface HeroSubheadingProps {
  children: React.ReactNode;
}

export function HeroSubheading({ children }: HeroSubheadingProps) {
  return (
    <p className="text-[#B0B0B0] text-lg md:text-xl leading-relaxed mb-12 
      animate-fade-in animation-delay-200 font-sans">
      {children}
    </p>
  );
}