import React from 'react'
import Header from './Header'
import OurTeam from './OurTeam'

const About: React.FC = () => {
  return (
    <div className='space-y-24 mx-6 mb-24 flex flex-col items-center justify-center'>
      <img src='https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif' alt="" className='w-full h-full dark:blur-xl top-0 absolute'/>
        <Header/>
        <OurTeam/>
    </div>
  )
}

export default About