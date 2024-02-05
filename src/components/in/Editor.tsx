import React, { useEffect, useState } from 'react'
import Board from './Board'
import { playground } from './maps';
import Panel from './modules/Panel';
import RulesetPopup from './popups/RulesetPopup';
import Palette from './modules/Palette';

type requiredRef = {
    cord: number[];
    color: string;
    required?: boolean;
}[]

type Map = {
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
}

const Editor = () => {

    const [rulesetPopup, setRulesetPopup] = useState<boolean>(false);
    const [editorMap, setEditorMap] = useState<Map>({
        ruleset: {
            control: ['left', 'forward', 'right'],
            color: ['red', 'purple', 'blue'],
            functions: []
        },
        player: {
            spawn: [],
            direction: ''
        },
        board: []
    })
    const [selectedBlock, setSelectedBlock] = useState<number[][]>([]);
    
    const [args, setArgs] = useState<{f0: number, f1: number, f2: number}>({
        f0: 0,
        f1: 0,
        f2: 0,
    })

    useEffect(() => {
        console.log(selectedBlock)
    }, [selectedBlock])
    const [requiredRef, setRequiredRef] = React.useState<requiredRef>(editorMap.board.filter((item) => item.required === true));
    const [player, setPlayer] = useState<{ cords: number[], direction: string | undefined }>({
    cords: [editorMap.player.spawn[0], editorMap.player.spawn[1]],
    direction: editorMap.player.direction
    });
    
  return (
    <div className='flex items-center justify-center relative'>
        <img src='https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif' alt="" className='dark:blur-xl opacity-50 absolute top-0 left-0 overflow-hidden select-none -z-0'/>
    <div className='flex items-center text-white'>
        <Board requiredRef={requiredRef} setRequiredRef={setRequiredRef} player={player} selectedMap={editorMap} 
        setEditorMap={setEditorMap} selectedBlock={selectedBlock} setSelectedBlock={setSelectedBlock}/>
        <Panel setRulesetPopup={setRulesetPopup}/>
    {rulesetPopup && <RulesetPopup setRulesetPopup={setRulesetPopup} args={args} setArgs={setArgs}/>}
    </div>
    <div className='absolute bottom-5'>
        {selectedBlock.length > 0 && <Palette selectedBlock={selectedBlock} setSelectedBlock={setSelectedBlock} editorMap={editorMap} setEditorMap={setEditorMap}/> }
    </div>
    </div>
  )
}

export default Editor