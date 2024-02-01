import React, { useEffect, useRef, useState } from 'react'
import Board from './Board'
import Commands from './modules/Commands'
import NotationList from './modules/NotationList'
import Functions from './modules/Functions'
import { playground } from './maps'

const Play: React.FC = () => {
  const [selected, setSelected] = useState<number[] | null>(null)
  const [notation, setNotation] = useState<string[][]>([])

  const [list, setList] = useState<string[]>([]);
  const iterationRef = useRef<number>(0);

  const [player, setPlayer] = useState<{ cords: number[], direction: string | undefined }>({
    cords: [playground[0].player.spawn[0], playground[0].player.spawn[1]],
    direction: playground[0].player.direction
  });
  return (
    <div className='flex items-center'>
        <img src='https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif' alt="" className='dark:blur-xl opacity-50 absolute top-0 left-0 overflow-hidden -z-0'/>
        <div className='flex flex-col space-y-12 z-20'>
          
          <Functions selected={selected} setSelected={setSelected} notation={notation}/>
          <Commands selected={selected} notation={notation} setNotation={setNotation}/>
        </div>
        <Board list={list} iterationRef={iterationRef} player={player} setPlayer={setPlayer}/>
        <NotationList notation={notation} list={list} setList={setList} iterationRef={iterationRef} player={player}/>
    </div>
  )
}

export default Play