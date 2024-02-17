import React, { useRef, useState, useEffect } from "react";
import Board from "./Board";
import Commands from "./modules/Commands";
import NotationList from "./modules/NotationList";
import Functions from "./modules/Functions";
import { playground, Map } from "./maps";
import MapSelectorPopup from "./popups/MapSelectorPopup";
import TutorialPopup from "./popups/TutorialPopup";

type requiredRef = {
  cord: number[];
  color: string;
  required?: boolean;
}[];
const Play: React.FC = () => {
  const iterationRef = useRef<number>(0);
  const [selected, setSelected] = useState<number[] | null>(null);
  const [mapSelectorPopup, setMapSelectorPopup] = useState<boolean>(false);
  const storedValue = localStorage.getItem("isPlayerNew"); // localStorage'dan değeri bir değişkene atayın
  const [tutorialPopup, setTutorialPopup] = useState<boolean>(
    storedValue ? storedValue === "true" : true,
  ); // Değişkene atanmış değeri kullanarak useState'i çağırın
  const [notation, setNotation] = useState<string[][]>([]);
  const [list, setList] = useState<string[]>([]);
  const [dailyMap] = useState<Map[]>([
    playground[0],
    playground[1],
    playground[2],
    playground[3],
  ]);
  const [selectedMap, setSelectedMap] = useState<Map>(dailyMap[0]);
  const [requiredRef, setRequiredRef] = React.useState<requiredRef>(
    selectedMap.board.filter((item) => item.required === true),
  );

  const [player, setPlayer] = useState<{
    cords: number[];
    direction: string | undefined;
  }>({
    cords: [selectedMap.player.spawn[0], selectedMap.player.spawn[1]],
    direction: selectedMap.player.direction,
  });
  useEffect(() => {
    setPlayer({
      cords: [selectedMap.player.spawn[0], selectedMap.player.spawn[1]],
      direction: selectedMap.player.direction,
    });
    setRequiredRef(selectedMap.board.filter((item) => item.required === true));
    setMapSelectorPopup(false);
    setNotation([]);
    setSelected(null);
    setList([]);
  }, [selectedMap]);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center">
        <img
          src="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif"
          alt=""
          className="dark:blur-xl opacity-50 absolute top-0 left-0 overflow-hidden select-none -z-0"
        />
        <div className="flex flex-col space-y-12 items-center sm:items-start z-20 order-2 sm:order-1">
          <Functions {...{ selectedMap, selected, setSelected, notation }} />
          <Commands {...{ selectedMap, selected, notation, setNotation }} />
        </div>
        <div className="order-1 sm:order-2 mt-24 sm:mt-0">
          <Board
            {...{
              player,
              requiredRef,
              setRequiredRef,
              selectedMap,
              setMapSelectorPopup,
              dailyMap,
              iterationRef,
            }}
          />
        </div>
        <div className="order-3 flex my-12">
          <NotationList
            {...{
              notation,
              list,
              setList,
              iterationRef,
              player,
              setPlayer,
              requiredRef,
              setRequiredRef,
              selectedMap,
              setSelectedMap,
              dailyMap,
              setMapSelectorPopup,
            }}
            />
        </div>
      </div>
      {tutorialPopup && <TutorialPopup {...{ setTutorialPopup }} />}
      {mapSelectorPopup && (
        <MapSelectorPopup
          {...{ setMapSelectorPopup, selectedMap,setSelectedMap, dailyMap }}
        />
      )}
    </>
  );
};

export default Play;
