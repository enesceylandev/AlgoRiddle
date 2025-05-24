import React from "react";

const Header: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6 justify-end items-center h-[400px] w-full sm:max-w-[800px] text-center transition-all z-0">
      <h1 className="sm:text-5xl text-2xl font-extrabold text-slate-900 dark:text-slate-100 z-20">
        About The Project
      </h1>
      <p className="sm:text-xl text-md text-slate-600 dark:text-slate-400 z-20">
        <span className="underline font-semibold underline-offset-2 dark:text-slate-300 text-slate-700">
          {process.env.REACT_APP_BRANDNAME}
        </span>{" "}
        is an
        <span className="font-semibold dark:text-slate-300 text-slate-700">
          {" "}
          open-source and intuitive platform{" "}
        </span>
        (here users enhance their programming skills by
        <span className="font-semibold dark:text-slate-300 text-slate-700">
          {" "}
          solving algorithmic puzzles{" "}
        </span>
        at various difficulty levels. Whether you're a
        <span className="font-semibold dark:text-slate-300 text-slate-700">
          {" "}
          coding novice or a seasoned programmer
        </span>
        , {process.env.REACT_APP_BRANDNAME} offers an
        <span className="font-semibold dark:text-slate-300 text-slate-700">
          {" "}
          ideal environment to hone your skills{" "}
        </span>
        )ith its accessible and user-friendly interface.
      </p>
    </div>
  );
};

export default Header;
