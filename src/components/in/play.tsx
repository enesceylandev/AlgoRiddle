import React, { useState } from 'react';

const Play: React.FC = () => {
    const gridSize = 11; // VisibleGrid (GridSize+2) ex. gridSize = 18 => 15x15 visible grid
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

        const cellSize = 50;
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
                const opacity = distanceToEdge * opacityStep; // Opaklık hesaplama

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
// selected.map((select)=> select.cords[0])
                row.push(
                    <div key={`${x},${y}`} style={style} onClick={() => setValid(isValid(x,y))}>
                        {/* {`${x},${y}`} */}
                    </div>
                );
            }

            grid.push(<div key={y} style={{ display: 'flex' }}>{row}</div>);
        }

        return grid;
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen text-white'>
            {valid ? <div>Valid</div> : <div>Not Valid</div>}
            <div className="grid-container p-10">{renderGrid()}</div>
        </div>
    );
};

export default Play;
