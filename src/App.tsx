import React from 'react';
import './input.css';
import Navbar from './components/in/Navbar';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/in/Landing/Landing';
import About from './components/in/About';

function App() {
  return (
    <div className='flex flex-col items-center dark:bg-primary-background-dark'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
