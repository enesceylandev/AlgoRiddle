import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExpand,
  faShuttleSpace,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import CryptoJS from "crypto-js";
import { Map } from "./maps";
type Props = {
  player: { cords: number[]; direction: string | undefined };
  requiredRef: {
    cord: number[];
    color: string;
    required?: boolean;
  }[];
  setRequiredRef: React.Dispatch<React.SetStateAction<Props["requiredRef"]>>;
  selectedMap: Map;
  preview?: boolean;
  selectedBlock?: number[][];
  setSelectedBlock?: React.Dispatch<React.SetStateAction<number[][]>>;
  notation: string[][];
  dailyMap?: Map[];
  iterationRef?: React.MutableRefObject<number>;
  setMapSelectorPopup?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Play: React.FC<Props> = ({
  player,
  requiredRef,
  setRequiredRef,
  selectedMap,
  setMapSelectorPopup,
  selectedBlock,
  setSelectedBlock,
  preview,
  notation,
  dailyMap,
  iterationRef,
}) => {
  const gridSize = 18; // VisibleGrid (GridSize+2) ex. gridSize = 18 => 16x16 visible grid
  const opacityStep = 0.04;

  useEffect(() => {
    if (requiredRef !== undefined && requiredRef.length > 0) {
      requiredRef.forEach((i) => {
        if (i.cord[0] === player.cords[0] && i.cord[1] === player.cords[1]) {
          console.log(i)
          console.log("test");
          console.log(requiredRef)
          setRequiredRef(requiredRef.filter(i => i.cord[0] !== player.cords[0] || i.cord[1] !== player.cords[1]));
        }
      });
    } else if (selectedMap.board.some((item) => item.required === true)) {
      if (!preview) {
        if (iterationRef) {
          iterationRef.current += 1;
        }
        setMapSelectorPopup && setMapSelectorPopup(true);
        console.log("you win!");
        if (dailyMap) {
          let solution: string[] = selectedMap.solution;
          const savedSolutions = localStorage.getItem("solutions");
          if (savedSolutions) {
            const parsedSolutions = JSON.parse(savedSolutions);
            if (
              !parsedSolutions.some(
                (item: any) =>
                  JSON.stringify(item) === JSON.stringify(solution),
              )
            ) {
              parsedSolutions.push(solution);
              localStorage.setItem(
                "solutions",
                JSON.stringify(parsedSolutions),
              );
              console.log("solution saved!");
            } else {
              console.log("solution already exists!");
            }
          } else {
            localStorage.setItem("solutions", JSON.stringify([solution]));
            console.log("solution saved!");
          }
        }
      } else {
        const originalText = JSON.stringify(selectedMap);
        const key = "ultraSecretKey";
        const encryptedMessage = CryptoJS.AES.encrypt(
          originalText,
          key,
        ).toString();
        console.log(encryptedMessage);
      }
    }
  }, [player]); // eslint-disable-line

  const generateIcon = (x: number, y: number) => {
    if (player.cords[0] === x && player.cords[1] === y) {
      const iconRotation: { [key: string]: string } = {
        right: "rotate-0",
        left: "rotate-180",
        up: "-rotate-90",
        down: "rotate-90",
      };
      return (
        <FontAwesomeIcon
          icon={faShuttleSpace}
          className={iconRotation[player.direction || ""]}
        />
      );
    } else if (
      requiredRef.some(
        (item) => item.cord[0] === x && item.cord[1] === y && item.required,
      )
    ) {
      return <FontAwesomeIcon icon={faStar} className="text-white z-40" />;
    }
    return null;
  };

  const getBackgroundColor = (x: number, y: number) => {
    const selectedColor = selectedMap.board.find(
      (item) => item.cord[0] === x && item.cord[1] === y,
    )?.color;
    return selectedColor || "undefined";
  };
  const isBlockSelected = (x: number, y: number) => {
    return (
      !preview &&
      selectedBlock &&
      selectedBlock.some((item) => item[0] === x && item[1] === y)
    );
  };
  const handleBlockClick = (x: number, y: number) => {
    console.log(x, y);
    if (!preview && setSelectedBlock && selectedBlock) {
      if (isBlockSelected(x, y)) {
        setSelectedBlock(
          selectedBlock.filter((item) => item[0] !== x || item[1] !== y),
        );
      } else {
        setSelectedBlock(selectedBlock ? [...selectedBlock, [x, y]] : [[x, y]]);
      }
    }
  };
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
          borderRadius: "5px",
          width: cellSize,
          height: cellSize,
          margin: `${margin}px`,
        };
        row.push(
          <div
            key={`${x},${y}`}
            className={`flex items-center justify-center text-slate-100 dark:text-slate-100 bg-${getBackgroundColor(x, y)}-500`}
            style={style}
            onClick={() => handleBlockClick(x, y)}
          >
            {generateIcon(x, y)}
            {isBlockSelected(x, y) && (
              <FontAwesomeIcon
                icon={faExpand}
                className="flex items-center justify-center"
              />
            )}
          </div>,
        );
      }
      grid.push(
        <div key={y} style={{ display: "flex" }}>
          {row}
        </div>,
      );
    }
    return grid;
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-slate-700 dark:text-slate-300 z-20">
      <div className="grid-container">{renderGrid()}</div>
    </div>
  );
};

export default Play;
