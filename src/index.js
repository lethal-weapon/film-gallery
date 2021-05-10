import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {ModelReducer} from './store/reducers/ModelReducer';
import {QueryReducer} from './store/reducers/QueryReducer';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'animate.css/animate.min.css';
import 'hover.css/css/hover-min.css';

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
