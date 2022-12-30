import Navbar from "./Navbar";
import MainContent from "../MainContent";
import { Grid, Container } from '@material-ui/core';
import { Redirect } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from '../withRouter';
import compose from '../compose';
import { useEffect, useState } from "react";
import { removeCookies, verifyToken } from "../utils/StorageUtil";
import UsersApi from '../apis/UsersAPI';

const Layout = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetail, setUserDetail] = useState("");
    const { classes } = props;

    useEffect(() => {
        if (verifyToken()) {
            getCurrentLoggedInUser();
        }
    }, []);

    const getCurrentLoggedInUser = async () => {
        const user = await UsersApi.getCurrentLoggedInUser();
        if (user) {
            setIsLoggedIn(true);
            setUserDetail(user.data);
        }
    };

    const onLogout = async () => {
        setIsLoggedIn(false);
        setUserDetail("");
        await removeCookies();
        window.location.href = '/login';

    };

    if (isLoggedIn && props && props.location && (props.location.pathname === '/login' || props.location.pathname === '/register')) {
        return <Redirect to={{ pathname: '/' }} />;
    }

    return (
        <Grid container direction="column" justifyContent="flext-start" alignItems="flext-start">
            <Grid item className={classes.containerDetail}>
                <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} userDetail={userDetail} />
            </Grid>
            <Grid item className={classes.containerDetail}>
                <Container className={classes.subContainer}>
                    <MainContent isLoggedIn={isLoggedIn} userDetail={userDetail} />
                </Container>
            </Grid>
        </Grid>
    );
};

const styles = theme => ({
    containerDetail: {
        width: '100%'
    },
    subContainer: {
        height: 'calc(100vh - 64px - 14px)' // '100%'
    }
});

export default compose(
    withStyles(styles, { withTheme: true }),
)(withRouter(Layout));