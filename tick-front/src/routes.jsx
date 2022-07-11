import loadable from '@loadable/component';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

const NotFoundPage = loadable(() => import('./page/not-found'));
const Home = loadable(() => import('./page/home'));
const Tick = loadable(() => import('./page/tick'));

function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/tick' component={Tick}></Route>
      <Route path='*' component={NotFoundPage}></Route>
    </Switch>
  );
}

export default Routes;
