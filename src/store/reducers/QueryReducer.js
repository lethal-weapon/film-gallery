import {ActionTypes, DataTypes} from '../constants/Types';
import {initialData} from '../initialData';

export const QueryReducer = (storeData, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_SEARCH_TERM:
      return {...storeData, searchTerm: action.payload};

    case ActionTypes.CHANGE_SEARCH_TEXT:
      return {...storeData, searchText: action.payload};

    case ActionTypes.CHANGE_SEARCH_MODE:
      return {...storeData, searchMode: action.payload};

    case ActionTypes.CHANGE_SEARCH_OPTION:
      return {
        ...storeData,
        searchOptions: {
          ...storeData.searchOptions,
          [action.payload.field]: action.payload.options
        }
      };

    case ActionTypes.CLEAR_SEARCH_FIELD: {
      let newOptions = {};

      Object.keys(storeData.searchOptions)
        .forEach(field => {
          if (field !== action.payload) {
            newOptions[field] = [...storeData.searchOptions[field]];
          }
        });
      return {...storeData, searchOptions: newOptions};
    }

    case ActionTypes.CHANGE_VIEW_MODE:
      return {...storeData, viewMode: action.payload};

    case ActionTypes.CHANGE_PAGING_INFO:
      return {
        ...storeData,
        hasNextPage: action.payload.hasNextPage,
        page: action.payload.page
      };

    case ActionTypes.RESET_DASHBOARD:
      return {
        ...storeData,
        searchTerm: '',
        searchText: '',
        searchMode: DataTypes.SEARCH_MODES[0],
        searchOptions: {},
        hasNextPage: false,
        page: 0
      };

    default:
      return storeData || initialData.queryData;
  }
};
