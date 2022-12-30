import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Grid, Typography, TextField, Button, FormHelperText } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from '../withRouter';
import compose from '../compose';
import UsersApi from '../apis/UsersAPI';
import SnackBar from "./SnackBar";

const ResetPassword = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [open, setOpen] = React.useState(false);
    const [message, setmessage] = React.useState('');

    const { classes } = props;


    const onSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };
        try {
            const resp = await UsersApi.resetPassword(newUser);
            if (resp) {
                setmessage('User created successfully.');
                window.location.href = `/login`;
            }
        } catch (error) {
            setErrors(error.data);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.rootContainer}>
                <Grid item className={classes.containerDetail}>
                    <Link to="/" className={classes.backBtn}>
                        <Grid container direction="row" alignItems="center" spacing={1}>
                            <Grid item>
                                <i className="material-icons">keyboard_backspace</i>
                            </Grid>
                            <Grid item>
                                <Typography variant="caption">
                                    Back to home
                                </Typography>
                            </Grid>
                        </Grid>
                    </Link>
                </Grid>
                <Grid item className={classes.containerDetail}>
                    <Grid container direction="row" alignItems="center" spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" className={classes.title}>
                                Reset Password
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <form onSubmit={onSubmit}>
                                <Grid container direction="row" alignItems="center" spacing={2} >

                                    <Grid item xs={12}>
                                        <FormHelperText className={classes.label}>Email</FormHelperText>
                                        <TextField
                                            variant="outlined"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={e => {
                                                setEmail(e.target.value)
                                            }}
                                            fullWidth
                                            error={errors.email}
                                            required
                                        />
                                    </Grid>
                                    {email ?
                                        (<>
                                            <Grid item xs={6}>
                                                <FormHelperText className={classes.label}>Password</FormHelperText>
                                                <TextField
                                                    variant="outlined"
                                                    type="password"
                                                    placeholder="New Password"
                                                    value={password}
                                                    onChange={e => {
                                                        setPassword(e.target.value)
                                                    }}
                                                    fullWidth
                                                    error={errors.password}
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
                                                        setConfirmPassword(e.target.value)
                                                    }}
                                                    fullWidth
                                                    error={errors.confirmPassword}
                                                    required
                                                />
                                            </Grid>
                                        </>)
                                        : null}
                                    <Grid item xs={12}>
                                        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                                            <Grid item>
                                                <Button
                                                    className={classes.signUpBtn}
                                                    type="submit"
                                                    variant="contained"
                                                    color="secondary"
                                                >
                                                    Save
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
            {message ? (
                <SnackBar
                    open={open}
                    message={message}
                    handleClose={handleClose}
                />
            ) : null}
        </>
    );
};

const styles = theme => ({
    rootContainer: {
        height: '100%'
    },
    containerDetail: {
        width: '50%'
    },
    backBtn: {
        textDecoration: 'none',
        color: theme.palette.grey[700]
    },
    title: {
        margin: theme.spacing()
    },
    signUpBtn: {
        width: "140px",
        letterSpacing: "1.5px",
        backgroundColor: '#030372',
        fontSize: '16px',
        '&:hover': {
            backgroundColor: '#04046acf'
        }
    },
    label: {
        fontSize: '0.8em',
        color: '#8181c5'
    }
});

export default compose(
    withStyles(styles, { withTheme: true }),
)(withRouter(ResetPassword));