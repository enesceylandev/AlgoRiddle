import { faBan, faReply, faShare, faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import React from 'react';

type Map = {
  ruleset: {
    control: string[];
    color: string[];
    functions: { name: string; args: number }[];
  },
  player: {
    spawn: number[];
    direction: string,
  },
  board: {
    cord: number[];
    color: string;
    required?: boolean
  }[]
}
type Props = {
  selected: number[] | null;
  notation: string[][];
  setNotation: React.Dispatch<React.SetStateAction<string[][]>>;
  selectedMap: Map
};
type ControlButtonProps = {
  onClick: () => void;
  text?: string;
  active: boolean;
  icon?: IconDefinition
};
type ColorButtonProps = {
  key: number;
  onClick: (color: string) => void;
  color: string;
};

const Controls: React.FC<Props> = ({ selected, notation, setNotation, selectedMap }) => {
  const updateSelectedNotation = (newValue: string) => {
    if (selected !== null) {
        let selectedLayer = notation[selected[1]-1] || [];
        const layerLength = selectedLayer.length;
        const missingSlots = selected[0] - layerLength + 1;
        // If the selected layer is shorter than the selected slot, fill the missing slots with undefined
        if (missingSlots > 0) { selectedLayer = selectedLayer.concat(new Array(missingSlots).fill(undefined)) }
        // Check if there is a condition already set for the selected slot
        let condution = null
        if (selectedMap.ruleset.color.includes(selectedLayer[selected[0]])){ condution = selectedLayer[selected[0]] }
        // If there is a condition and the selected color is part of the ruleset, append the new value to the condition
        if(condution !== null && (selectedMap.ruleset.color.includes(selectedLayer[selected[0]]))){ newValue = condution + "-" + newValue }
        selectedLayer[selected[0]] = newValue;
        setNotation((prev) => {
        const updatedPart = [...prev];
        updatedPart[selected[1]-1] = selectedLayer;
        return updatedPart;
        });
    }
  };


  const ControlButton:React.FC<ControlButtonProps> = ({ onClick, text, active, icon }) => (
    <button
      onClick={onClick}
      className={`dark:border-slate-800 flex items-center justify-center p-2 h-[40px] border 
      ${icon ? (icon === faReply ? "rounded-tl-md" : icon === faShare && "rounded-tr-md") :
       text === "f0" ? "rounded-bl-md" : text === "f2" && "rounded-br-md"}
      ${active ? 'text-slate-900 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-slate-600 dark:text-slate-500 cursor-auto'}`}
    >
    {icon && <FontAwesomeIcon icon={active ? icon : faBan} />}
    {text && <h1>{active ? text : <FontAwesomeIcon icon={faBan}/>}</h1>}
  </button>
  );
  
  
  const ColorButton: React.FC<ColorButtonProps> = ({ key, onClick, color }) => (
    <button
      key={key}
      onClick={() => onClick(color)}
      className={`dark:border-slate-800 border p-1 w-9 h-9 
      ${selectedMap.ruleset.color[0] === color ? "rounded-t-md" :
       selectedMap.ruleset.color[selectedMap.ruleset.color.length - 1] === color && "rounded-b-md"}`}
    >
      <div className={`bg-${color}-500 w-full h-full rounded-md`} />
    </button>
  );
  

  return (
    <div>
      <h1 className='font-semibold text-slate-900 dark:text-slate-300'>Commands</h1>
      <div className="flex">
        <div className="grid grid-cols-3 p-4">
          <ControlButton
            onClick={() => selectedMap.ruleset.control.includes("left") && updateSelectedNotation('left')}
            active={selectedMap.ruleset.control.includes("left")}
            icon={faReply}
          />
          <ControlButton
            onClick={() => selectedMap.ruleset.control.includes("forward") && updateSelectedNotation('forward')}
            active={selectedMap.ruleset.control.includes("forward")}
            icon={faUpLong}
          />
          <ControlButton
            onClick={() => selectedMap.ruleset.control.includes("right") && updateSelectedNotation('right')}
            active={selectedMap.ruleset.control.includes("right")}
            icon={faShare}
          />
          <ControlButton
            onClick={() => selectedMap.ruleset.functions[0].args >= 1 && updateSelectedNotation('f0')}
            active={selectedMap.ruleset.functions[0].args >= 1}
            text="f0"
          />
          <ControlButton
            onClick={() => selectedMap.ruleset.functions[1].args >= 1 && updateSelectedNotation('f1')}
            active={selectedMap.ruleset.functions[1].args >= 1}
            text="f1"
          />
          <ControlButton
            onClick={() => selectedMap.ruleset.functions[2].args >= 1 && updateSelectedNotation('f2')}
            active={selectedMap.ruleset.functions[2].args >= 1}
            text="f2"
          />
        </div>

        <div className="grid grid-cols-1 h-[10px]">
          {selectedMap.ruleset.color.map((item, index) => (
            <ColorButton
              key={index}
              onClick={updateSelectedNotation}
              color={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Controls;
