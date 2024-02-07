import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

type Props = {
  setRulesetPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBlock: React.Dispatch<React.SetStateAction<number[][]>>;
};

const Panel: React.FC<Props> = ({ setRulesetPopup, setPreview, setSelectedBlock }) => {
  return (
    <div className='border rounded-md flex flex-col space-y-3 py-5 px-3 w-48 items-center justify-center dark:border-slate-800 text-slate-300 overflow-auto scroll-smooth'>
      <button onClick={() => { setPreview(true); setSelectedBlock([]) }} className='bg-green-500 hover:bg-green-600 w-full rounded-md text-center'>
        <FontAwesomeIcon icon={faPlay} className='mr-2' /> Test Map
      </button>
      <button onClick={() => setRulesetPopup(true)} className='bg-blue-500 hover:bg-blue-600 w-full rounded-md text-center'>
        <FontAwesomeIcon icon={faCog} className='mr-2' /> Change Ruleset
      </button>
      <Link to='/play' className='bg-red-500 hover:bg-red-600 w-full rounded-md text-center'>
        <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' /> Quit Editor
      </Link>
    </div>
  );
};

export default Panel;