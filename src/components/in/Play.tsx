import React, { useRef, useState, useEffect } from 'react'
import Board from './Board'
import Commands from './modules/Commands'
import NotationList from './modules/NotationList'
import Functions from './modules/Functions'
import { playground } from './maps'
import MapSelectorPopup from './popups/MapSelectorPopup'

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
  const [selectedMap, setSelectedMap] = useState<Map>(playground[0]);
  const [requiredRef, setRequiredRef] = React.useState<requiredRef>(selectedMap.board.filter((item) => item.required === true));

  const [player, setPlayer] = useState<{ cords: number[], direction: string | undefined }>({
    cords: [selectedMap.player.spawn[0], selectedMap.player.spawn[1]],
    direction: selectedMap.player.direction
  });

  useEffect(()=> {
    setPlayer({ cords: [selectedMap.player.spawn[0], selectedMap.player.spawn[1]], direction: selectedMap.player.direction });
    setRequiredRef(selectedMap.board.filter((item) => item.required === true));
    setMapSelectorPopup(false)
  }, [selectedMap])
  return (
    <>
    <div className='flex items-center'>
      <img src='https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif' alt="" className='dark:blur-xl opacity-50 absolute top-0 left-0 overflow-hidden select-none -z-0'/>
        <div className='flex flex-col space-y-12 z-20'>
          <Functions {...{selectedMap, selected, setSelected, notation}} />
          <Commands {...{selectedMap, selected, notation, setNotation}} />
        </div>
        <Board {...{player, requiredRef, setRequiredRef, selectedMap}} />
        <NotationList {...{notation, list, setList, iterationRef, player, setPlayer, requiredRef, setRequiredRef, selectedMap: playground[0], setMapSelectorPopup}} />
    </div>
    {mapSelectorPopup && <MapSelectorPopup {...{setMapSelectorPopup, setSelectedMap}} />}
    </>
  )
}

export default Play