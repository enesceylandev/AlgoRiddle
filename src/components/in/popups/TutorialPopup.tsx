import {
  IconDefinition,
  faChevronRight,
  faPlay,
  faReply,
  faShare,
  faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

type Props = {
  setTutorialPopup: React.Dispatch<React.SetStateAction<boolean>>;
};
type ControlButtonProps = {
  text?: string;
  active: boolean;
  animating?: boolean;
  icon?: IconDefinition;
};
const MapSelectorPopup: React.FC<Props> = ({ setTutorialPopup }) => {
  const skipTutorial = () => {
    localStorage.setItem("isPlayerNew", "false");
    setTutorialPopup(false);
  };
  const [bgClass, setBgClass] = useState("bg-slate-200 dark:bg-slate-800");

  useEffect(() => {
    const interval = setInterval(() => {
      setBgClass((prevClass) =>
        prevClass === "bg-slate-200 dark:bg-slate-800"
          ? ""
          : "bg-slate-200 dark:bg-slate-800",
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const ControlButton: React.FC<ControlButtonProps> = ({
    text,
    active,
    animating,
    icon,
  }) => (
    <div
      className={`dark:border-slate-900 flex items-center justify-center p-2 h-[40px] 'text-slate-900 dark:text-slate-300 border
      ${
        icon
          ? icon === faReply
            ? "rounded-tl-md"
            : icon === faShare && "rounded-tr-md"
          : text === "f0"
            ? "rounded-bl-md"
            : text === "f2" && "rounded-br-md"
      }
       ${animating && animating ? bgClass : null}`}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {text && <h1>{text}</h1>}
    </div>
  );

  const showcase = (type: string) => {
    switch (type) {
      case "functions":
        return (
          <div className="grid grid-cols-3">
            <h2
              className="p-1 sm:px-2 px-1 font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300
        border-slate-300 dark:border-slate-900 border-x border-y rounded-l-md"
            >
              F0
            </h2>
            <div
              className={`dark:border-slate-900 ${bgClass} border-r border-y flex items-center justify-center text-sm`}
            />
            <div className="dark:border-slate-900 border-r border-y flex items-center justify-center text-sm rounded-r-md" />
          </div>
        );
      case "commands":
        return (
          <div className="grid grid-cols-3 p-4">
            <ControlButton active={true} icon={faReply} />
            <ControlButton active={true} animating={true} icon={faUpLong} />
            <ControlButton active={true} icon={faShare} />
            <ControlButton active={true} text="f0" />
            <ControlButton active={true} text="f1" />
            <ControlButton active={true} text="f2" />
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setTutorialPopup(false)}
    >
      <div
        className="relative bg-[#F7F7FC] dark:bg-[#212529] p-4 rounded-xl shadow-md mx-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 text-slate-900 dark:text-[#dee2e6] text-center">
          <h1 className="text-xl font-semibold">Welcome to the tutorial</h1>
        </div>
        <div className="flex justify-around text-slate-700 dark:text-slate-300 items-center space-x-2">
          {showcase("functions")}
          <FontAwesomeIcon icon={faChevronRight} />
          {showcase("commands")}
          <FontAwesomeIcon icon={faChevronRight} />
          <FontAwesomeIcon
            icon={faPlay}
            className={`border dark:border-slate-900 rounded-md w-10 p-2 text-lg text-green-600 cursor-not-allowed ${bgClass}`}
          />
        </div>
        <ul className="text-slate-900 dark:text-slate-300 mb-5 list-decimal list-inside">
          <li>First, select a slot from the functions module.</li>
          <li>
            Then, specify the action you want to apply in the selected slot from
            the commands module.
          </li>
          <li>
            Finally, when you feel ready, press the start button to play the
            solution you prepared.
          </li>
        </ul>
        <button
          onClick={() => skipTutorial()}
          className="w-full flex items-center justify-center h-10 bg-sky-600 hover:bg-sky-500 text-white rounded-md transition-all shadow-md dark:shadow-none"
        >
          <span>Ok, got it!</span>
        </button>
      </div>
    </div>
  );
};

export default MapSelectorPopup;
