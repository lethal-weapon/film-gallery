import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changePagingInfo, changeSearchMode, resetDashboard} from '../store/actions/QueryActions';
import {resetMatchCount, searchFilms} from '../store/actions/ModelActions';
import {DataTypes} from '../store/constants/Types';

export function SearchMode() {
  const dispatch = useDispatch();
  const searchMode = useSelector((state) => state.queryData.searchMode);
  const queryParams = useSelector((state) => state.queryData);

  const [canPressReset, setCanPressReset] = useState(true);
  const [canPressReload, setCanPressReload] = useState(true);

  const handleReloadPress = () => {
    if (canPressReload) {
      setCanPressReload(false);
      setTimeout(() => setCanPressReload(true), 6000);

      // clear pagination info BEFORE performing a new search
      dispatch(changePagingInfo(false, 0));
      //
      const newQueryParams = {...queryParams, hasNextPage: false, page: 0};
      dispatch(searchFilms(newQueryParams));
    }
  }

  const handleResetPress = () => {
    if (canPressReset) {
      setCanPressReset(false);
      setTimeout(() => setCanPressReset(true), 3000);
      dispatch(resetDashboard());
      dispatch(resetMatchCount());
    }
  }

  const formatModeText = (mode = '') => {
    const words = mode.split('_');
    return words.map(w => `${w.charAt(0).toLocaleUpperCase()}${w.substring(1)}`).join(' ');
  }

  return (
    <ul>
      <li className="text-xl font-bold">Mode</li>
      {
        DataTypes.SEARCH_MODES.map(m =>
          <li key={m}
              className="mt-2 transform hover:translate-x-4 transition duration-500 ease-in-out">
            <span className={`px-2 py-1 rounded-full ${m === searchMode ?
                             'bg-blue-600 dark:bg-indigo-700 text-gray-200' :
                             'bg-blue-400 dark:bg-dark-700'}`}
                  onClick={() => dispatch(changeSearchMode(m))}
            >
              {formatModeText(m)}
            </span>
          </li>
        )
      }
      <li className="mt-5 text-lg">
        <i className={`fa fa-undo ${canPressReset ? 'hvr-grow' : 'animate-reset-button text-gray-500'}`}
           onClick={handleResetPress}/>
        <b className="ml-2">Reset</b>
      </li>
      <li className="mt-2 text-lg">
        <i className={`fa fa-sync ${canPressReload ? 'hvr-grow' : 'animate-reload-button text-gray-500'}`}
           onClick={handleReloadPress}/>
        <b className="ml-2">Reload</b>
      </li>
    </ul>
  );
}
