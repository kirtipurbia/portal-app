import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Grid, Typography, TextField, Button, FormHelperText } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from '../withRouter';
import compose from '../compose';
import UsersApi from '../apis/UsersAPI';
import { saveToken } from "../utils/StorageUtil";

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const { classes } = props;


    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await UsersApi.login(email, password);
            if (data.success) {
                saveToken({ id_token: data.token });
                window.location.href = `/`;
            }
        } catch (error) {
            setErrors(error.data);
        }
    };

    return (
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
                            Login
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
                                            setErrors({});
                                            setEmail(e.target.value)
                                        }}
                                        fullWidth
                                        helperText={errors.email}
                                        error={errors.email && errors.email !== ""}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
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
                                    <Grid className={classes.forgotPassowd}>
                                        <Typography variant="caption" align="right">
                                            <Link className={classes.link} to="/reset-password">Forgot Password</Link>
                                        </Typography>
                                    </Grid>
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
                                                Login
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="caption" align="right">
                                                Don't have an account? <Link className={classes.backBtn} to="/signup">Sign Up</Link>
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
    },
    forgotPassowd: {
        textAlign: 'right',
        color: theme.palette.primary.light,
    },
    link: {
        textDecoration: 'none'
    }
});

export default compose(
    withStyles(styles, { withTheme: true }),
)(withRouter(Login));