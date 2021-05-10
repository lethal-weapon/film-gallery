import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changePagingInfo, changeSearchMode, resetDashboard} from '../store/actions/QueryActions';
import {resetMatchCount, searchFilms} from '../store/actions/ModelActions';
import {DataTypes} from '../store/constants/Types';
import '../static/styles/Dashboard.css';

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
      setTimeout(() => setCanPressReset(true), 4000);
      dispatch(resetDashboard());
      dispatch(resetMatchCount());
    }
  }

  const formatModeText = (mode = '') => {
    const words = mode.split('_');
    return words.map(w => `${w.charAt(0).toLocaleUpperCase()}${w.substring(1)}`).join(' ');
  }

  return <div>
    <ul className="list-unstyled">
      <li><h5><b>Mode</b></h5></li>
      {
        DataTypes.SEARCH_MODES.map(m =>
          <li key={m}>
            <h5>
              <span className={`badge badge-${m === searchMode ? 'primary' : 'secondary hvr-forward'}`}
                    onClick={() => dispatch(changeSearchMode(m))}
              >
                {formatModeText(m)}
              </span>
            </h5>
          </li>
        )
      }
      <li className="mt-4">
        <span>
          <i className={`fa fa-undo ${canPressReset ? 'hvr-grow-shadow' : 'text-secondary reset-button'}`}
             onClick={handleResetPress}/>
          <b className="ml-2">Reset</b>
        </span>
      </li>
      <li className="mt-2">
        <span>
          <i className={`fa fa-sync ${canPressReload ? 'hvr-grow-shadow' : 'text-secondary reload-button'}`}
             onClick={handleReloadPress}/>
          <b className="ml-2">Reload</b>
        </span>
      </li>
    </ul>
  </div>
}
