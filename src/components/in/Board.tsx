import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuttleSpace } from '@fortawesome/free-solid-svg-icons';
import { playground } from './maps';

type Props = {
    list: string[];
    iterationRef: React.MutableRefObject<number>;
    player: { cords: number[], direction: string | undefined };
    setPlayer: React.Dispatch<React.SetStateAction<{ cords: number[]; direction: string | undefined; }>>;
};
const Play: React.FC<Props> = ({list, iterationRef, player, setPlayer}) => {
    const gridSize = 18; // VisibleGrid (GridSize+2) ex. gridSize = 18 => 15x15 visible grid
    const opacityStep = 0.02;

    
    useEffect(() => {
        const lastAction = list[list.length - 1];
        const turnOrMovePlayer = (direction: string | undefined, x: number, y: number) => {
            if (direction !== undefined) {
                if ((!!lastAction.split("-") && lastAction.split("-")[1] === "forward") || lastAction === "forward") {
                    movePlayer(x, y);
                } else {
                    turnPlayer(lastAction);
                }
            }
        };

        switch (lastAction) {
            case "left":
                turnOrMovePlayer("left", 0, 0);
                break;
            case "right":
                turnOrMovePlayer("right", 0, 0);
                break;
            case "forward":
                switch (player.direction) {
                    case 'right':
                        turnOrMovePlayer("right", 1, 0);
                        break;
                    case 'left':
                        turnOrMovePlayer("left", -1, 0);
                        break;
                    case 'up':
                        turnOrMovePlayer("up", 0, -1);
                        break;
                    case 'down':
                        turnOrMovePlayer("down", 0, 1);
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    
        if (list.length === 0) {
            const [cords, direction] = [playground[0].player.spawn, playground[0].player.direction]
            setPlayer({ cords, direction });

        } else if (lastAction.includes("-")) {
            const color = lastAction.split("-")[0];
            const matchingColorLocation = playground[0].board.find(select =>
                select.cord[0] === player.cords[0] && select.cord[1] === player.cords[1] && select.color === color);

            if (!!matchingColorLocation) {
                const action = lastAction.split("-")[1];
                turnOrMovePlayer(player.direction, action === "forward" ? 1 : 0, action === "forward" ? 0 : 1);
            }
        } // eslint-disable-next-line
    }, [list]); 

    const movePlayer = (x:number,y:number) => {
        !isValid(player.cords[0] + x, player.cords[1] + y) && (iterationRef.current += 1);
        setPlayer((prevPlayer) => ({ ...prevPlayer, cords: [prevPlayer.cords[0] + x, prevPlayer.cords[1] + y] }));
    } 
    const turnPlayer = (direction: string) => {
        let mixedDirection = direction.includes("-") ? direction.split("-")[1] : direction; 
        switch (mixedDirection) {
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
            default: break;
        }
    }

    function isValid(x:number,y:number) {
        return (playground[0].board.some((select) => select.cord[0] === x && select.cord[1] === y))
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
                    // border: `1px solid rgba(${isValid(player.cords[0], player.cords[1]) ? `2, 131, 199, ${opacity}`:`245, 0, 0, ${opacity+0.02}`})`,
                    border: `1px solid rgba(2, 131, 199, ${opacity})`,
                    borderRadius: '5px',
                    width: cellSize,
                    height: cellSize,
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
                    <div key={`${x},${y}`} className={`flex items-center justify-center text-slate-100 dark:text-slate-100 
                    bg-${playground[0].board.some((item)=> item.cord[0] === x && item.cord[1] === y) ? 
                    playground[0].board.find((item) => item.cord[0] === x && item.cord[1] === y)?.color : undefined}-500 `} style={style}>
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
            <div className="grid-container">{renderGrid()}</div>
        </div>
    );
};

export default Play;