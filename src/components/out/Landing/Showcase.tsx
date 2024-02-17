import { faShuttleSpace, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'

type Map = {
  player: {
    spawn: number[],
    direction: string
  },
  board: {
    cord: number[],
    color: string,
    required?: boolean,
    direction: string
  }[]
}
const Showcase: React.FC = () => {
  const gridSize = 16; // VisibleGrid (GridSize+2) ex. gridSize = 18 => 16x16 visible grid
  const opacityStep = 0.04;
  const [showcaseMaps, setShowcaseMaps] = useState<Map[]>([
  {
    player: {
        spawn: [4, 8],
        direction: 'right'
    },
    board: [
        {
          cord: [4, 8],
          color: 'blue',
          direction: 'right'
      },
        {
            cord: [5, 8],
            color: 'blue',
            direction: 'right'
        },
        {
            cord: [6, 8],
            color: 'blue',
            direction: 'right'
        },
        {
            cord: [7, 8],
            color: 'blue',
            direction: 'right'
        },
        {
            cord: [8, 8],
            color: 'blue',
            direction: 'right'
        },
        {
            cord: [9, 8],
            color: 'blue',
            direction: 'right'
        },
        {
            cord: [10, 8],
            color: 'blue',
            direction: 'right'
        },
        {
            cord: [11, 8],
            color: 'purple',
            direction: 'up'
        },
        {
          cord: [12, 8],
          color: 'blue',
          direction: 'up'
      },
      {
          cord: [12, 7],
          color: 'blue',
          direction: 'up',
          required: true
      },

  ]
  },
  {
    player: {
        spawn: [10, 3],
        direction: 'down'
    },
    board: [
        {
            cord: [10, 3],
            color: 'red',
            direction: 'left'
        },
        {
            cord: [10, 4],
            color: 'red',
            direction: 'down'
        },
        {
            cord: [9, 4],
            color: 'red',
            direction: 'left'
        },
        {
            cord: [9, 5],
            color: 'red',
            direction: 'down'
        },
        {
            cord: [8, 5],
            color: 'red',
            direction: 'left'
        },
        {
            cord: [8, 6],
            color: 'red',
            direction: 'down'
        },
        {
            cord: [7, 6],
            color: 'red',
            direction: 'left'
        },
        {
            cord: [7, 7],
            color: 'red',
            direction: 'down'
        },
        {
            cord: [6, 7],
            color: 'red',
            direction: 'left'
        },
        {
            cord: [6, 8],
            color: 'red',
            direction: 'down'
        },
        {
            cord: [5, 8],
            color: 'blue',
            direction: 'right'
        },
        {
            cord: [5, 9],
            color: 'blue',
            direction: 'down'
        },
        {
            cord: [6, 9],
            color: 'red',
            direction: 'right'
        },
        {
            cord: [6, 10],
            color: 'red',
            direction: 'down'
        },
        {
            cord: [7, 10],
            color: 'red',
            direction: 'right'
        },
        {
            cord: [7, 11],
            color: 'red',
            direction: 'down'
        },
        {
            cord: [8, 11],
            color: 'red',
            direction: 'right'
        },
        {
            cord: [8, 12],
            color: 'red',
            direction: 'down'
        },
        {
            cord: [9, 12],
            color: 'red',
            direction: 'right'
        },
        {
            cord: [9, 13],
            color: 'red',
            direction: 'down'
        },
        {
            cord: [10, 13],
            color: 'red',
            direction: 'down'
        },
        {
            cord: [10, 14],
            color: 'red',
            direction: 'down',
            required: true
        }
    ]
  },
  {
    player: {
        spawn: [2, 10],
        direction: 'right'
    },
    board: [
        {
            cord: [2, 10],
            color: 'purple',
            direction: 'right'
        },
        {
            cord: [3, 10],
            color: 'purple',
            direction: 'right'
        },
        {
            cord: [4, 10],
            color: 'purple',
            direction: 'right'
        },
        {
            cord: [5, 10],
            color: 'purple',
            required: true,
            direction: 'right'
        },
        {
            cord: [6, 10],
            color: 'purple',
            direction: 'right'
        },
        {
            cord: [7, 10],
            color: 'purple',
            direction: 'right'
        },
        {
            cord: [8, 10],
            color: 'purple',
            required: true,
            direction: 'right'
        },
        {
            cord: [9, 10],
            color: 'purple',
            direction: 'right'
        },
        {
            cord: [10, 10],
            color: 'blue',
            direction: 'up'
        },
        {
            cord: [11, 10],
            color: 'purple',
            direction: 'right'
        },
        {
            cord: [11, 9],
            color: 'purple',
            direction: 'up'
        },
        {
            cord: [12, 9],
            color: 'purple',
            direction: 'right'
        },
        {
            cord: [12, 8],
            color: 'purple',
            direction: 'up'
        },
        {
            cord: [13, 8],
            color: 'purple',
            direction: 'right'
        },
        {
            cord: [13, 7],
            color: 'purple',
            direction: 'up'
        },
        {
            cord: [14, 7],
            color: 'purple',
            direction: 'right'
        },
        {
            cord: [14, 6],
            color: 'purple',
            direction: 'up'
        },
        {
            cord: [15, 6],
            color: 'purple',
            direction: 'right'
        },
        {
            cord: [15, 5],
            color: 'purple',
            required: true,
            direction: 'down'
        }
    ]
  },
  
]);
  const [selectedMap, setSelectedMap] = useState(showcaseMaps[0]);
  const [player, setPlayer] = useState ({
    cords: selectedMap.player.spawn,
    direction: selectedMap.player.direction
  });
  const [requiredRef, setRequiredRef] = useState(selectedMap.board.filter((item) => item.required === true));
  const animation = () => {
    let playerRef = player;
    let requiredRefRef = requiredRef;
    let showcaseMapsRef = showcaseMaps;
    let selectedMapRef = selectedMap;
    setInterval(() => {
      if (requiredRefRef.length !== 0) {
        let updatedCords;
        let nextCell = selectedMapRef.board.find(item => item.cord[0] === playerRef.cords[0] && item.cord[1] === playerRef.cords[1]);
        let updatedDirection = nextCell ? nextCell.direction : undefined;
        // console.log(nextCell) // this console.log is check for animation, (animation is still playing in the background after not being visible)
        
        switch (playerRef.direction) {
          case 'right':
            updatedCords = [playerRef.cords[0] + 1, playerRef.cords[1]];
            break;
          case 'left':
            updatedCords = [playerRef.cords[0] - 1, playerRef.cords[1]];
            break;
          case 'up':
            updatedCords = [playerRef.cords[0], playerRef.cords[1] - 1];
            break;
          case 'down':
            updatedCords = [playerRef.cords[0], playerRef.cords[1] + 1];
            break;
        }
        
        if (updatedDirection) {
          playerRef = { cords: updatedCords as number[], direction: updatedDirection as string };
          setPlayer({ cords: updatedCords as number[], direction: updatedDirection as string });
        } else {
          playerRef = { cords: updatedCords as number[], direction: playerRef.direction };
          setPlayer({ cords: updatedCords as number[], direction: playerRef.direction });
        }
        
        if (playerRef.cords[0] === requiredRefRef[0].cord[0] && playerRef.cords[1] === requiredRefRef[0].cord[1]) {
          setRequiredRef(requiredRefRef.slice(1));
          requiredRefRef = requiredRefRef.slice(1);
        }
      }else{
        showcaseMapsRef.push(showcaseMapsRef.shift() as Map)
        setShowcaseMaps(showcaseMapsRef)
        setSelectedMap(showcaseMapsRef[0])
        setPlayer({ cords: showcaseMapsRef[0].player.spawn, direction: showcaseMapsRef[0].player.direction })
        setRequiredRef(showcaseMapsRef[0].board.filter((item) => item.required === true))
        requiredRefRef = showcaseMapsRef[0].board.filter((item) => item.required === true)
        selectedMapRef = showcaseMapsRef[0]
        playerRef = { cords: showcaseMapsRef[0].player.spawn, direction: showcaseMapsRef[0].player.direction }
      }
    }, 300);
  };
  
  useEffect(()=> {
    animation();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const generateIcon = (x: number, y: number) => {
    if (player.cords[0] === x && player.cords[1] === y) {
        const iconRotation: { [key: string]: string } = {
            'right': 'rotate-0',
            'left': 'rotate-180',
            'up': '-rotate-90',
            'down': 'rotate-90'
        };
        return <FontAwesomeIcon icon={faShuttleSpace} className={iconRotation[player.direction || '']} 
        style={{fontSize: window.innerWidth <= 768 ? window.innerWidth <= 650 ? 10 : 13 : 16}}/>;
    } else if (requiredRef.some(item => item.cord[0] === x && item.cord[1] === y && item.required)) {
        return <FontAwesomeIcon icon={faStar} className='text-white z-40' 
        style={{fontSize: window.innerWidth <= 768 ? window.innerWidth <= 650 ? 10 : 13 : 16}}/>;
    }
    return null;
};
  const getBackgroundColor = (x:number, y:number) => {
    const selectedColor = selectedMap.board.find(item => item.cord[0] === x && item.cord[1] === y)?.color;
    return selectedColor || 'undefined';
  };
  const renderGrid = () => {
      const grid = [];
      const cellSize = window.innerWidth <= 768 ? window.innerWidth <= 650 ? 18 : 25 : 35;
      const margin = window.innerWidth <= 768 ? 2 : 3;

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
                  margin: `${margin}px`
              };
              row.push(
                  <div 
                      onClick={() => console.log(x, y)}
                      key={`${x},${y}`} 
                      className={`flex items-center justify-center text-slate-100 dark:text-slate-100 bg-${getBackgroundColor(x, y)}-500`} 
                      style={style} >
                      {generateIcon(x, y)}
                  </div>
              );
          }
          grid.push(<div key={y} style={{ display: 'flex' }}>{row}</div>);
      }
      return grid;
  };  

  return (
    <div>
        {renderGrid()}
    </div>
  )
}

export default Showcase