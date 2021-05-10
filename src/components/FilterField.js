import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeSearchMode, changeSearchOption, clearSearchField} from '../store/actions/QueryActions';
import {DataTypes} from '../store/constants/Types';

export function FilterField({fieldName, fieldValues, isMultipleOptionField}) {
  const dispatch = useDispatch();
  const searchMode = useSelector((state) => state.queryData.searchMode);
  const activeOptions = useSelector((state) => state.queryData.searchOptions[fieldName]) || [];

  const handleOptionChange = (option) => {
    let newOptions;
    // removing an existing option
    if (activeOptions.includes(option)) {
      newOptions = activeOptions.filter(o => o !== option);
    } else {
      // adding a new option
      if (option === 'Others' || !isMultipleOptionField) {
        newOptions = [option]
      } else if (activeOptions.includes('Others')) {
        newOptions = [...activeOptions.filter(o => o !== 'Others'), option];
      } else {
        newOptions = [...activeOptions, option];
      }
    }
    // when a filter field doesn't contain any options,
    // clear the whole field instead of leaving an empty array
    if (newOptions.length === 0) {
      dispatch(clearSearchField(fieldName));
    } else {
      dispatch(changeSearchOption(fieldName, newOptions));
    }
    // when filter options get modified, change the search mode if needed
    if (searchMode === DataTypes.SEARCH_MODES[1]) {
      dispatch(changeSearchMode(DataTypes.SEARCH_MODES[0]))
    }
  }

  return <div className="row mx-3 my-2">
    <span className="mr-3"><b>{fieldName}</b></span>
    {
      fieldValues.map(option =>
        <span
          key={option}
          className={`
            ${activeOptions.includes(option) ? 'badge-primary border-primary ' : 'border-secondary '}
            mr-2 mt-1 badge badge-pill border hvr-grow
          `}
          onClick={() => handleOptionChange(option)}
        >
          {option}
        </span>
      )
    }
  </div>
}
