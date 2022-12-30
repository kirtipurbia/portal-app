import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from '../withRouter';
import compose from '../compose';

const styles = theme => ({
    rootContainer: {
        height: '64px'
    },
    subContainer: {
        backgroundColor: '#030372',
        height: '100%'
    },
    home: {
        fontFamily: "monospace",
        color: theme.palette.common.white,
        textDecoration: 'none'
    },
    userDetail: {
        fontFamily: "monospace",
        color: theme.palette.common.white
    },
    logout: {
        cursor: 'pointer'
    }
});

const Navbar = props => {
    const { classes, isLoggedIn, onLogout, userDetail } = props;
    // useEffect(() => {
    //     if (verifyToken()) {
    //     }
    // });

    return (
        <Grid className={classes.rootContainer}>
            <Grid className={classes.subContainer} container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item xs={10}>
                    <Link
                        to="/"
                        className={classes.home}
                    >
                        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                            <Grid item>
                                <i className="material-icons">home</i>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5">
                                    HOME
                                </Typography>
                            </Grid>
                        </Grid>
                    </Link>
                </Grid>
                {isLoggedIn && userDetail ? (
                    <Grid item xs={2} className={classes.userDetail}>
                        <Grid container direction="row" justifyContent="space-around" alignItems="center">
                            <Grid item xs={8}>
                                <Typography variant="h6">
                                    {userDetail.name}
                                </Typography>

                            </Grid>
                            <Grid item xs={4} className={classes.logout}>
                                <i className="material-icons" onClick={onLogout}>logout</i>
                            </Grid>
                        </Grid>
                    </Grid>
                )
                    : null}
            </Grid>
        </Grid>
    );
};


export default compose(
    withStyles(styles, { withTheme: true }),
)(withRouter(Navbar));