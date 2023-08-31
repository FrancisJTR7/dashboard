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
    <main className='bg-[#ffe09f] #ffe09f'>
      <div className='flex items-center justify-center pointer-events-none h-screen'>
        <div
          className='z-1 absolute text-center uppercase font-black text-[#202c43] tracking-tight leading-snug'
          style={{
            ...parallaxStyles(0.02),
            fontFamily: "'Roboto', sans-serif",
            fontSize: 'clamp(24px, 20vw, 200px)',
          }}
        >
          FRANKIE T<br />
          <div className='text-lg flex justify-between tracking-normal '>
            <div className='ml-20 '>SOFTWARE ENGINEER</div>
            <div className='mr-20 '>WEB DEVELOPER</div>
          </div>
          FULL STACK
        </div>
        <div
          className='z-0 absolute text-center uppercase font-black text-[#202c43]  tracking-tight leading-snug'
          style={{
            ...parallaxStyles(0.02),
            fontFamily: "'Roboto', sans-serif",
            fontSize: 'clamp(24px, 20vw, 200px)',
            filter: 'blur(7.5px)',
            WebkitFilter: 'blur(10px)',
          }}
        >
          FRANKIE T <br />
          <div className='text-lg flex justify-between tracking-normal '>
            <div className='ml-20 '>SOFTWARE ENGINEER</div>
            <div className='mr-20 '>WEB DEVELOPER</div>
          </div>
          FULL STACK
        </div>
        <div
          className='z-10 absolute text-center uppercase font-black  tracking-tight leading-snug text-transparent'
          style={{
            ...parallaxStyles(0.02),
            fontFamily: "'Roboto', sans-serif",
            fontSize: 'clamp(24px, 20vw, 200px)',
            WebkitTextStroke: '2px white',
          }}
        >
          FRANKIE T<br />
          <div className='text-lg flex justify-between'>
            <br />
          </div>
          FULL STACK
        </div>

        <Canvas />
      </div>
      <div className='h-screen mt-2 '>
        <div className='bg-[#ffffff] rounded-3xl m-4 mx-10 flex justify-start flex-col items-center'>
          <div className='text-[#202c43] font-black mt-8 bg-yellow rounded-2xl px-2'>
            ABOUT ME
          </div>
          <div className='flex justify-evenly w-full'>
            <div className='text-[#202c43] font-black w-full text-center text-xl pt-8'>
              TECHNICAL
            </div>
            <div className='text-[#202c43] font-black w-full text-center text-xl pt-8'>
              PERSONAL
            </div>
          </div>
          <div className='flex justify-evenly w-full mb-12'>
            <div className='bg-yellow rounded-2xl w-full h-full ml-16 mr-4 mt-4 text-blue p-4 text-lg '>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus,
              fugit quidem facere consectetur dolorem sapiente praesentium.
              Voluptatibus libero sint recusandae non, voluptas ipsa, labore
              exercitationem aut distinctio reiciendis ipsam consequatur.Lorem,
              ipsum dolor sit amet consectetur adipisicing elit. Molestias,
              praesentium aperiam hic reiciendis deserunt at natus dolor officia
              repellendus, iste quod eius vel qui deleniti iusto illo fuga
              fugiat ipsa.
            </div>
            <div className='bg-yellow rounded-2xl w-full h-full mr-16 ml-4 mt-4 text-blue p-4 text-lg '>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Molestias, praesentium aperiam hic reiciendis deserunt at natus
              dolor officia repellendus, iste quod eius vel qui deleniti iusto
              illo fuga fugiat ipsa.Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Molestias, praesentium aperiam hic reiciendis
              deserunt at natus dolor officia repellendus, iste quod eius vel
              qui deleniti iusto illo fuga fugiat ipsa.
            </div>
          </div>
          <div className='flex justify-evenly w-full text-blue font-black  mb-8'>
            <div className='grow pl-20'>
              Name: <br />
              <div className='font-semibold'>Francis J. Torres Rios</div>
            </div>
            <div className='grow'>
              Email:
              <br />
              <div className='font-semibold'>francisjtr7@outlook.com</div>
            </div>
            <div className='grow'>
              Date of birth:
              <br />
              <div className='font-semibold'>Jan, 2nd 2001</div>
            </div>
            <div className='grow'>
              From:
              <br />
              <div className='font-semibold'>Humacao, PR to PA and NJ</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
