'use client';

import React, { useState, useEffect } from 'react';
import Canvas from './canvas';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxStyles = (depth) => {
    return {
      transform: `translate(${mousePosition.x * depth}px, ${
        mousePosition.y * depth
      }px)`,
    };
  };

  return (
    <main className='relative h-screen overflow-y-scroll'>
      <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
        <div
          className='z-1 absolute text-center uppercase font-black tracking-widest leading-snug'
          style={{
            ...parallaxStyles(0.02),
            fontFamily: "'Roboto', sans-serif",
            fontSize: 'clamp(24px, 20vw, 200px)',
            letterSpacing: '10px',
          }}
        >
          THREE.JS <br />
          MASTERY
        </div>
        <div
          className='z-0 absolute text-center uppercase font-black tracking-widest leading-snug'
          style={{
            ...parallaxStyles(0.02),
            fontFamily: "'Roboto', sans-serif",
            fontSize: 'clamp(24px, 20vw, 200px)',
            letterSpacing: '10px',
            filter: 'blur(7.5px)',
            WebkitFilter: 'blur(10px)',
          }}
        >
          THREE.JS <br />
          MASTERY
        </div>
        <div
          className='z-10 absolute text-center uppercase font-black tracking-widest leading-snug text-transparent'
          style={{
            ...parallaxStyles(0.02),
            fontFamily: "'Roboto', sans-serif",
            fontSize: 'clamp(24px, 20vw, 200px)',
            letterSpacing: '10px',
            WebkitTextStroke: '2px white',
          }}
        >
          THREE.JS <br />
          MASTERY
        </div>
      </div>
      <Canvas />
      <div className='h-screen bg-[#11151c] mt-96'></div>
    </main>
  );
}
