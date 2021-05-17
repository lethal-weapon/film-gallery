import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {changePagingInfo, changeSearchMode, changeSearchTerm, changeSearchText} from '../store/actions/QueryActions';
import {fetchNewTerms, searchFilms} from '../store/actions/ModelActions';
import {DataTypes} from '../store/constants/Types';

export function SearchText() {
  const dispatch = useDispatch();
  const store = useStore();
  const searchMode = useSelector((state) => state.queryData.searchMode);
  const searchTerm = useSelector((state) => state.queryData.searchTerm);
  const searchText = useSelector((state) => state.queryData.searchText);
  const queryParams = useSelector((state) => state.queryData);

  const searchElement = useRef(null);
  const [lastSearchText, setLastSearchText] = useState('');

  useEffect(() => {
    const unsubscriber = store.subscribe(() => {
      const currentText = store.getState().queryData.searchText.toString();
      const viewText = searchElement.current.value.toString();

      // enable the search box to respond to the Reset button, it has a
      // side effect that the search text cannot start typing with space
      if (currentText.length === 0 && viewText.length !== 0) {
        searchElement.current.value = '';
      }
    });
    return () => unsubscriber();
  });

  const handleTextChange = (e) => {
    // format the search text properly before sending to store/server
    const input = e.target.value.toString();
    const text = input.trim().split(/\s+/).join(' ');
    dispatch(changeSearchText(text));

    // fetch a new list of suggested terms
    if (text.length > 0) {
      dispatch(fetchNewTerms(text));
    }
    // clear the selected search term while the text is changing
    if (searchTerm.length !== 0) {
      dispatch(changeSearchTerm(''));
    }
    // also change search mode if needed
    if (searchMode === DataTypes.SEARCH_MODES[0]) {
      dispatch(changeSearchMode(DataTypes.SEARCH_MODES[1]))
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' &&
      searchText !== lastSearchText &&
      searchText.length > 0) {
      //
      setLastSearchText(searchText);
      // clear pagination info BEFORE performing a new search
      dispatch(changePagingInfo(false, 0));
      //
      const newQueryParams = {...queryParams, hasNextPage: false, page: 0};
      dispatch(searchFilms(newQueryParams));
    }
  }

  return (
    <div>
      <span><i className="fa fa-filter"/></span>
      <span className="mx-2">/</span>
      <span><i className="fa fa-search"/></span>
      <input className="ml-4 px-4 py-2 h-9 bg-transparent border rounded-full outline-none
                        w-1/5 focus:w-1/2 transition-all duration-500 ease-in-out
                        border-gray-600 text-gray-900
                        dark:border-gray-400 dark:text-pink-500"
             type="text"
             name="text"
             placeholder="Titles | Cast | Directors | Writers | Plot"
             ref={searchElement}
             onChange={handleTextChange}
             onKeyPress={handleKeyPress}/>
    </div>
  );
}
