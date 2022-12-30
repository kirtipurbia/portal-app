import React from 'react';
// import PropTypes from 'prop-types';

const Logout = props => {
  return (
    <div>
      <button onClick={props.logoutHandler}>logout</button>
    </div>
  );
};

Logout.propTypes = {};

export default Logout;
