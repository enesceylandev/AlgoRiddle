import React, { useRef, useState, useEffect } from 'react'
import Board from './Board'
import Commands from './modules/Commands'
import NotationList from './modules/NotationList'
import Functions from './modules/Functions'
import { playground } from './maps'
import MapSelectorPopup from './popups/MapSelectorPopup'

type requiredRef = {
  cord: number[];
  color: string;
  required?: boolean;
}[]
const Play: React.FC = () => {
  const iterationRef = useRef<number>(0);
  const [selected, setSelected] = useState<number[] | null>(null)
  const [mapSelectorPopup, setMapSelectorPopup] = useState<boolean>(false);
  const [notation, setNotation] = useState<string[][]>([])
  const [list, setList] = useState<string[]>([]);
  const [requiredRef, setRequiredRef] = React.useState<requiredRef>(playground[0].board.filter((item) => item.required === true));

  const [player, setPlayer] = useState<{ cords: number[], direction: string | undefined }>({
    cords: [playground[0].player.spawn[0], playground[0].player.spawn[1]],
    direction: playground[0].player.direction
  });
  return (
    <>
    <div className='flex items-center'>
        <img src='https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif' alt="" className='dark:blur-xl opacity-50 absolute top-0 left-0 overflow-hidden select-none -z-0'/>
        <div className='flex flex-col space-y-12 z-20'>
          <Functions selected={selected} setSelected={setSelected} notation={notation}/>
          <Commands selected={selected} notation={notation} setNotation={setNotation}/>
        </div>
        <Board player={player} requiredRef={requiredRef} setRequiredRef={setRequiredRef}/>
        <NotationList notation={notation} list={list} setList={setList} iterationRef={iterationRef} 
        player={player} setPlayer={setPlayer} requiredRef={requiredRef} setRequiredRef={setRequiredRef} setMapSelectorPopup={setMapSelectorPopup}/>
    </div>
    {mapSelectorPopup && <MapSelectorPopup setMapSelectorPopup={setMapSelectorPopup}/>}
    </>
  )
}

export default Play