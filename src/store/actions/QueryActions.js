import {ActionTypes} from '../constants/Types';

export const resetDashboard = () => ({
  type: ActionTypes.RESET_DASHBOARD
})

export const changeSearchTerm = (term) => ({
  type: ActionTypes.CHANGE_SEARCH_TERM,
  payload: term
})

export const changeSearchText = (text) => ({
  type: ActionTypes.CHANGE_SEARCH_TEXT,
  payload: text
})

export const changeSearchMode = (mode) => ({
  type: ActionTypes.CHANGE_SEARCH_MODE,
  payload: mode
})

export const changeSearchOption = (fieldName, newOptions) => ({
  type: ActionTypes.CHANGE_SEARCH_OPTION,
  payload: {
    field: fieldName,
    options: newOptions
  }
})

export const clearSearchField = (fieldName) => ({
  type: ActionTypes.CLEAR_SEARCH_FIELD,
  payload: fieldName
})

export const changeViewMode = (mode) => ({
  type: ActionTypes.CHANGE_VIEW_MODE,
  payload: mode
})

export const changePagingInfo = (hasNextPage, page) => ({
  type: ActionTypes.CHANGE_PAGING_INFO,
  payload: {
    hasNextPage: hasNextPage,
    page: page
  }
})
