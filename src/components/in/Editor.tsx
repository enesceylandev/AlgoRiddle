import React, { useEffect, useRef, useState } from 'react'
import Board from './Board'
import { playground } from './maps';
import Panel from './modules/Panel';
import RulesetPopup from './popups/RulesetPopup';
import Palette from './modules/Palette';

import NotationList from './modules/NotationList';
import Functions from './modules/Functions';
import Commands from './modules/Commands';

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

    const [args, setArgs] = useState<{f0: number, f1: number, f2: number}>({
        f0: 0,
        f1: 0,
        f2: 0,
    })
    const [editorMap, setEditorMap] = useState<Map>({
        ruleset: {
            control: ['left', 'forward', 'right'],
            color: ['red', 'purple', 'blue'],
            functions: [{ name: 'f0', args: args.f0 }, { name: 'f1', args: args.f1 }, { name: 'f2', args: args.f2 }]
        },
        player: {
            spawn: [],
            direction: ''
        },
        board: [
        ]
    })
    useEffect(()=> {
        setEditorMap({...editorMap, ruleset: {...editorMap.ruleset, functions: [{ name: 'f0', args: args.f0 }, { name: 'f1', args: args.f1 }, { name: 'f2', args: args.f2 }]}})
    }, [args])

    const [selectedBlock, setSelectedBlock] = useState<number[][]>([]);

    const [preview, setPreview] = useState<boolean>(false);

    const [notation, setNotation] = useState<string[][]>([])
    const [list, setList] = useState<string[]>([]);
    const iterationRef = useRef<number>(0);
    const [mapSelectorPopup, setMapSelectorPopup] = useState<boolean>(false);
    const [selected, setSelected] = useState<number[] | null>(null)

    const [requiredRef, setRequiredRef] = React.useState<requiredRef>(editorMap.board.filter((item) => item.required === true));
    const [player, setPlayer] = useState<{ cords: number[], direction: string | undefined }>({
    cords: [editorMap.player.spawn[0], editorMap.player.spawn[1]],
    direction: editorMap.player.direction
    });

    useEffect(() => {
        setRequiredRef(editorMap.board.filter((item) => item.required === true));
    }, [editorMap])

  return (
    <div className='flex items-center justify-center relative'>
        <img src='https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif' alt="" 
        className='dark:blur-xl opacity-50 absolute top-0 left-0 overflow-hidden select-none -z-0'/>
    <div className='flex items-center text-white z-30'>

        {preview && 
            <div className='flex flex-col space-y-12 z-20'>
              <Functions selectedMap={editorMap} selected={selected} setSelected={setSelected} notation={notation}/>
              <Commands selectedMap={editorMap} selected={selected} notation={notation} setNotation={setNotation}/>
            </div>
        }

        <Board requiredRef={requiredRef} setRequiredRef={setRequiredRef} player={player} selectedMap={editorMap} 
        setEditorMap={setEditorMap} selectedBlock={selectedBlock} setSelectedBlock={setSelectedBlock} preview={preview}/>
        
        {!preview &&
            <Panel setRulesetPopup={setRulesetPopup} setPreview={setPreview} setSelectedBlock={setSelectedBlock}/>
        }
        
        {preview &&
            <NotationList notation={notation} list={list} setList={setList} iterationRef={iterationRef} 
            player={player} setPlayer={setPlayer} requiredRef={requiredRef} setRequiredRef={setRequiredRef} selectedMap={editorMap} setMapSelectorPopup={setMapSelectorPopup} preview={preview} setPreview={setPreview}/>
        }

    {rulesetPopup && <RulesetPopup setRulesetPopup={setRulesetPopup} args={args} setArgs={setArgs}/>}
    </div>
    <div className='absolute bottom-5'>
        {selectedBlock.length > 0 && <Palette selectedBlock={selectedBlock} setSelectedBlock={setSelectedBlock} editorMap={editorMap} setEditorMap={setEditorMap} setPlayer={setPlayer}/> }
    </div>
    </div>
  )
}

export default Editor