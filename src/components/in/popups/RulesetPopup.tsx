import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCheck, faChevronLeft, faReply, faShare, faUpLong } from '@fortawesome/free-solid-svg-icons';

type Props = {
  setRulesetPopup: React.Dispatch<React.SetStateAction<boolean>>;
  args: { f0: number; f1: number; f2: number };
  setArgs: React.Dispatch<React.SetStateAction<{ f0: number; f1: number; f2: number }>>;
};

type ControlButtonProps = {
    text?: string;
    icon?: IconDefinition;
};

const RulesetPopup: React.FC<Props> = ({ args, setArgs, setRulesetPopup }) => {
  const [page, setPage] = useState<string>('preview');

  const funcPreview = (repeat: number) => {
    const buttons = [];
    for (let i = 0; i < repeat; i++) {
      const isLastButton = i === repeat - 1;
      buttons.push(
        <div key={i} className={`dark:border-slate-600 border-r border-y flex items-center justify-center text-sm ${isLastButton ? 'rounded-r-md' : 'rounded-y-md'}`} />
      );
    }
    return buttons;
  };

  const ControlButton:React.FC<ControlButtonProps> = ({ text, icon }) => (
    <button
    className={`dark:border-slate-600 flex items-center justify-center p-2 h-[40px] border  cursor-not-allowed
    ${icon ? (icon === faReply ? "rounded-tl-md" : icon === faShare && "rounded-tr-md") :
     text === "f0" ? "rounded-bl-md" : text === "f2" && "rounded-br-md"}
    text-slate-600 dark:text-slate-500`}
    >
        {icon && <FontAwesomeIcon icon={icon} />}
        {text && <h1>{text}</h1>}
    </button>
  );
  const generateSelectedCode = (selectedArgs: number, selectedFunction: string) => (
    <span className="flex gap-5">
        <button
          onClick={() => setArgs(prev => ({ ...prev, [selectedFunction]: selectedArgs !== 0 ? selectedArgs - 1 : selectedArgs }))}
          className="border w-8 border-red-500 hover:border-red-600 text-red-600 font-bold rounded-md"
        >-</button>
        <div className="grid grid-cols-6">
          <h2 className="p-1 px-2 font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300
        border-slate-300 dark:border-slate-600 border-l border-y rounded-l-md">{selectedFunction}</h2>
          {funcPreview(5)}
        </div>
        <button
            onClick={() => setArgs(prev => ({ ...prev, [selectedFunction]: selectedArgs !== 12 ? selectedArgs + 1 : selectedArgs }))}
            className="border w-8 border-green-500 hover:border-green-600 text-green-600 font-bold rounded-md"
        >+</button>
        <span className="flex items-center justify-center text-slate-800 dark:text-slate-300 font-bold">{selectedArgs}</span>
    </span>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setRulesetPopup(false)}>
      <div className="relative bg-[#F7F7FC] dark:bg-[#212529] p-4 rounded-xl shadow-md mx-5" onClick={e => e.stopPropagation()}>
        {page === 'preview' && (
          <>
            <h1 className="text-xl font-semibold p-4 text-black dark:text-[#dee2e6] text-center">Choose the module</h1>
            <div className="grid grid-cols-2 gap-5 text-slate-800 dark:text-slate-300 my-10">
              <button onClick={() => setPage("function")} className="flex flex-col p-3 bg-white hover:bg-slate-50 dark:bg-[#2c3136] hover:dark:bg-[#3d4247] shadow-md rounded-md">
                <div className="grid grid-cols-6">
                  <p className="col-span-6 font-semibold mb-12">Functions</p>
                  <h2 className="p-1 px-2 font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 border-l border-y rounded-l-md">F0</h2>
                  {funcPreview(5)}
                </div>
              </button>
              <button className="flex flex-col p-3 bg-white hover:bg-slate-50 dark:bg-[#2c3136] hover:dark:bg-[#3d4247] shadow-md rounded-md cursor-not-allowed">
                <p className="col-span-6 font-semibold mb-5">Commands</p>
                <div className="grid grid-cols-3 p-4">
                  <ControlButton icon={faReply} />
                  <ControlButton icon={faUpLong} />
                  <ControlButton icon={faShare} />
                  <ControlButton text="f0" />
                  <ControlButton text="f1" />
                  <ControlButton text="f2" />
                </div>
              </button>
            </div>
          </>
        )}
        {page === 'function' && (
          <>
            <button onClick={() => setPage("preview")} className="absolute top-2 left-5 text-red-500 hover:text-red-600 p-2"><FontAwesomeIcon icon={faChevronLeft} /></button>
            <button onClick={() => { setPage("preview"); setRulesetPopup(false) }} className="absolute top-2 right-5 text-green-500 hover:text-green-600 p-2"><FontAwesomeIcon icon={faCheck} /></button>
            <h1 className="text-xl font-semibold p-4 text-black dark:text-[#dee2e6] text-center">Function settings</h1>
            <div className="space-y-2">
              {generateSelectedCode(args.f0, "f0")}
              {generateSelectedCode(args.f1, "f1")}
              {generateSelectedCode(args.f2, "f2")}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RulesetPopup;