import React from 'react'
import Header from './Header'
import OurTeam from './OurTeam'

const About: React.FC = () => {
  return (
    <div className='space-y-24 mx-6 mb-24 flex flex-col items-center justify-center'>
        <Header/>
        <OurTeam/>
    </div>
  )
}

export default About