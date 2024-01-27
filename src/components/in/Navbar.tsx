import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSun } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const [menu, setMenu] = useState<boolean>(false)
  const [isTop, setIsTop] = useState<boolean>(true)
  
  // Theme
  const [theme, setTheme] = useState<string | null>("light")

  // useEffect(()=> {
  //   if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     setTheme('dark')
  //   }
  // }, [])
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleThemeSwitch = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  }



  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      setIsTop(false)
    } else {
      setIsTop(true)
    }
  })
  return (
    <div className='fixed top-0 w-full z-20'>
    <div 
      className={`w-full flex items-center justify-center z-30 transition-all duration-500
      ${(!isTop && !menu) && 'bg-white dark:bg-primary-background-dark bg-opacity-25 dark:bg-opacity-25 backdrop-blur-sm shadow-md'}
     dark:text-gray-200 text-gray-600`}
     >
      <div className='flex justify-between items-center p-2 w-full sm:max-w-[1024px]'>
        <Link to='/' className='px-2 text-2xl font-bold text-slate-700 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white'>{process.env.REACT_APP_BRANDNAME}</Link>
          <div className='space-x-5'>
            {window.innerWidth < 640 ?
            <>
              <button className='p-2 rounded-md dark:hover:bg-slate-800 hover:bg-gray-200' onClick={handleThemeSwitch}><FontAwesomeIcon icon={faSun}/></button>
              <button className='p-2 rounded-md dark:hover:bg-slate-800 hover:bg-gray-200' onClick={() => setMenu(!menu)}><FontAwesomeIcon icon={faBars}/></button>
            </>
            : 
            <>
            <div className='flex gap-5 p-2 font-semibold items-center'>
              <div className='space-x-6'>
                <Link to='/' className='dark:hover:text-white hover:text-gray-900'>Home</Link>
                <Link to='/about' className='dark:hover:text-white hover:text-gray-900'>About</Link>
                <Link to='/play' className='dark:hover:text-white hover:text-gray-900'>Play</Link>
              </div>
              <div className='space-x-2'>
                <button onClick={handleThemeSwitch} className='p-2 rounded-md dark:hover:bg-slate-800 hover:bg-gray-200'>
                  <FontAwesomeIcon icon={faSun}/>
                </button>
                <a href={process.env.REACT_APP_REPO} target="_blank" rel="noreferrer" className='p-2 rounded-md dark:hover:bg-slate-800 hover:bg-gray-200'>
                  <FontAwesomeIcon icon={faGithub}/>
                </a>
              </div>
            </div>
            </> 
            }
          </div>
      </div>
    </div>
    
    {menu && 
      <div className='fixed top-0 w-full h-full p-5 pt-16 -z-10 space-y-5 flex flex-col
      dark:bg-primary-background-dark dark:text-gray-400 bg-white text-slate-600 font-semibold text-lg'>
        <Link to='/' onClick={()=> setMenu(!menu)} className='hover:text-slate-900 dark:hover:text-white'>Home</Link>
        <Link to='/about' onClick={()=> setMenu(!menu)} className='hover:text-slate-900 dark:hover:text-white'>About</Link>
        <Link to='/play' onClick={()=> setMenu(!menu)} className='hover:text-slate-900 dark:hover:text-white'>Play</Link>
        <a href={process.env.REACT_APP_REPO} target="_blank" rel="noreferrer" 
        onClick={()=> setMenu(!menu)} className='hover:text-slate-900 dark:hover:text-white'>
          Github
        </a>
      </div> } 
    </div>
  )
}

export default Navbar