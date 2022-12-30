import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Grid, Typography, TextField, Button, FormHelperText } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from '../withRouter';
import compose from '../compose';
import UsersApi from '../apis/UsersAPI';
import SnackBar from "./SnackBar";

const SignUp = props => {
    const [name, setName] = useState('');
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
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };

        try {
            const { data } = await UsersApi.signup(newUser);
            if (data._id) {
                setmessage('User created successfully.');
                setOpen(true);
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                // window.location.href = `/login`;
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
                                Sign Up
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <form onSubmit={onSubmit}>
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
                                    <Grid item xs={12}>
                                        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                                            <Grid item>
                                                <Button
                                                    className={classes.signUpBtn}
                                                    type="submit"
                                                    variant="contained"
                                                    color="secondary"
                                                >
                                                    Sign up
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="caption" align="right">
                                                    Already have an account? <Link className={classes.backBtn} to="/login">Log in</Link>
                                                </Typography>
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
)(withRouter(SignUp));