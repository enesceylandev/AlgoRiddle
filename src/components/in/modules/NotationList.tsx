import { faPlay, faReply, faRotateRight, faShare, faStop, faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';

type Props = {
    notation: string[][];
};

const whichIcon = (direction: string) => {
    switch (direction) {
        case "left":
            return faReply;
        case "right":
            return faShare;
        case "forward":
            return faUpLong;
        default:
            return faReply;
    };
};

const NotationList: React.FC<Props> = ({ notation }) => {
    const [list, setList] = useState<string[]>([]);
    const iterationRef = useRef<number>(0);
    

    const ReadNotation = (i: number) => {
        const notationArray = notation[i];
        let index = 0;
        
        processItem(index, notationArray, iterationRef.current);
    };

    const processItem = (index: number, notationArray: string[], currentIteration: number) => {
        if (notationArray && index < notationArray.length && currentIteration === iterationRef.current) {
            const item = notationArray[index];
            
            if (item) {
                if (item.includes("f") && !item.includes("for") && !item.includes("left")) {
                    iterationRef.current += 1; // Her "f" öğesi için yeni bir iterasyon numarası
                    ReadNotation(parseInt(item.split("f")[1]));
                } else {
                    setList((prevList) => [...prevList, item]);
                }
            }

            index++;

            const delayBetweenSteps = 100;
            setTimeout(() => {
                processItem(index, notationArray, currentIteration);

                // Scroll to bottom after each step
                const element = document.querySelector(".scroll-smooth");
                element?.scrollTo({
                    top: element.scrollHeight,
                    behavior: "smooth"
                });
            }, delayBetweenSteps);
        }
    };

    const startProcess = () => {
        setList([]);
        iterationRef.current += 1; 
        ReadNotation(0);
    };

    const stopProcess = () => { 
        iterationRef.current += 1;
    };

    const resetProcess = () => { 
        setList([]);
        iterationRef.current += 1;
    };

    return (
        <div className='z-20'>
            <div className='border-x border-t dark:border-slate-800 p-2 rounded-t-md text-slate-300 h-60 overflow-auto scroll-smooth'>
                <ul className='grid grid-cols-4 items-center gap-1 w-[18rem]'>
                    {list.map((item, index) => (
                        <li key={index} className='dark:bg-[#162137] bg-slate-100 hover:bg-slate-200 dark:hover:bg-[#243047] text-slate-800 dark:text-slate-300 
                         hover:cursor-pointer text-sm flex justify-between p-1 h-8'>
                            <p className='pl-0.5 text-left text-slate-700 dark:text-slate-500'>{index + 1}.</p>
                            <div className='flex justify-end items-center pl-1'>
                                {item === "left" || item === "right" || item === "forward" ?
                                <FontAwesomeIcon icon={whichIcon(item)} className='p-2.5'/> : 
                                (item.split("-")[1] ?                              
                                    <div className='p-0.5 w-7 h-7'>
                                    <div className={`bg-${item.split("-")[0]}-500 w-full h-full rounded-md flex items-center justify-center`}>
                                        <FontAwesomeIcon icon={whichIcon(item.split("-")[1])} />
                                    </div>
                                    </div>
                                :
                                    <div className='p-0.5 w-7 h-7'>
                                    <div className={`bg-${item.split("-")[0]}-500 w-full h-full rounded-md flex items-center justify-center`}/>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='border-x border-b dark:border-slate-800 p-2 justify-between flex rounded-b-md'>
                <FontAwesomeIcon icon={faPlay} className='border dark:border-slate-800 rounded-md w-10 p-2 text-lg hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 text-green-500 hover:text-green-600' onClick={startProcess}/>
                <FontAwesomeIcon icon={faRotateRight} className='border dark:border-slate-800 rounded-md w-10 p-2 text-lg hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 text-blue-500 hover:text-blue-600' onClick={resetProcess}/>
                <FontAwesomeIcon icon={faStop} className='border dark:border-slate-800 rounded-md w-10 p-2 text-lg hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 text-red-500 hover:text-red-600' onClick={stopProcess}/>
            </div>
        </div>
    );
};

export default NotationList;