import React from 'react';
import { HeroHeading } from './HeroHeading';
import { HeroSubheading } from './HeroSubheading';
import { HeroButton } from './HeroButton';

export function HeroContent() {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <HeroHeading>
        Build Powerful AI Applications with Ease
      </HeroHeading>
      
      <HeroSubheading>
        Create, deploy, and scale AI-powered solutions without the complexity.
        Our platform provides everything you need to bring your AI vision to life.
      </HeroSubheading>
      
      <HeroButton>Start Free Trial</HeroButton>
    </div>
  );
}