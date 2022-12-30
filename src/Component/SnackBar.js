import React from 'react';
// import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  close: {
    // width: theme.spacing(2),
    // height: theme.spacing(2)
  }
});

const SnackBar = ({ open, handleClose, handleExited, message, key, classes }) => (
  <Snackbar
    key={key}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={open}
    onClose={handleClose}
    onExited={handleExited}
    ContentProps={{
      'aria-describedby': 'message-id'
    }}
    autoHideDuration={5000}
    message={<span id="message-id">{message}</span>}
    action={[
      <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    ]}
  />
);

SnackBar.propTypes = {};

export default withStyles(styles)(SnackBar);
