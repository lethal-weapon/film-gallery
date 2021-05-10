import {DataTypes} from './constants/Types';

export const initialData = {
  queryData: {
    viewMode: DataTypes.FILM_GRID,
    searchTerm: '',
    searchText: '',
    searchMode: DataTypes.SEARCH_MODES[0],
    searchOptions: {},
    hasNextPage: false,
    page: 0
  },
  modelData: {
    matchCount: -1,
    [DataTypes.SUGGESTED_TERMS]: [],
    [DataTypes.FILM_GRID]: [],
    [DataTypes.FILM_LIST]: []
  }
}
