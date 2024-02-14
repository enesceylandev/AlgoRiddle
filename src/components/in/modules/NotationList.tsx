import {
  faEllipsisVertical,
  faGaugeHigh,
  faPlay,
  faReply,
  faRightFromBracket,
  faRotateRight,
  faShare,
  faStop,
  faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import HandleLastActions from "./functions/HandleLastActions";
import { playground, Map } from "../maps";

type Props = {
  notation: string[][];
  list: string[];
  iterationRef: React.MutableRefObject<number>;
  player: { cords: number[]; direction: string | undefined };
  requiredRef: {
    cord: number[];
    color: string;
    required?: boolean;
  }[];
  setList: React.Dispatch<React.SetStateAction<string[]>>;
  setPlayer: React.Dispatch<
    React.SetStateAction<{ cords: number[]; direction: string | undefined }>
  >;
  setRequiredRef: React.Dispatch<React.SetStateAction<Props["requiredRef"]>>;
  setMapSelectorPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  preview?: boolean;
  setPreview?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMap: Map;
  dailyMap?: Map[];
  setSelectedMap?: React.Dispatch<React.SetStateAction<Map>>;
};

const whichIcon = (direction: string) => {
  switch (direction) {
    case "left":
      return faReply;
    case "right":
      return faShare;
    case "forward":
      return faUpLong;
    default:
      return faReply;
  }
};

const NotationList: React.FC<Props> = ({
  notation,
  list,
  setList,
  iterationRef,
  player,
  setPlayer,
  setRequiredRef,
  selectedMap,
  setSelectedMap,
  dailyMap,
  setMapSelectorPopup,
  preview,
  setPreview,
}) => {
  const [gameSpeed, setGameSpeed] = useState<number>(200);
  const [isGameStart, setIsGameStart] = useState<boolean>(false);
  useEffect(() => {
    HandleLastActions({
      list,
      player,
      setPlayer,
      selectedMap,
      movePlayer,
      turnPlayer,
    });
  }, [list]); // eslint-disable-line

  const ReadNotation = (layer: number, playerClone: any, notationClone: any) => {
    const delayBetweenSteps = gameSpeed;
    const notationRef = cloneDeep(notationClone);
    const notationArray = notationRef[layer];
    // console.log(notationRef)
    // console.log(notationArray)
    let playerRef = cloneDeep(playerClone);
    let index = 0;
    const processItem = (
      index: number,
      notationArray: string[],
      currentIteration: number,
    ) => {
      if (
        notationArray &&
        index < notationArray.length &&
        currentIteration === iterationRef.current
      ) {
        const item = notationArray[index];
        if (item) {
          if (item.includes("forward")) {
            playerRef.cords = calcCords(item, playerRef);
          }
          playerRef.direction = calcTurn(playerRef.direction, playerRef.cords, item);
          setList((prevList) => [...prevList, item]);
          // console.log(playerRef.cords, playerRef.direction);
          if (
            item.includes("f") &&
            !item.includes("forward") &&
            !item.includes("left") &&
            checkBlock(playerRef, item)
          ) {
            // console.log(item)
            // let test = notation[Number(item.split("f")[1])].slice(index + 1);
            // notationRef[item.split("f")[1]].push(...test);
            // console.log(notationRef)
            if(notationRef[layer].some((selectedItem:string) => selectedItem === "f0" || selectedItem === "f1" || selectedItem === "f2")){;
              notationRef[item.split("f")[1]].push(...notation[layer].slice(index + 1));
              // console.log(item)
            }
            iterationRef.current += 1;
            
            // Bunu yapmak fonksiyonu iptal ederken sıkıntı çıkartıyor bir sonraki update de bakılacak
            setTimeout(() => {
              ReadNotation(
                parseInt(item.split("f")[1]),
                playerRef,
                notationRef,
              );
            }, delayBetweenSteps);
          }
        }
        index++;
        setTimeout(() => {
          processItem(index, notationArray, currentIteration);
          // Scroll to bottom after each step
          const element = document.querySelector(".scroll-smooth");
          element?.scrollTo({
            top: element.scrollHeight,
            behavior: "smooth",
          });
        }, delayBetweenSteps);
      }
    };
    processItem(index, notationArray, iterationRef.current);
  };

  const checkBlock = (playerRef: any, color: string) => {
    if (color.includes("-")) {
      const splitColor = color.split("-")[0];
      const matchingColorLocation = selectedMap.board.find(
        (select) =>
          select.cord[0] === playerRef.cords[0] &&
          select.cord[1] === playerRef.cords[1] &&
          select.color === splitColor,
      );
      return !!matchingColorLocation;
    } else {
      return true;
    }
  };

  const changeProcess = (status: string) => {
    iterationRef.current += 1;
    // console.log(player.cords)
    if (status === "start") {
      setIsGameStart(true);
      setTimeout(() => {
        ReadNotation(0, player, notation);
      }, 100);
    }
    if (status === "reset") {
      setIsGameStart(false);
    }
    if (status !== "stop") {
      setRequiredRef(
        selectedMap.board.filter((item) => item.required === true),
      );
      setList([]);
    }
  };
  const isValid = (x: number, y: number) => {
    return selectedMap.board.some(
      (select) => select.cord[0] === x && select.cord[1] === y,
    );
  };

  const calcCords = (item: string, playerRef: any) => {
    const cords = playerRef.cords;
    const direction = calcTurn(playerRef.direction, cords, item);
    const move = 1;
    let check = selectedMap.board.filter((item) => (item.cord[0] === cords[0] && item.cord[1] === cords[1]))[0] !== undefined && selectedMap.board.filter((item) => (item.cord[0] === cords[0] && item.cord[1] === cords[1]))[0].color
    // console.log(item.includes("-") && item.split("-")[0] !== "forward" && item.split("-")[0] === check)
    if(item.includes("-")){
      if(item.split("-")[0] === check){
        switch (direction) {
          case "right":
            return [cords[0] + move, cords[1]];
            case "left":
              return [cords[0] - move, cords[1]];
              case "up":
                return [cords[0], cords[1] - move];
                case "down":
                  return [cords[0], cords[1] + move];
                  default:
                    return cords;
        }
      }else{
        return cords
      }
    }else{
      switch (direction) {
        case "right":
          return [cords[0] + move, cords[1]];
          case "left":
            return [cords[0] - move, cords[1]];
            case "up":
              return [cords[0], cords[1] - move];
              case "down":
                return [cords[0], cords[1] + move];
                default:
                  return cords;
      }
    }
  };

  const movePlayer = (x: number, y: number) => {
    !isValid(player.cords[0] + x, player.cords[1] + y) &&
      (iterationRef.current += 1);
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      cords: [prevPlayer.cords[0] + x, prevPlayer.cords[1] + y],
    }));
  };

  const calcTurn = (direction: string | undefined, cords: number[], turn: string) => {
    let check = selectedMap.board.filter((item) => (item.cord[0] === cords[0] && item.cord[1] === cords[1]))[0] !== undefined && selectedMap.board.filter((item) => (item.cord[0] === cords[0] && item.cord[1] === cords[1]))[0].color

    // If 'turn' includes '-', split and check the condition
    if(turn.includes("-")){
        const splittedTurn = turn.split("-");
        // Check if the first part of 'turn' matches the color check
        if(splittedTurn[0] === check){
            turn = splittedTurn[1]; // Get the second part as the actual turn
        }
    }

    // Switch statement to determine the new direction based on the turn
    switch (direction) {
        case "right":
            return turn === "left" ? "up" : turn === "right" ? "down" : direction;
        case "left":
            return turn === "left" ? "down" : turn === "right" ? "up" : direction;
        case "up":
            return turn === "left" ? "left" : turn === "right" ? "right" : direction;
        case "down":
            return turn === "left" ? "right" : turn === "right" ? "left" : direction;
        default:
            return direction;
      }
};
  const turnPlayer = (direction: string) => {
    let mixedDirection = direction.includes("-")
      ? direction.split("-")[1]
      : direction;
    switch (mixedDirection) {
      case "left":
        setPlayer((prevPlayer) => {
          switch (prevPlayer.direction) {
            case "right":
              return { ...prevPlayer, direction: "up" };
            case "left":
              return { ...prevPlayer, direction: "down" };
            case "up":
              return { ...prevPlayer, direction: "left" };
            case "down":
              return { ...prevPlayer, direction: "right" };
            default:
              return prevPlayer;
          }
        });
        break;
      case "right":
        setPlayer((prevPlayer) => {
          switch (prevPlayer.direction) {
            case "right":
              return { ...prevPlayer, direction: "down" };
            case "left":
              return { ...prevPlayer, direction: "up" };
            case "up":
              return { ...prevPlayer, direction: "right" };
            case "down":
              return { ...prevPlayer, direction: "left" };
            default:
              return prevPlayer;
          }
        });
        break;
      default:
        break;
    }
  };
  return (
    <div className="z-20">
      {!dailyMap?.includes(selectedMap) && !preview && (
        <div className="border-x border-t rounded-t-md dark:border-slate-800 text-slate-800 dark:text-slate-400 p-2 flex items-center justify-between rounded-b-md">
          Now playing custom map
          <button
            className="dark:border-slate-800 text-slate-800 dark:text-slate-400 hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800
                        border rounded-md text-sm h-[36px] px-5 flex items-center justify-center"
            onClick={() => setSelectedMap && setSelectedMap(playground[0])}
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="text-lg text-red-500 hover:text-red-600"
            />
          </button>
        </div>
      )}
      <div className="border-x border-t rounded-t-md dark:border-slate-800 p-2 justify-between flex">
        {!preview ? (
          <button
            className="dark:border-slate-800 text-slate-800 dark:text-slate-400 hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800
                        border rounded-md text-sm h-[36px] p-2"
            onClick={() => setMapSelectorPopup && setMapSelectorPopup(true)}
          >
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="text-lg pr-3 text-green-500 hover:text-green-600"
            />
            Map Selector
          </button>
        ) : (
          <button
            className="dark:border-slate-800 text-slate-800 dark:text-slate-400 hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800
                        border rounded-md text-sm h-[36px] p-2"
            onClick={() => setPreview && setPreview(false)}
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="text-lg pr-3 text-red-500 hover:text-red-600"
            />
            Back to Editor
          </button>
        )}
        <FontAwesomeIcon
          icon={faGaugeHigh}
          flip={gameSpeed === 200 ? "horizontal" : undefined}
          onClick={() => setGameSpeed(gameSpeed === 200 ? 100 : 200)}
          className="border dark:border-slate-800 rounded-md w-10 p-2 text-lg hover:cursor-pointer
                hover:bg-gray-50 dark:hover:bg-slate-800 text-purple-500 hover:text-purple-600"
        />
      </div>
      <div className="border-x dark:border-slate-800 p-2 text-slate-300 h-60 overflow-auto scroll-smooth">
        <ul className="grid grid-cols-4 items-center gap-1 w-[18rem]">
          {/* Showing steps */}
          {list.map((item, index) => (
            <li
              key={index}
              className="dark:bg-[#162137] bg-slate-100 hover:bg-slate-200 dark:hover:bg-[#243047] text-slate-800 dark:text-slate-300
                         hover:cursor-pointer text-sm flex justify-between p-1 h-8"
            >
              <p className="pl-0.5 text-left text-slate-700 dark:text-slate-500">
                {index + 1}.
              </p>
              <div className="flex justify-end items-center pl-1">
                {item === "left" || item === "right" || item === "forward" ? (
                  <FontAwesomeIcon icon={whichIcon(item)} className="p-2.5" />
                ) : !!item.split("-")[1] &&
                  !(item.split("-")[1] === "f0" || item.split("-")[1] === "f1" || item.split("-")[1] === "f2") ? (
                  <div className="p-0.5 w-7 h-7">
                    <div
                      className={`bg-${item.split("-")[0]}-500 w-full h-full rounded-md flex items-center justify-center`}
                    > 
                      <FontAwesomeIcon icon={whichIcon(item.split("-")[1])} />
                    </div>
                  </div>
                ) : (
                  <div className="p-0.5 w-7 h-7">
                    <div
                      className={`bg-${item.split("-")[0]}-500 w-full h-full rounded-md flex items-center justify-center`}
                    >
                      {item === "f0" ||  item === "f1" || item === "f2" ? item : null}
                      {/* {item} */}
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-x border-b dark:border-slate-800 p-2 justify-between flex rounded-b-md">
        <FontAwesomeIcon
          icon={faPlay}
          onClick={() => !isGameStart && changeProcess("start")}
          className={`border dark:border-slate-800 rounded-md w-10 p-2 text-lg ${isGameStart ? "text-green-800 cursor-not-allowed" : "hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 text-green-500 hover:text-green-600"} `}
        />
        <FontAwesomeIcon
          icon={faRotateRight}
          onClick={() => changeProcess("reset")}
          className="border dark:border-slate-800 rounded-md w-10 p-2 text-lg hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 text-blue-500 hover:text-blue-600"
        />
        <FontAwesomeIcon
          icon={faStop}
          onClick={() => changeProcess("stop")}
          className="border dark:border-slate-800 rounded-md w-10 p-2 text-lg hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 text-red-500 hover:text-red-600"
        />
      </div>
    </div>
  );
};

export default NotationList;
