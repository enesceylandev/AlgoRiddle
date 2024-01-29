import React from 'react';
import './input.css';
import Navbar from './components/in/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Landing from './components/in/Landing/Landing';
import About from './components/in/About/About';
import Footer from './components/in/Footer';

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
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
