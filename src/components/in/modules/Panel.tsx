import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  setRulesetPopup: React.Dispatch<React.SetStateAction<boolean>>
  setPreview: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedBlock: React.Dispatch<React.SetStateAction<number[][]>>
}
const Panel:React.FC<Props> = ({setRulesetPopup, setPreview, setSelectedBlock}) => {
  return (
    <div className='border rounded-md flex flex-col space-y-3 py-5 px-3 w-48 items-center justify-center dark:border-slate-800 text-slate-300 overflow-auto scroll-smooth'>
        <button onClick={()=> {setPreview(true); setSelectedBlock([])}} className='bg-green-500 hover:bg-green-600 text-white shadow-md rounded-md w-full'>Test The Map</button>
        <button onClick={()=> setRulesetPopup(true)} className='bg-blue-500 hover:bg-blue-600 text-white shadow-md rounded-md w-full'>Change Ruleset</button>
        <Link to='/play' className='bg-red-500 hover:bg-red-600 text-white text-center shadow-md rounded-md w-full'>Quit the editor</Link>
    </div>
  )
}

export default Panel