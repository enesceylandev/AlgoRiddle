import React from 'react'
import Glow from '../assets/Glow'

const Landing = () => {
  return (
    <div className='flex flex-col space-y-6 px-2 justify-center items-center h-screen w-full sm:max-w-[1024px] text-center transition-all z-0'>
      <h1 className='sm:text-5xl text-2xl font-extrabold text-slate-900 dark:text-white'>The fun and effective way to learn algorithms!</h1>
      <p className='sm:text-xl text-md text-slate-600 dark:text-slate-400'>
        <span className='underline font-semibold underline-offset-2 dark:text-slate-300 text-slate-700'>AlgoRiddle</span> is an
        <span className='font-semibold dark:text-slate-300 text-slate-700'> open-source</span> and
        <span className='font-semibold dark:text-slate-300 text-slate-700'> user-friendly</span> platform where users enhance their programming skills by solving
        <span className='font-semibold dark:text-slate-300 text-slate-700'> algorithmic puzzles</span> presented at various
        <span className='font-semibold dark:text-slate-300 text-slate-700'> difficulty levels</span> on a daily basis.
      </p>
      <Glow/>
    </div>
  )
}

export default Landing