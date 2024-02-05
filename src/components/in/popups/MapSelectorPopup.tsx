import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faStar } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpRightDots, faCrown, faCubes, faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

import React from 'react'
import { Link } from 'react-router-dom';

type Props= {
    setMapSelectorPopup: React.Dispatch<React.SetStateAction<boolean>>;
    
}

const MapSelectorPopup: React.FC<Props> = ({setMapSelectorPopup}) => {
    const [input, setInput] = React.useState<string>('') // map code

    const button = (text: string, icon: any, iconColor: string) => {
        return (
            <button className='flex flex-col p-3 bg-white hover:bg-slate-50 dark:bg-[#2c3136] hover:dark:bg-[#3d4247] shadow-md rounded-md'>
                <FontAwesomeIcon icon={icon} className={`${iconColor} text-xl my-2`}/>
                <p className='font-semibold'>{text}</p>
            </button>
        )
    }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={()=> setMapSelectorPopup(false)}>
        <div className="relative bg-[#F7F7FC] dark:bg-[#212529] p-4 rounded-xl shadow-md mx-5" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 text-black dark:text-[#dee2e6] text-center sm:w-96">
                <h1 className='text-xl font-semibold'>Choose the difficulty</h1>
            </div>
            <div className='grid grid-cols-2 gap-5 text-slate-800 dark:text-slate-300 my-10'>
                {button('Beginner', faFaceSmile, 'text-blue-500')}
                {button('Advanced', faArrowUpRightDots, 'text-red-500')}
                {button('Expert', faStar, 'text-amber-500')}
                {button('Specialist', faCrown, 'text-green-500')}
            </div>
            
            <div className='grid grid-cols-4 gap-5'>
                <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='h-10 rounded-md col-span-3 p-2 -outline-offset-1 shadow-md
                text-slate-700 dark:text-slate-300 bg-white dark:bg-[#2c3136] 
                outline-none focus:outline-slate-500'
                placeholder='Enter the map code'/>    

                <button className={`w-full h-10 rounded-md mb-3 transition-all
                ${input.length >= 1 ? 'bg-green-600 hover:bg-green-500 cursor-pointer': 'bg-gray-500 cursor-auto'}  text-white`}>
                    <FontAwesomeIcon icon={input.length >= 1 ? faDoorOpen : faDoorClosed}/>
                </button>
            </div>
            <Link to='/editor' 
            className='w-full flex items-center justify-center h-10 bg-green-600 hover:bg-green-500 text-white rounded-md transition-all shadow-md dark:shadow-none'>
                <FontAwesomeIcon icon={faCubes} className='mr-2 -ml-2'/>
                <span>Create Custom Map</span>
            </Link>
        </div>
    </div>
  )
}

export default MapSelectorPopup