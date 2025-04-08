"use client";

import GameButton from "@/components/ui/GameButton";
import AstroCanvas from "@/components/Canvas/Astro";
import MeterBar from "@/components/ui/MeterBar/Meter";

export default function Home() {
  return (
    <>
      <div className='relative w-full h-screen '>
        <div className='absolute top-0 left-0 w-full h-full z-0'>
          <AstroCanvas />
        </div>

        <title>CodeWar: Galactic Python</title>
        <meta
          name='description'
          content='Learn Python through space missions!'
        />

        <main className='flex flex-col items-center justify-center min-h-screen text-center px-4'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            🚀 Welcome to CodeWar
          </h1>
          <p className='text-lg md:text-xl text-gray-300 mb-8 max-w-xl'>
            Embark on a galactic coding adventure and become a Python hero.
          </p>
          <GameButton
            text='Start Your Mission'
            onClick={() => alert("Mission Launching...")}
          />
          <MeterBar value={2.5} />
          <div className=' bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700'>
            <div
              className='bg-green-600 h-2.5 rounded-full dark:bg-green-500'
              style={{ width: "45%" }}
            ></div>
          </div>
        </main>
      </div>
    </>
  );
}
