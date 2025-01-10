import React from 'react';

interface FormBackgroundProps {
  type: 'agent' | 'task' | 'prompt';
}

export function FormBackground({ type }: FormBackgroundProps) {
  const overlays = {
    agent: 'from-indigo-600/80 via-purple-600/70 to-pink-600/60',
    task: 'from-emerald-600/80 via-blue-600/70 to-indigo-600/60',
    prompt: 'from-pink-600/80 via-purple-600/70 to-indigo-600/60'
  };

  return (
    <>
      {/* Base background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/3801463/pexels-photo-3801463.jpeg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${overlays[type]} mix-blend-overlay`} />
      
      {/* Animated light effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:200%_200%] animate-gradient" />
      </div>
    </>
  );
}