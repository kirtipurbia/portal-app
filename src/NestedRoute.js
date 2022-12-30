import React from 'react';
import { Route } from 'react-router';

const NestedRoute = props => {
  const { path, isLoggedIn, userDetail } = props;
  return (
    <Route
      path={path}
      render={rProps => (
        <props.component
          {...rProps}
          isLoggedIn={isLoggedIn}
          userDetail={userDetail}
        />
      )}
    />
  );
};

export default NestedRoute;
