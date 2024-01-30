import React, { useState } from 'react'
import Board from './Board'
import Commands from './modules/Commands'
import NotationList from './modules/NotationList'
import Functions from './modules/Functions'

const Play: React.FC = () => {
  const [selected, setSelected] = useState<number[] | null>(null)
  const [notation, setNotation] = useState<string[][]>([])

  return (
    <div className='flex items-center'>
        <div className='flex flex-col space-y-12'>
          
          <Functions selected={selected} setSelected={setSelected} notation={notation}/>
          <Commands selected={selected} notation={notation} setNotation={setNotation}/>
        </div>
        <Board/>
        {/* <NotationList notation={notation}/> */}
    </div>
  )
}

export default Play