import React from 'react';
import {useSelector} from 'react-redux';
import {FilmGridRow} from './FilmGridRow';
import {DataTypes} from '../store/constants/Types';

export function FilmGrid() {
  const gridFilms = useSelector((state) => state.modelData[DataTypes.FILM_GRID]) || [];

  const groupFilmsByRow = () => {
    let rows = [];
    gridFilms.forEach((film, index) =>
      index % 4 === 0 && rows.push(gridFilms.slice(index, index + 4)));
    return rows;
  }

  return <>
    {
      groupFilmsByRow().map((group, index) =>
        <FilmGridRow
          key={index}
          films={group}
        />
      )
    }
  </>
}
