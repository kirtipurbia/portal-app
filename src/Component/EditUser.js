import React, { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import { Button, DialogActions, DialogContent, DialogTitle, FormHelperText, Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from '../withRouter';
import compose from '../compose';
import UsersApi from '../apis/UsersAPI';

const ForgotPassword = props => {
  const { show, onClose, user, classes, setmessage } = props;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = React.useState({});

  const updateUser = async () => {
    const newUser = {
      name: name,
      email: email,
      // _id: user._id
    };

    if (password) {
      newUser.password = password;
    }

    if (confirmPassword) {
      newUser.confirmPassword = confirmPassword;
    }

    try {
      const { data } = await UsersApi.updateUser(user._id, newUser);
      if (data) {
        setmessage('User updated successfully.');
        onClose(true);
      }
    } catch (error) {
      setErrors(error.data);
    }
  };

  return (
    <Dialog open={show} onClose={onClose} aria-labelledby="forgotPwd">
      <DialogTitle id="form-dialog-title" style={{ textAlign: 'center', fontSize: '28px', fontWeight: '400' }}>
        <span style={{ fontSize: '28px', fontWeight: '400', margin: 'auto' }}>Update User</span>
      </DialogTitle>
      <DialogContent>
        <Grid container direction="row" spacing={2} >
          <Grid item xs={12}>
            <FormHelperText className={classes.label}>Name</FormHelperText>
            <TextField
              variant="outlined"
              type="text"
              placeholder="User Name"
              value={name}
              onChange={e => {
                setErrors({});

                setName(e.target.value)
              }}
              fullWidth
              helperText={errors.name}
              error={errors.name && errors.name !== ""}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormHelperText className={classes.label}>Email</FormHelperText>
            <TextField
              variant="outlined"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => {
                setErrors({});

                setEmail(e.target.value)
              }}
              fullWidth
              helperText={errors.email}
              error={errors.email && errors.email !== ""}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormHelperText className={classes.label}>Password</FormHelperText>
            <TextField
              variant="outlined"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => {
                setErrors({});

                setPassword(e.target.value)
              }}
              fullWidth
              helperText={errors.password}
              error={errors.password && errors.password !== ""}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormHelperText className={classes.label}>Confirm Password</FormHelperText>
            <TextField
              variant="outlined"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => {
                setErrors({});

                setConfirmPassword(e.target.value)
              }}
              fullWidth
              helperText={errors.confirmPassword}
              error={errors.confirmPassword && errors.confirmPassword !== ""}
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Button onClick={onClose} variant="contained">
          Cancel
        </Button>
        <Button className={classes.signUpBtn} type="submit" variant="contained" color="secondary" onClick={updateUser} >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = theme => ({
  label: {
    fontSize: '0.8em',
    color: '#8181c5'
  },
  signUpBtn: {
      backgroundColor: '#030372',
      '&:hover': {
          backgroundColor: '#04046acf'
      }
  }
});

export default compose(
  withStyles(styles, { withTheme: true }),
)(withRouter(ForgotPassword));
