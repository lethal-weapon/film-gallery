import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeViewMode} from '../store/actions/QueryActions';
import {fetchMoreFilms} from '../store/actions/ModelActions';
import {DataTypes} from '../store/constants/Types';

export function ViewMode() {
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.queryData.viewMode);
  const gridFilms = useSelector((state) => state.modelData[DataTypes.FILM_GRID]) || [];
  const listFilms = useSelector((state) => state.modelData[DataTypes.FILM_LIST]) || [];

  const fetchMoreDataIfNecessary = (clickedMode) => {
    const gridFilmIds = gridFilms.map(f => f['id']);
    const listFilmIds = listFilms.map(f => f['id']);
    let filmsToFetch = [];

    if (clickedMode === DataTypes.FILM_LIST) {
      gridFilmIds.forEach(gid => {
        if (!listFilmIds.includes(gid)) {
          filmsToFetch.push(gid);
        }
      });
    } else {
      listFilmIds.forEach(lid => {
        if (!gridFilmIds.includes(lid)) {
          filmsToFetch.push(lid);
        }
      });
    }
    // change the view mode immediately if no fetch is required
    // otherwise, delay the mode change until new data comes
    if (filmsToFetch.length === 0) {
      dispatch(changeViewMode(clickedMode));
    } else {
      dispatch(fetchMoreFilms(filmsToFetch, clickedMode, changeViewMode(clickedMode)));
    }
  }

  const handleViewModeChange = (clickedMode) => {
    if (clickedMode !== viewMode) {
      fetchMoreDataIfNecessary(clickedMode);
    }
  }

  return (
    <div>
      <span className={`${viewMode === DataTypes.FILM_GRID ? 'text-blue-500 dark:text-indigo-600' : ''}`}
            onClick={() => handleViewModeChange(DataTypes.FILM_GRID)}>
        <i className="fa fa-lg fa-th-large hvr-grow"/>
      </span>
      <span className="mx-2">|</span>
      <span className={`${viewMode === DataTypes.FILM_LIST ? 'text-blue-500 dark:text-indigo-600' : ''}`}
            onClick={() => handleViewModeChange(DataTypes.FILM_LIST)}>
        <i className="fa fa-lg fa-th-list hvr-grow"/>
      </span>
    </div>
  );
}
