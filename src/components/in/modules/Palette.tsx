import { faShuttleSpace, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

type Props = {
    selectedBlock: number[][],
    setSelectedBlock?: React.Dispatch<React.SetStateAction<number[][]>>;
    editorMap: {
        ruleset: {
            control: string[],
            color: string[],
            functions: { name: string; args: number }[];
        },
        player: {
            spawn: number[],
            direction: string,
        },
        board: {
            cord: number[],
            color: string,
            required?: true
        }[]
    },
    setEditorMap?: React.Dispatch<React.SetStateAction<{
        ruleset: {
            control: string[];
            color: string[];
            functions: { name: string; args: number; }[];
        };
        player: {
            spawn: number[];
            direction: string;
        };
        board: { cord: number[]; color: string; required?: true; }[];
    }>>;
}

const Palette:React.FC<Props> = ({selectedBlock, setSelectedBlock, editorMap, setEditorMap}) => {
    console.log(editorMap)

    const changeMap = (color: string) => {
        let newBlock = selectedBlock.map((item) => {
            return {cord: item, color: color}
        })
        setSelectedBlock?.([]);
        setEditorMap?.({...editorMap, board: [...editorMap.board.filter(item => !newBlock.some(newItem => newItem.cord[0] === item.cord[0] && newItem.cord[1] === item.cord[1])), ...newBlock]});
        // setEditorMap?.({...editorMap, board: [...editorMap.board.filter(item => !newBlock.some(newItem => newItem.cord[0] === item.cord[0] && newItem.cord[1] === item.cord[1]])), newBlock});
        // console.log(selectedBlock, color)
        // selectedBlock.forEach((item) => {
        //     setEditorMap?.({
        //         ...editorMap,
        //         board: [...editorMap.board, { cord: item, color: color }],
        //     });
        //     console.log(item)
        // });
        // setEditorMap?.({...editorMap, board:[...editorMap.board, {cord:[cordinat[0], cordinat[1]], color:color}]})
    }
  return (
    <div className='bg-slate-100 dark:bg-slate-700 w-[700px] p-2 rounded-md flex items-center justify-between z-40'>
        <div className='space-x-3 z-40'>
        <button onClick={() => setSelectedBlock?.(selectedBlock.length > 0 ? selectedBlock.slice(0, -1) : [])} 
            className='bg-blue-500 hover:bg-blue-600 text-white shadow-md rounded-md w-8 h-8'><FontAwesomeIcon icon={faShuttleSpace} className='rotate-180'/></button>
            <button onClick={() => setSelectedBlock?.(selectedBlock.length > 0 ? selectedBlock.slice(0, -1) : [])} 
            className='bg-blue-500 hover:bg-blue-600 text-white shadow-md rounded-md w-8 h-8'><FontAwesomeIcon icon={faShuttleSpace} className='rotate-90'/></button>
            <button onClick={() => setSelectedBlock?.(selectedBlock.length > 0 ? selectedBlock.slice(0, -1) : [])} 
            className='bg-blue-500 hover:bg-blue-600 text-white shadow-md rounded-md w-8 h-8'><FontAwesomeIcon icon={faShuttleSpace} className='-rotate-90'/></button>
            
            <button onClick={() => setSelectedBlock?.(selectedBlock.length > 0 ? selectedBlock.slice(0, -1) : [])} 
            className='bg-blue-500 hover:bg-blue-600 text-white shadow-md rounded-md w-8 h-8'><FontAwesomeIcon icon={faShuttleSpace} className='rotate-0'/></button>

            <button onClick={() => setSelectedBlock?.(selectedBlock.length > 0 ? selectedBlock.slice(0, -1) : [])} 
            className='bg-blue-500 hover:bg-blue-600 text-white shadow-md rounded-md w-8 h-8'><FontAwesomeIcon icon={faStar}/></button>

        </div>

        <div className='space-x-3 z-40'>
            <button onClick={() => changeMap('blue')} className='bg-blue-500 hover:bg-blue-600 text-white shadow-md rounded-md w-8 h-8'/>
            <button onClick={() => changeMap('purple')} className='bg-purple-500 hover:bg-purple-600 text-white shadow-md rounded-md w-8 h-8'/>
            <button onClick={() => changeMap('red')} className='bg-red-500 hover:bg-red-600 text-white shadow-md rounded-md w-8 h-8'/>
            <button className='border text-white shadow-md rounded-md w-8 h-8'/>
        </div>

    </div>
  )
}

export default Palette