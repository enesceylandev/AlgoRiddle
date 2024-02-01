import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuttleSpace } from '@fortawesome/free-solid-svg-icons';

type Props = {
    list: string[];
};
const Play: React.FC<Props> = ({list}) => {
    const gridSize = 18; // VisibleGrid (GridSize+2) ex. gridSize = 18 => 15x15 visible grid
    const opacityStep = 0.02;
    const [valid, setValid] = useState<boolean>(false);

    const [player, setPlayer] = useState<{ cords: number[], direction: string | undefined }>({
        cords: [4, 5],
        direction: 'up'
    });
    useEffect(()=> {
        // list.map((item)=> {
        //     switch (item) {
        //         case "left":
        //             setPlayer((prevPlayer) => {
        //                 switch (prevPlayer.direction) {
        //                     case 'right':
        //                         return { ...prevPlayer, direction: 'up' };
        //                     case 'left':
        //                         return { ...prevPlayer, direction: 'down' };
        //                     case 'up':
        //                         return { ...prevPlayer, direction: 'left' };
        //                     case 'down':
        //                         return { ...prevPlayer, direction: 'right' };
        //                     default:
        //                         return prevPlayer;
        //                 }
        //             });
        //             break;
        //         case "right":
        //             setPlayer((prevPlayer) => {
        //                 switch (prevPlayer.direction) {
        //                     case 'right':
        //                         return { ...prevPlayer, direction: 'down' };
        //                     case 'left':
        //                         return { ...prevPlayer, direction: 'up' };
        //                     case 'up':
        //                         return { ...prevPlayer, direction: 'right' };
        //                     case 'down':
        //                         return { ...prevPlayer, direction: 'left' };
        //                     default:
        //                         return prevPlayer;
        //                 }
        //              });
        //             break;
        //         case "forward":
        //             setPlayer((prevPlayer) => {
        //                 switch (prevPlayer.direction) {
        //                     case 'right':
        //                         return { ...prevPlayer, cords: [prevPlayer.cords[0] + 1, prevPlayer.cords[1]] };
        //                     case 'left':
        //                         return { ...prevPlayer, cords: [prevPlayer.cords[0] - 1, prevPlayer.cords[1]] };
        //                     case 'up':
        //                         return { ...prevPlayer, cords: [prevPlayer.cords[0], prevPlayer.cords[1] - 1] };
        //                     case 'down':
        //                         return { ...prevPlayer, cords: [prevPlayer.cords[0], prevPlayer.cords[1] + 1] };
        //                     default:
        //                         return prevPlayer;
        //                 }
        //             });
        //             break;
        //         default:
        //             return null;
        //     }
        // })

        // list.map((item)=> {
        //     console.log(list)
        // })

        
    switch (list[list.length-1]){
        case "left":
            setPlayer((prevPlayer) => {
                switch (prevPlayer.direction) {
                    case 'right':
                        return { ...prevPlayer, direction: 'up' };
                    case 'left':
                        return { ...prevPlayer, direction: 'down' };
                    case 'up':
                        return { ...prevPlayer, direction: 'left' };
                    case 'down':
                        return { ...prevPlayer, direction: 'right' };
                    default:
                        return prevPlayer;
                }
            });
            break;
        case "right":
            setPlayer((prevPlayer) => {
                switch (prevPlayer.direction) {
                    case 'right':
                        return { ...prevPlayer, direction: 'down' };
                    case 'left':
                        return { ...prevPlayer, direction: 'up' };
                    case 'up':
                        return { ...prevPlayer, direction: 'right' };
                    case 'down':
                        return { ...prevPlayer, direction: 'left' };
                    default:
                        return prevPlayer;
                }
             });
            break;
        case "forward":
            setPlayer((prevPlayer) => {
                switch (prevPlayer.direction) {
                    case 'right':
                        return { ...prevPlayer, cords: [prevPlayer.cords[0] + 1, prevPlayer.cords[1]] };
                    case 'left':
                        return { ...prevPlayer, cords: [prevPlayer.cords[0] - 1, prevPlayer.cords[1]] };
                    case 'up':
                        return { ...prevPlayer, cords: [prevPlayer.cords[0], prevPlayer.cords[1] - 1] };
                    case 'down':
                        return { ...prevPlayer, cords: [prevPlayer.cords[0], prevPlayer.cords[1] + 1] };
                    default:
                        return prevPlayer;
                }
            });
            break;
        default: break;
    }
        
    if(list.length === 0) {
        let x:number = playGround.filter((select) => select.spawn === true)[0].cords[0]
        let y:number = playGround.filter((select) => select.spawn === true)[0].cords[1]
        let direction:string | undefined = playGround.filter((select) => select.spawn === true)[0].direction
        setPlayer({cords: [x, y], direction: direction});
    }
        
    }, [list])

    const playGround: { cords: number[]; color: string, spawn?: true, direction?: string }[] = [
        {
            cords: [8, 6],
            color: 'red'
        },
        {
            cords: [5, 5],
            color: 'gray'
        },
        {
            cords: [4, 5],
            color: 'blue',
            spawn: true,
            direction: 'up'
        }
        ,
        {
            cords: [7, 5],
            color: 'gray'
        }
        ,
        {
            cords: [6, 5],
            color: 'gray'
        }
        ,
        {
            cords: [7, 6],
            color: 'gray'
        }
    ];
    
    function isValid(x:number,y:number) {
        return (playGround.some((select) => select.cords[0] === x && select.cords[1] === y))
    }

    const renderGrid = () => {
        const grid = [];

        const cellSize = 35;
        const margin = 3;

        for (let y = 0; y < gridSize; y++) {
            const row = [];

            for (let x = 0; x < gridSize; x++) {
                const distanceToEdgeX = Math.min(x, gridSize - 1 - x);
                const distanceToEdgeY = Math.min(y, gridSize - 1 - y);
                const distanceToEdge = Math.min(distanceToEdgeX, distanceToEdgeY);
                const opacity = distanceToEdge * opacityStep;

                const style = {
                    border: `1px solid rgba(2, 131, 199, ${opacity})`,
                    borderRadius: '5px',
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: playGround.some((item) => item.cords[0] === x && item.cords[1] === y)
                        ? playGround.find((item) => item.cords[0] === x && item.cords[1] === y)?.color
                        : undefined,
                    margin: `${margin}px`
                };

                const arrowIcon = () => {
                    if (player.cords[0] === x && player.cords[1] === y) {
                        switch (player.direction) {
                            case 'right':
                                return <FontAwesomeIcon icon={faShuttleSpace} className='rotate-0' />;
                            case 'left':
                                return <FontAwesomeIcon icon={faShuttleSpace} className='rotate-180'/>;
                            case 'up':
                                return <FontAwesomeIcon icon={faShuttleSpace} className='-rotate-90'/>;
                            case 'down':
                                return <FontAwesomeIcon icon={faShuttleSpace} className='rotate-90'/>;
                            default:
                                return null;
                        }
                    }
                    return null;
                };

                row.push(
                    <div key={`${x},${y}`} className='flex items-center justify-center text-slate-100 dark:text-slate-100' style={style} onClick={() => setValid(isValid(x,y))}>
                        {arrowIcon()}
                    </div>
                );
            }

            grid.push(<div key={y} style={{ display: 'flex' }}>{row}</div>);
        }

        return grid;
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen text-slate-700 dark:text-slate-300 z-20'>
            {valid ? <div>Valid</div> : <div>Not Valid</div>}
            <div className="grid-container">{renderGrid()}</div>
        </div>
    );
};

export default Play;
