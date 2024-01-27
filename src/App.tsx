import React from 'react';
import './input.css';

function App() {
  return (
    <>
     <p className='text-2xl flex justify-center items-center h-screen'>Hello {process.env.REACT_APP_BRANDNAME}</p> 
    </>
  );
}

export default App;
