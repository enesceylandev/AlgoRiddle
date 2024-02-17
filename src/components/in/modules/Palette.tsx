import { faShuttleSpace, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Map } from '../maps';
type Props = {
  selectedBlock: number[][],
  setSelectedBlock?: React.Dispatch<React.SetStateAction<number[][]>>;
  editorMap: Map,
  setEditorMap?: React.Dispatch<React.SetStateAction<Map>>;
  setPlayer?: React.Dispatch<React.SetStateAction<{ cords: number[]; direction: string | undefined; }>>;
}

const Palette: React.FC<Props> = ({ selectedBlock, setSelectedBlock, editorMap, setEditorMap, setPlayer }) => {

  const handleBlockChange = (color: string, type: string, rotate?: string) => {
    if (type === 'color') {
      if (color === 'blank') {
        setSelectedBlock?.([]);
        setEditorMap?.({ ...editorMap, board: [...editorMap.board.filter(item => !selectedBlock.some(newItem => newItem[0] === item.cord[0] && newItem[1] === item.cord[1]))] });
      } else {
        const newBlock = selectedBlock.map(item => ({ cord: item, color: color }));
        setSelectedBlock?.([]);
        setEditorMap?.({ ...editorMap, board: [...editorMap.board.filter(item => !newBlock.some(newItem => newItem.cord[0] === item.cord[0] && newItem.cord[1] === item.cord[1])), ...newBlock] });
      }
    } else if (type === 'symbol') {
      if (color === 'faShuttleSpace' && !!rotate) {
        selectedBlock.forEach(item => {
          setEditorMap?.({ ...editorMap, player: { spawn: item, direction: rotate } });
          setPlayer?.({ cords: item, direction: rotate });
        });
        setSelectedBlock?.([]);
      } else {
        setSelectedBlock?.([]);
        const newBlock = editorMap.board.filter(item => selectedBlock.some(newItem => newItem[0] === item.cord[0] && newItem[1] === item.cord[1]));
        const newItem: { cord: number[]; color: string; required?: true | undefined; }[] = [];

        newBlock.map((item) => {
          newItem.push({ ...item, required: true });
          return null;
        });
        
        setEditorMap?.({
          ...editorMap,
          board: [
            ...editorMap.board.filter(item => !newItem.some(newItem => newItem.cord[0] === item.cord[0] && newItem.cord[1] === item.cord[1])),
            ...newItem.map(item => (item))
          ]
        });

      }
    }
  };

  return (
    <div className='bg-slate-100 dark:bg-slate-700 sm:w-[550px] w-[350px] p-2 rounded-md flex items-center justify-between z-40'>
      <div className='sm:space-x-3 space-x-1 z-40'>
        <button onClick={() => handleBlockChange('faShuttleSpace', 'symbol', 'left')} className='bg-blue-500 text-sm sm:text-md  hover:scale-110 transition-all text-white shadow-md rounded-md sm:w-8 sm:h-8 w-6 h-6'>
          <FontAwesomeIcon icon={faShuttleSpace} className='rotate-180' />
        </button>
        <button onClick={() => handleBlockChange('faShuttleSpace', 'symbol', 'down')} className='bg-blue-500 text-sm sm:text-md hover:scale-110 transition-all text-white shadow-md rounded-md sm:w-8 sm:h-8 w-6 h-6'>
          <FontAwesomeIcon icon={faShuttleSpace} className='rotate-90' />
        </button>
        <button onClick={() => handleBlockChange('faShuttleSpace', 'symbol', 'up')} className='bg-blue-500 text-sm sm:text-md hover:scale-110 transition-all text-white shadow-md rounded-md sm:w-8 sm:h-8 w-6 h-6'>
          <FontAwesomeIcon icon={faShuttleSpace} className='-rotate-90' />
        </button>
        <button onClick={() => handleBlockChange('faShuttleSpace', 'symbol', 'right')} className='bg-blue-500 text-sm sm:text-md hover:scale-110 transition-all text-white shadow-md rounded-md sm:w-8 sm:h-8 w-6 h-6'>
          <FontAwesomeIcon icon={faShuttleSpace} className='rotate-0' />
        </button>
        <button onClick={() => handleBlockChange('faStar', 'symbol')} className='bg-blue-500 text-sm sm:text-md hover:scale-110 transition-all text-white shadow-md rounded-md sm:w-8 sm:h-8 w-6 h-6'>
          <FontAwesomeIcon icon={faStar} />
        </button>
      </div>

      <div className='sm:space-x-3 space-x-1 z-40'>
        <button onClick={() => handleBlockChange('blue', 'color')} className='bg-blue-500 hover:scale-110 transition-all text-white shadow-md rounded-md sm:w-8 sm:h-8 w-6 h-6'></button>
        <button onClick={() => handleBlockChange('purple', 'color')} className='bg-purple-500 hover:scale-110 transition-all text-white shadow-md rounded-md sm:w-8 sm:h-8 w-6 h-6'></button>
        <button onClick={() => handleBlockChange('red', 'color')} className='bg-red-500 hover:scale-110 transition-all text-white shadow-md rounded-md sm:w-8 sm:h-8 w-6 h-6'></button>
        <button onClick={() => handleBlockChange('blank', 'color')} className='border border-slate-300 dark:border-slate-500 hover:scale-110 transition-all shadow-md rounded-md sm:w-8 sm:h-8 w-6 h-6'></button>
      </div>
    </div>
  );
};

export default Palette;
