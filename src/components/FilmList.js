import React from 'react';
import {useSelector} from 'react-redux';
import {FilmListCard} from './FilmListCard';
import {DataTypes} from '../store/constants/Types';

export function FilmList() {
  const listFilms = useSelector((state) => state.modelData[DataTypes.FILM_LIST]) || [];

  return (
    <>
      {
        listFilms.map(film =>
          <FilmListCard
            key={film['id']}
            film={film}
          />
        )
      }
    </>
  );
}
