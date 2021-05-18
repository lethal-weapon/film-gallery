import React, {useState} from 'react';
import {useSelector} from 'react-redux';

export function Header() {
  const matchCount = useSelector((state) => state.modelData.matchCount);
  const [isDarkTheme, setIsDarkTheme] = useState('dark' === localStorage.getItem('theme'));
  const [isThemeChangeTriggered, setIsThemeChangeTriggered] = useState(false);

  const toggleAppTheme = () => {
    if (!isThemeChangeTriggered) {
      // apply first animation before changing
      setIsThemeChangeTriggered(true);
      setTimeout(() => {
        if (isDarkTheme) {
          setIsDarkTheme(false);
          localStorage.setItem('theme', 'light');
          document.documentElement.classList.remove('dark');
        } else {
          setIsDarkTheme(true);
          localStorage.setItem('theme', 'dark');
          document.documentElement.classList.add('dark');
        }
        // apply second animation after changing
        setIsThemeChangeTriggered(false);
      }, 1500);
    }
  }

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
        <img className="-my-2 ml-4 w-16 h-16 cursor-pointer
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
      <div className={`absolute top-3 right-5 text-2xl cursor-pointer hvr-grow animate__animated
                       ${isThemeChangeTriggered ? 'animate__rubberBand' : 'animate__bounce'}`}
           onClick={toggleAppTheme}
      >
        {isDarkTheme && <i className="fa fa-sun text-yellow-500"/>}
        {!isDarkTheme && <i className="fa fa-moon text-indigo-600"/>}
      </div>
    </header>
  );
}
