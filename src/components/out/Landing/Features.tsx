import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightDots,
  faPersonSnowboarding,
  faPuzzlePiece,
  faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { faOsi } from "@fortawesome/free-brands-svg-icons";

type featureList = {
  logo: any;
  title: string;
  description: string;
};
const features: React.FC = () => {
  const list: featureList[] = [
    {
      logo: faPuzzlePiece,
      title: "Daily Puzzles",
      description: "Solve a new puzzle every day and learn new algorithms.",
    },
    {
      logo: faPersonSnowboarding,
      title: "Various Difficulty Levels",
      description:
        "Challenge yourself with puzzles at different difficulty levels.",
    },
    {
      logo: faOsi,
      title: "Open-Source Platform",
      description:
        process.env.REACT_APP_BRANDNAME +
        " is an open-source platform, meaning that anyone can contribute to its development and improvement. This allows for a more collaborative and inclusive community, where everyone can benefit from the platform and contribute to its growth.",
    },
    {
      logo: faUniversalAccess,
      title: "User-Friendly Interface",
      description:
        "Enjoy a user-friendly interface designed for seamless navigation and interaction.",
    },
    {
      logo: faArrowUpRightDots,
      title: "Skill Enhancement",
      description:
        "Enhance your programming skills through daily algorithmic challenges.",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1">
      {list.map((list: featureList, index: number) => (
        <div key={index} className="grid grid-cols-12 h-[150px] md:w-full w-72">
          <FontAwesomeIcon
            icon={list.logo}
            className="text-2xl md:col-span-1 col-span-2 mt-4 flex justify-end text-slate-900 dark:text-slate-100"
          />
          <div className="col-span-10 flex flex-col">
            <h1 className="font-semibold text-xl text-slate-900 dark:text-slate-100">
              {list.title}
            </h1>
            <p className="text-slate-700 dark:text-slate-300">
              {list.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default features;
