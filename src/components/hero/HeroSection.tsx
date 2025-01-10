import React from 'react';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      <HeroContent />
    </div>
  );
}