import React from 'react'
import Header from './Header'
import Showcase from './Showcase'
import Features from './Features'

const Landing = () => {
  return (
    <div className='space-y-24 mx-6 flex flex-col items-center justify-center'>
        <Header/>
        <Showcase/>
        <Features/>
    </div>
  )
}

export default Landing