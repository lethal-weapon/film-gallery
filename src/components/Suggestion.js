import React, {useEffect} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {changePagingInfo, changeSearchMode, changeSearchTerm} from '../store/actions/QueryActions';
import {searchFilms} from '../store/actions/ModelActions';
import {cleanCredit} from '../utilities/CreditCleaner';
import {ViewMode} from './ViewMode';
import {DataTypes} from '../store/constants/Types';

export function Suggestion() {
  const dispatch = useDispatch();
  const store = useStore();
  const searchMode = useSelector((state) => state.queryData.searchMode);
  const searchTerm = useSelector((state) => state.queryData.searchTerm);
  const suggestedTerms = useSelector((state) => state.modelData[DataTypes.SUGGESTED_TERMS]) || [];

  useEffect(() => {
    const unsubscriber = store.subscribe(() => {
      const previousTerm = searchTerm;
      const currentTerm = store.getState().queryData.searchTerm.toString();
      const currentMode = store.getState().queryData.searchMode.toString();
      const currentPage = store.getState().queryData.page;
      const queryParams = store.getState().queryData;

      if (currentTerm !== previousTerm &&
        currentTerm.trim().length !== 0 &&
        currentMode !== DataTypes.SEARCH_MODES[0] &&
        currentPage === 0) {
        dispatch(searchFilms(queryParams));
      }
    });
    return () => unsubscriber();
  });

  const handleSearchTermChange = (clickedTerm) => {
    if (clickedTerm === searchTerm) {
      dispatch(changeSearchTerm(''));
    } else {
      dispatch(changeSearchTerm(clickedTerm));
      // clear pagination info BEFORE performing a new search
      dispatch(changePagingInfo(false, 0));
      // when a new suggested term is clicked, change search mode
      // if needed and then perform a new search in useEffect
      if (searchMode === DataTypes.SEARCH_MODES[0]) {
        dispatch(changeSearchMode(DataTypes.SEARCH_MODES[1]))
      }
    }
  }

  const getSuggestedTerms = () => {
    const MAX_CHAR = 72;
    let oldTerms = suggestedTerms
      .map(c => cleanCredit(c))
      .filter((value, index, array) => array.indexOf(value) === index);

    let newTerms = [];
    while (oldTerms.length > 0 && newTerms.join('').length < MAX_CHAR) {
      newTerms.push(oldTerms.shift());
    }
    return newTerms;
  }

  return (
    <div className="p-2 mt-2 rounded-lg bg-blue-300 dark:bg-dark-800
                    animate__animated animate__fadeIn animate__slower animate__delay-3s">
      <div className="grid grid-rows-1 grid-cols-12">
        <div className="col-span-11">
          {
            getSuggestedTerms().map(term =>
              <span key={term}
                    className={`ml-3 ${term === searchTerm ?
                      'opacity-100 text-gray-900 dark:text-pink-500 font-black' :
                      'opacity-60 hover:opacity-100 hover:text-gray-900 dark:hover:text-pink-500'}`}
                    onClick={() => handleSearchTermChange(term)}
              >
                {term}
              </span>
            )
          }
        </div>
        <div className="col-span-1">
          <ViewMode/>
        </div>
      </div>
    </div>
  );
}
