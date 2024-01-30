import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuttleSpace } from '@fortawesome/free-solid-svg-icons';

const Play: React.FC = () => {
    const gridSize = 18; // VisibleGrid (GridSize+2) ex. gridSize = 18 => 15x15 visible grid
    const opacityStep = 0.02;
    const [valid, setValid] = useState<boolean>(false);

    const renderGrid = () => {
        const grid = [];
        const selected: { cords: number[]; color: string }[] = [
            {
                cords: [5, 5],
                color: 'red'
            },
            {
                cords: [4, 5],
                color: 'blue'
            }
        ];
        const player: { cords: number[], direction: string} = {
            cords: [4, 5],
            direction: 'up'
        }

        const cellSize = 35;
        const margin = 3;

        function isValid(x:number,y:number) {
            return (selected.some((select) => select.cords[0] === x && select.cords[1] === y))
        }

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
                    backgroundColor: selected.some((item) => item.cords[0] === x && item.cords[1] === y)
                        ? selected.find((item) => item.cords[0] === x && item.cords[1] === y)?.color
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
                    <div key={`${x},${y}`} className='flex items-center justify-center' style={style} onClick={() => setValid(isValid(x,y))}>
                        {arrowIcon()}
                    </div>
                );
            }

            grid.push(<div key={y} style={{ display: 'flex' }}>{row}</div>);
        }

        return grid;
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen text-slate-700 dark:text-slate-300'>
            {valid ? <div>Valid</div> : <div>Not Valid</div>}
            <div className="grid-container">{renderGrid()}</div>
        </div>
    );
};

export default Play;
