import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const OurTeam: React.FC = () => {
  return (
    <div className='w-full space-y-6'>
        <h1 className='sm:text-5xl text-2xl font-extrabold text-slate-900 dark:text-slate-100 z-20'>Meet Our Team!</h1>
        <div className='flex flex-col sm:text-left text-center sm:items-start items-center mx-5'>
            <img src="https://enesceylan.dev/static/media/ProfilePic.3cb4eaa4c0dd0ed957b3.jpg" alt="" className='w-40 rounded-md mb-2'/>
            <h1 className='text-xl font-semibold text-slate-900 dark:text-slate-100'>Enes Ceylan</h1>
            <p className='text-md text-slate-600 dark:text-slate-400'>Full Stack Developer</p>    
            <div className='text-md space-x-5 text-slate-800 dark:text-slate-100 my-3'>
                <a href="https://enesceylan.dev/" target="_blank" rel="noreferrer" className='p-2 rounded-md dark:hover:bg-slate-800 hover:bg-gray-200'>
                  <FontAwesomeIcon icon={faAddressCard}/>
                </a>
                <a href="https://enesceylan.dev/" target="_blank" rel="noreferrer" className='p-2 rounded-md dark:hover:bg-slate-800 hover:bg-gray-200'>
                  <FontAwesomeIcon icon={faLinkedin}/>
                </a>
                <a href="https://enesceylan.dev/" target="_blank" rel="noreferrer" className='p-2 rounded-md dark:hover:bg-slate-800 hover:bg-gray-200'>
                  <FontAwesomeIcon icon={faGithub}/>
                </a>
            </div> 
        </div>
    </div>
  )
}

export default OurTeam