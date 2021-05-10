export const DataTypes = {
  FILM_GRID: 'grid_type',
  FILM_LIST: 'list_type',
  SUGGESTED_TERMS: 'suggested_terms',

  SEARCH_MODES: [
    'filter_only',
    'search_only',
    'combine_both'
  ]
}

export const ActionTypes = {
  DATA_LOAD: 'data_load',
  FETCH_MORE_FILMS: 'fetch_more_films',
  FETCH_NEW_TERMS: 'fetch_new_terms',
  FETCH_NEXT_PAGE: 'fetch_next_page',
  SEARCH_FILMS: 'search_films',
  RESET_MATCH_COUNT: 'reset_match_count',

  CHANGE_SEARCH_TERM: 'change_search_term',
  CHANGE_SEARCH_TEXT: 'change_search_text',
  CHANGE_SEARCH_MODE: 'change_search_mode',
  CHANGE_SEARCH_OPTION: 'change_search_option',
  CLEAR_SEARCH_FIELD: 'clear_search_field',
  CHANGE_VIEW_MODE: 'change_view_mode',
  CHANGE_PAGING_INFO: 'change_paging_info',
  RESET_DASHBOARD: 'reset_dashboard'
}
