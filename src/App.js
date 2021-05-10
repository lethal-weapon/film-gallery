import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {loadInitialData} from './store/actions/ModelActions';
import {Header} from './components/Header';
import {Section} from './components/Section';
import {ScrollSpy} from './components/ScrollSpy';
import {Footer} from './components/Footer';
import {NotFound} from './components/NotFound';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadInitialData());
  }, [dispatch]);

  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/" exact={true} component={Section} />
        <Route path="/404" exact={true} component={NotFound} />
        <Redirect to="/404" />
      </Switch>
      <ScrollSpy/>
      <Footer/>
    </Router>
  );
}
