import {ActionTypes, DataTypes} from '../constants/Types';
import {initialData} from '../initialData';

export const ModelReducer = (storeData, action) => {
  switch (action.type) {
    case ActionTypes.RESET_MATCH_COUNT:
      return {...storeData, matchCount: -1};

    case ActionTypes.DATA_LOAD:
      return {
        ...storeData,
        [DataTypes.SUGGESTED_TERMS]: action.payload.terms,
        [DataTypes.FILM_GRID]: action.payload.movies
      };

    case ActionTypes.FETCH_MORE_FILMS:
      return {
        ...storeData,
        [action.payload.dataType]:
          [...storeData[action.payload.dataType], ...action.payload.movies]
      };

    case ActionTypes.FETCH_NEW_TERMS: {
      const {terms} = action.payload;
      return {
        ...storeData,
        [DataTypes.SUGGESTED_TERMS]:
          (terms && terms.length > 0) ? terms : storeData[DataTypes.SUGGESTED_TERMS],
      };
    }

    case ActionTypes.FETCH_NEXT_PAGE: {
      const {movies, dataType} = action.payload;
      const oldMovieIds = storeData[dataType].map(m => m['id']) || [];
      return {
        ...storeData,
        [dataType]:
          [...storeData[dataType], ...movies.filter(m => !oldMovieIds.includes(m['id']))]
      };
    }

    case ActionTypes.SEARCH_FILMS: {
      const {matchCount, movies, terms, dataType} = action.payload;
      const anotherType = dataType === DataTypes.FILM_GRID ? DataTypes.FILM_LIST : DataTypes.FILM_GRID;
      const newMovieIds = movies.map(m => m['id']) || [];
      return {
        ...storeData,
        matchCount: matchCount,
        [DataTypes.SUGGESTED_TERMS]: (terms && terms.length > 0) ? terms : storeData[DataTypes.SUGGESTED_TERMS],
        [dataType]: movies,
        [anotherType]: storeData[anotherType].filter(m => newMovieIds.includes(m['id']))
      };
    }

    default:
      return storeData || initialData.modelData;
  }
};
