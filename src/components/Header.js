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
      <a className="hvr-buzz"
         style={{outline: "none"}}
         href="https://github.com/lethal-weapon/film-gallery"
         target="_blank"
         rel="noopener noreferrer"
      >
        <img src={`${process.env.PUBLIC_URL}/logo.svg`}
             alt="AppLogo"
             className="ml-4 animate__animated animate__lightSpeedInRight animate__delay-1s"
             style={{width: 72 + 'px', height: 72 + 'px'}}/>
      </a>
      <div style={{
        position: "absolute",
        top: 1 + '%',
        left: (47 - getMatchText().length) + '%',
        fontFamily: "monospace"
      }}>
        <span className="font-weight-bold font-italic"
              style={{fontSize: 2 + 'rem', color: "tomato"}}
        >
          {getMatchText()}
        </span>
        {
          matchCount > 0 &&
          <span className="ml-3" style={{fontSize: 1.5 + 'rem'}}>
            {`${matchCount > 1 ? 'Films' : 'Film'} Found`}
          </span>
        }
      </div>
    </header>
  );
}
