import React from 'react';
import { Switch } from 'react-router';
import routes from './routes';
import NestedRoute from './NestedRoute';
const MainContent = props => {
  return (
    <Switch>
      {routes.map((route, i) => (
        <NestedRoute key={i} {...route} {...props} />
      ))}
    </Switch>
  );
};
export default MainContent;
