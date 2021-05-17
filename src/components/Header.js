import React from 'react';
import {useSelector} from 'react-redux';

export function Header() {
  const matchCount = useSelector((state) => state.modelData.matchCount);

  const getMatchText = () => {
    return matchCount > 0 ? `${matchCount.toLocaleString()}` :
           matchCount < 0 ? `` : `NO MATCH`;
  }

  return (
    <header>
      <a className="outline-none cursor-default"
         href="https://github.com/lethal-weapon/film-gallery"
         target="_blank"
         rel="noopener noreferrer"
      >
        <img className="-my-2 ml-4 w-16 h-16 cursor-pointer hvr-grow
                        animate__animated animate__lightSpeedInRight animate__delay-1s"
             src={`${process.env.PUBLIC_URL}/logo.svg`}
             alt="AppLogo"/>
      </a>
      <div className="absolute top-2 font-mono"
           style={{left: (47 - getMatchText().length) + '%'}}>
        <span className="text-3xl italic font-bold text-red-500 dark:text-lime-600">
          {getMatchText()}
        </span>
        {
          matchCount > 0 &&
          <span className="ml-3 text-2xl">
            {`${matchCount > 1 ? 'Films' : 'Film'} Found`}
          </span>
        }
      </div>
    </header>
  );
}
