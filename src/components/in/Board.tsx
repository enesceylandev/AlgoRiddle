import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuttleSpace, faStar } from '@fortawesome/free-solid-svg-icons';
import { playground } from './maps';

type Props = {
    player: { cords: number[], direction: string | undefined };
    requiredRef: {
        cord: number[];
        color: string;
        required?: boolean;
    }[];
    setRequiredRef: React.Dispatch<React.SetStateAction<Props['requiredRef']>>;
};

const Play: React.FC<Props> = ({ player, requiredRef, setRequiredRef}) => {
    const gridSize = 18; // VisibleGrid (GridSize+2) ex. gridSize = 18 => 16x16 visible grid
    const opacityStep = 0.02;
    
    useEffect(()=> {
        if(requiredRef !== undefined && requiredRef.length > 0){
            if (player.cords[0] === requiredRef[0].cord[0] && player.cords[1] === requiredRef[0].cord[1]) {
                setRequiredRef(requiredRef.slice(1));
            }
        }else{
            console.log("You Win!");
        }
    }, [player, requiredRef])

    const generateIcon = (x:number, y:number) => {
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
        else if(requiredRef.some((item)=> item.cord[0] === x && item.cord[1] === y)){
            return <FontAwesomeIcon icon={faStar} className='text-white' />;
        }
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


                row.push(
                    <div key={`${x},${y}`} className={`flex items-center justify-center text-slate-100 dark:text-slate-100
                    bg-${playground[0].board.some((item)=> item.cord[0] === x && item.cord[1] === y) ? 
                    playground[0].board.find((item) => item.cord[0] === x && item.cord[1] === y)?.color : undefined}-500 `} style={style} 
                    onClick={() => console.log(x + "," + y)}>
                        {generateIcon(x,y)}
                        {/* {x},{y} */}
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