import {ActionTypes, DataTypes} from '../constants/Types';
import {changePagingInfo, changeSearchTerm} from './QueryActions';
import * as API from './API';

export const resetMatchCount = () => ({
  type: ActionTypes.RESET_MATCH_COUNT
})

export const loadInitialData = () => async (dispatch) => {
  try {
    const {data} = await API.loadData();
    dispatch({
      type: ActionTypes.DATA_LOAD,
      payload: {
        movies: data.movies,
        terms: data.terms
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}

export const fetchMoreFilms = (ids, dataType, callbackAction) => async (dispatch) => {
  try {
    const {data} = await API.fetchFilms({
      filmIds: ids,
      filmType: dataType
    });
    dispatch({
      type: ActionTypes.FETCH_MORE_FILMS,
      payload: {
        movies: data.movies,
        dataType: dataType
      }
    });
  } catch (error) {
    console.log(error.message);
  }
  // now, it's time to change the view mode!
  // change it anyway even if there are network errors
  dispatch(callbackAction);
}

export const fetchNewTerms = (searchText) => async (dispatch) => {
  try {
    const {data} = await API.fetchTerms({searchText: searchText});
    dispatch({
      type: ActionTypes.FETCH_NEW_TERMS,
      payload: {
        terms: data.terms,
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}

export const fetchNextPage = (queryParams) => async (dispatch) => {
  try {
    if (!queryParams.hasNextPage) {
      return;
    }
    const {data} = await API.searchFilms(queryParams);
    dispatch({
      type: ActionTypes.FETCH_NEXT_PAGE,
      payload: {
        movies: data.movies,
        dataType: queryParams.viewMode
      }
    });
    // update pagination info AFTER server return
    dispatch(changePagingInfo(data.hasNextPage, data.page));
  } catch (error) {
    console.log(error.message);
  }
}

export const searchFilms = (queryParams) => async (dispatch) => {
  try {
    if (!shouldPerformNewSearch(queryParams)) {
      return;
    }
    const {data} = await API.searchFilms(queryParams);
    dispatch({
      type: ActionTypes.SEARCH_FILMS,
      payload: {
        matchCount: data.matchCount,
        movies: data.movies,
        terms: data.terms,
        dataType: queryParams.viewMode
      }
    });
    // update pagination info AFTER server return
    dispatch(changePagingInfo(data.hasNextPage, data.page));
    // clear the old selected search term if there are new options from server
    if (data.terms && data.terms.length > 0) {
      dispatch(changeSearchTerm(''));
    }
  } catch (error) {
    console.log(error.message);
  }
}

const shouldPerformNewSearch = (queryParams = {}) => {
  // do nothing if no filter options provided while enable filter-search-only mode
  if (queryParams.searchMode === DataTypes.SEARCH_MODES[0] &&
    Object.keys(queryParams.searchOptions).length === 0) {
    return false;
  }
  // do nothing if no text provided while enable text-search-only mode
  if (queryParams.searchMode === DataTypes.SEARCH_MODES[1] &&
      queryParams.searchTerm.length === 0 &&
      queryParams.searchText.length === 0) {
    return false;
  }
  // also...
  return !(Object.keys(queryParams.searchOptions).length === 0 &&
    queryParams.searchTerm.length === 0 &&
    queryParams.searchText.length === 0);
}
