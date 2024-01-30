import { faReply, faShare, faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Props = {
  selected: number[] | null;
  notation: string[][];
  setNotation: React.Dispatch<React.SetStateAction<string[][]>>
};

const Controls: React.FC<Props> = ({ selected, notation, setNotation }) => {
  const updateSelectedNotation = (newValue: string) => {
    if (selected !== null) {
        let selectedLayer = notation[selected[1]-1] || [];

        const layerLength = selectedLayer.length;
        const missingSlots = selected[0] - layerLength + 1;

        if (missingSlots > 0) {
        selectedLayer = selectedLayer.concat(new Array(missingSlots).fill(undefined));
        }

        selectedLayer[selected[0]] = newValue;

        setNotation((prev) => {
        const updatedTest = [...prev];
        updatedTest[selected[1]-1] = selectedLayer;
        return updatedTest;
        });
    }
  };

  return (
    <div>
      <h1 className='font-semibold text-slate-900 dark:text-slate-300'>Commands</h1>
      <div className='flex text-slate-900 dark:text-slate-300'>
        <div className='grid grid-cols-3 p-2'>
          <button onClick={() => updateSelectedNotation('left')} className='dark:border-slate-800 flex items-center justify-center p-2 border rounded-tl-md'>
            <FontAwesomeIcon icon={faReply} />
          </button>
          <button onClick={() => updateSelectedNotation('forward')} className='dark:border-slate-800 flex items-center justify-center p-2 border-y'>
            <FontAwesomeIcon icon={faUpLong} />
          </button>
          <button onClick={() => updateSelectedNotation('right')} className='dark:border-slate-800 flex items-center justify-center p-2 border rounded-tr-md'>
            <FontAwesomeIcon icon={faShare} />
          </button>

          <button onClick={() => updateSelectedNotation('f0')} className='dark:border-slate-800 border-b border-r border-l rounded-bl-md flex items-center justify-center p-2 w-10 h-10'>
            f0
          </button>
          <button onClick={() => updateSelectedNotation('f1')} className='dark:border-slate-800 border-b flex items-center justify-center p-2 w-10 h-10'>
            f1
          </button>
          <button onClick={() => updateSelectedNotation('f2')} className='dark:border-slate-800 border-b border-r border-l rounded-br-md flex items-center justify-center p-2 w-10 h-10'>
            f2
          </button>
        </div>
        
        <div className='grid grid-cols-1'>
          <button onClick={() => updateSelectedNotation('red')} className='dark:border-slate-800 border rounded-t-md p-1 w-9 h-9'>
            <div className='bg-red-500 w-full h-full rounded-md' />
          </button>
          <button onClick={() => updateSelectedNotation('green')} className='dark:border-slate-800 border-x p-1 w-9 h-9'>
            <div className='bg-green-500 w-full h-full rounded-md' />
          </button>
          <button onClick={() => updateSelectedNotation('blue')} className='dark:border-slate-800 border rounded-b-md p-1 w-9 h-9'>
            <div className='bg-blue-500 w-full h-full rounded-md' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
