import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faFaceSmile, faStar } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpRightDots, faCheck, faCrown, faCubes, faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { Map } from '../maps';

type Props = {
  setMapSelectorPopup: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedMap: React.Dispatch<React.SetStateAction<Map>>
  dailyMap: Map[]
}


const MapSelectorPopup: React.FC<Props> = ({ setMapSelectorPopup, setSelectedMap, dailyMap }) => {
  const [input, setInput] = React.useState<string>(''); // map code

  const ChooseMap = (difficulty:string) => {
    switch(difficulty){
      case 'Beginner':
        setSelectedMap(dailyMap[0]);
        setTimeout(() => setMapSelectorPopup(false), 100);
        break;
      case 'Advanced':
        setSelectedMap(dailyMap[1]);
        setTimeout(() => setMapSelectorPopup(false), 100);
        break;
      case 'Expert':
        setSelectedMap(dailyMap[2]);
        setTimeout(() => setMapSelectorPopup(false), 100);
        break;
      case 'Specialist':
        setSelectedMap(dailyMap[3]);
        setTimeout(() => setMapSelectorPopup(false), 100);
        break;
    }
  }
  const renderButton = (text: string, icon: IconDefinition, iconColor: string, difficulty: string) => {
    let selectedMap:any;
    switch (difficulty){
      case 'Beginner':
        selectedMap = dailyMap[0];
        break;
      case 'Advanced':
        selectedMap = dailyMap[1];
        break;
      case 'Expert':
        selectedMap = dailyMap[2];
        break;
      case 'Specialist':
        selectedMap = dailyMap[3];
        break;
    }
    // console.log(JSON.stringify(selectedMap?.solution) )
    let savedSolution = JSON.parse(localStorage.getItem('solutions') as string) || [];
    if(savedSolution.some((item: any)=> JSON.stringify(item) === JSON.stringify(selectedMap?.solution))){
      return (
        <button onClick={() => ChooseMap(difficulty)} className='flex flex-col p-3 bg-white dark:bg-[#2c3136] shadow-md rounded-md cursor-not-allowed opacity-50'>
          <FontAwesomeIcon icon={faCheck} className={`${iconColor} text-xl my-2`} />
          <p className='font-semibold'>{text}</p>
        </button>
      )
    }else{
      return (
        <button onClick={() => ChooseMap(difficulty)} className='flex flex-col p-3 bg-white hover:bg-slate-50 dark:bg-[#2c3136] hover:dark:bg-[#3d4247] shadow-md rounded-md'>
        <FontAwesomeIcon icon={icon} className={`${iconColor} text-xl my-2`} />
        <p className='font-semibold'>{text}</p>
      </button>
      )
    }
  };

  const joinMap = (input: string) => {
    try {
      const originalText = input;
      const key = "ultraSecretKey";
      const decryptedMessage = CryptoJS.AES.decrypt(originalText, key).toString(CryptoJS.enc.Utf8);
      setSelectedMap(JSON.parse(decryptedMessage));
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setMapSelectorPopup(false)}>
      <div className="relative bg-[#F7F7FC] dark:bg-[#212529] p-4 rounded-xl shadow-md mx-5" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 text-black dark:text-[#dee2e6] text-center sm:w-96">
          <h1 className='text-xl font-semibold'>Choose the difficulty</h1>
        </div>
        <div className='grid grid-cols-2 gap-5 text-slate-800 dark:text-slate-300 my-10'>
          {renderButton('Beginner', faFaceSmile, 'text-blue-500', 'Beginner')}
          {renderButton('Advanced', faArrowUpRightDots, 'text-red-500', 'Advanced')}
          {renderButton('Expert', faStar, 'text-amber-500', 'Expert')}
          {renderButton('Specialist', faCrown, 'text-green-500', 'Specialist')}
        </div>

        <div className='grid grid-cols-4 gap-5'>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ height: '2.5rem', borderRadius: '.375rem', padding: '.5rem', outlineOffset: '-1px' }}
            className='col-span-3 shadow-md text-slate-700 dark:text-slate-300 bg-white dark:bg-[#2c3136] outline-none focus:outline-slate-500'
            placeholder='Enter the map code' />

          <button
            onClick={() => input.length >= 1 && joinMap(input)}
            className={`w-full h-10 shadow-md rounded-md mb-3 transition-all ${input.length >= 1 ? 'bg-green-600 hover:bg-green-500 cursor-pointer' : 'bg-gray-500 cursor-auto'}  text-white`}>
            <FontAwesomeIcon icon={input.length >= 1 ? faDoorOpen : faDoorClosed} />
          </button>
        </div>
        <Link
          to='/editor'
          className='w-full flex items-center justify-center h-10 bg-green-600 hover:bg-green-500 text-white rounded-md transition-all shadow-md dark:shadow-none'>
          <FontAwesomeIcon icon={faCubes} className='mr-2 -ml-2' />
          <span>Create Custom Map</span>
        </Link>
      </div>
    </div>
  );
};

export default MapSelectorPopup
