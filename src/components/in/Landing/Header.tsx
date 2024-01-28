import React from 'react'
import Glow from '../../assets/Glow'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <div className='flex flex-col space-y-6 justify-end items-center h-[500px] w-full sm:max-w-[800px] text-center transition-all z-0'>
      <h1 className='sm:text-5xl text-2xl font-extrabold text-slate-900 dark:text-slate-100 z-20'>The fun and effective way to learn algorithms!</h1>
      <p className='sm:text-xl text-md text-slate-600 dark:text-slate-400 z-20'>
        <span className='underline font-semibold underline-offset-2 dark:text-slate-300 text-slate-700'>AlgoRiddle</span> is an
        <span className='font-semibold dark:text-slate-300 text-slate-700'> open-source</span> and
        <span className='font-semibold dark:text-slate-300 text-slate-700'> user-friendly</span> platform where users enhance their programming skills by solving
        <span className='font-semibold dark:text-slate-300 text-slate-700'> algorithmic puzzles</span> presented at various
        <span className='font-semibold dark:text-slate-300 text-slate-700'> difficulty levels</span> on a daily basis.
      </p>
        <Glow/>

      <div className='flex flex-col sm:flex-row w-60 sm:w-96 items-center justify-center gap-5 sm:text-xl text-sm font-semibold z-20'>
        <Link to="/play" className='bg-blue-500 hover:bg-blue-800 transition-all py-3 px-5 rounded-md text-white shadow-md w-full'>Get Started</Link>
        <Link to="/about" className='border-slate-600 hover:border-slate-900 dark:border-slate-100 dark:hover:border-slate-300
         text-slate-600 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-2
         transition-all py-3 px-5 shadow-md rounded-md w-full' style={{borderWidth: 1}}>Learn More</Link>
      </div>
    </div>
  )
}

export default Header