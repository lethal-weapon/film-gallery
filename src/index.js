import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {ModelReducer} from './store/reducers/ModelReducer';
import {QueryReducer} from './store/reducers/QueryReducer';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';
import 'animate.css/animate.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Setup the App theme before rendering anything
if ('dark' === localStorage.getItem('theme')) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

// Create the Redux data store
const dataStore = createStore(
  combineReducers({
    modelData: ModelReducer,
    queryData: QueryReducer
  }),
  compose(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={dataStore}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
