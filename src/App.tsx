import React from 'react';
import './input.css';
import Navbar from './components/Global/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Landing from './components/out/Landing/Landing';
import About from './components/out/About/About';
import Footer from './components/Global/Footer';
import Play from './components/in/Play';

function App() {
  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (location.pathname === '/about#team') {
      const teamSection = document.getElementById('team');
      if (teamSection) {
        teamSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className='flex flex-col items-center dark:bg-primary-background-dark'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/about' element={<About />} />
        <Route path='/play' element={<Play/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
