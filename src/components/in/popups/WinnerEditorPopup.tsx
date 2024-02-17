import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Map } from '../maps'

type Props = {
  setWinnerPopup: React.Dispatch<React.SetStateAction<boolean>>;
  customMapId: string;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
  setList: React.Dispatch<React.SetStateAction<string[]>>;
  setRequiredRef: React.Dispatch<React.SetStateAction<{ cord: number[]; color: string; required?: boolean; }[]>>;
  selectedMap: Map;
  setPlayer: React.Dispatch<React.SetStateAction<{ cords: number[]; direction: string | undefined; }>>;
}
const WinnerEditorPopup: React.FC<Props>  = ({setWinnerPopup, customMapId, setPreview, setList, setRequiredRef, selectedMap, setPlayer}) => {
  const [copySuccess, setCopySuccess] = React.useState(false)
  const copyTheMap = () => {
    setCopySuccess(true)
    navigator.clipboard.writeText(customMapId)
    setTimeout(()=> {
      setPreview(false)
      setList([])
      setPlayer({ cords: [selectedMap.player.spawn[0], selectedMap.player.spawn[1]], direction: selectedMap.player.direction })
      setRequiredRef(selectedMap.board.filter((item) => item.required === true))
      setWinnerPopup(false)
      setCopySuccess(false)
    }, 1000)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => (setWinnerPopup(false))}>
      <div className="relative bg-[#F7F7FC] dark:bg-[#212529] p-4 rounded-xl shadow-md mx-5" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 text-black dark:text-[#dee2e6] text-center sm:w-96">
          <h1 className='text-xl font-semibold'>The map is ready to be shared!</h1>
        </div>

        <button
          onClick={() => copyTheMap()}
          className={`w-full flex items-center justify-center h-10 ${copySuccess ? 'bg-green-600': 'bg-[#007FFF] hover:bg-[#0066CC]'} text-white rounded-md transition-all shadow-md mb-3 dark:shadow-none`}>
          <FontAwesomeIcon icon={faCopy} className='mr-2 -ml-2' />
          <span>Copy Map ID</span>
        </button>
        
      </div>
    </div>
  )
}

export default WinnerEditorPopup