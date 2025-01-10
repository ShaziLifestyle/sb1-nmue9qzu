import React from 'react';

export function HeroBackground() {
  return (
    <>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2C003E] to-black" />
      
      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div className="h-full w-full bg-[linear-gradient(45deg,transparent_46%,#ffffff_47%,#ffffff_53%,transparent_54%)_0_0/60px_60px]" />
      </div>
      
      {/* Glow Effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-0 w-[600px] h-[600px] bg-[#6D00C1] opacity-20 blur-[120px] rounded-full" />
    </>
  );
}