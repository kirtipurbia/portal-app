import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from '../withRouter';
import { Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, TextField } from '@material-ui/core';
import compose from '../compose';
import Login from "./Login";
import UsersApi from '../apis/UsersAPI';
import SnackBar from "./SnackBar";
import EditUser from "./EditUser";

const styles = theme => ({
    btn: {
        cursor: 'pointer'
    },
    searchInput: {
        color: 'rgba(0, 0, 0, 0.87)'
    }
});

const Home = props => {
    const [list, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = React.useState(false);
    const [message, setmessage] = React.useState('');
    const [isOpenEdit, setIsOpenEdit] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState({});

    const { classes, isLoggedIn, userDetail } = props;

    useEffect(() => {
        const fetchList = async () => {
            const { data } = await UsersApi.fetchList(searchTerm);
            setList(data);
        };

        if (isLoggedIn) {
            fetchList();
        }
    }, [isLoggedIn, searchTerm]);

    const fetchUserList = async () => {
        const { data } = await UsersApi.fetchList(searchTerm);
        setList(data);
    };

    const removeUser = async (user) => {
        const { data } = await UsersApi.removeUser(user._id);
        if (data) {
            setmessage('User removed successfully.');
            fetchUserList();
        }
    };

    const editUser = async (user) => {
        setSelectedUser(user);
        setIsOpenEdit(true);
        // const { data } = await UsersApi.editUser(user._id);
        // if (data) {
        //     setmessage('User updated successfully.');
        //     fetchUserList();
        // }
    };

    const handleEditClose = (isUserUpdated) => {
        setIsOpenEdit(false);
        if (isUserUpdated) {
            fetchUserList();
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const onSearch = async (event) => {
        if (event.charCode === 13 && event.target.value) {
            setSearchTerm(event.target.value);
            // fetchUserList();
        }
    };

    return (
        <>
            {isOpenEdit ? (<EditUser show={isOpenEdit} onClose={handleEditClose} user={selectedUser} setmessage={setmessage}></EditUser>)
                : null}
            {!isLoggedIn ? (
                <Login />
            )
                : (
                    <Grid>
                        <Grid container direction="row">
                            <Grid item xs={12}>
                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                        <Typography variant="h6">
                                            User List
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            placeholder="Search User"
                                            InputProps={{
                                                disableUnderline: true,
                                                style: {
                                                    borderBottom: '2px solid rgba(0, 0, 0, 0.87)'
                                                }
                                            }}
                                            value={searchTerm}
                                            className={classes.searchInput}
                                            onChange={event => setSearchTerm(event.target.value)}
                                            onKeyPress={onSearch}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={12}>
                                {list && list.length ? (
                                    <TableContainer>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>User Name</TableCell>
                                                    <TableCell>Email</TableCell>
                                                    <TableCell align="center">Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {list.map((row) => (
                                                    <TableRow
                                                        key={row._id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell>{row.email}</TableCell>
                                                        <TableCell>
                                                            <Grid container direction="row" alignItems="center" justifyContent="space-around">
                                                                <Grid item className={classes.btn}>
                                                                    <i className="material-icons" onClick={() => { editUser(row) }}>edit</i>
                                                                </Grid>
                                                                <Grid item className={classes.btn}>
                                                                    {userDetail && userDetail._id !== row._id ? (
                                                                        <i className="material-icons" onClick={() => { removeUser(row) }}>delete</i>
                                                                    )
                                                                        : null}
                                                                </Grid>
                                                            </Grid>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )
                                    : (<Grid container direction="row" alignItems="center" >
                                        <Typography variant="body1">
                                            Welcome to dashboard
                                        </Typography>
                                    </Grid>)}
                            </Grid>
                        </Grid>

                        {message ? (
                            <SnackBar
                                open={open}
                                message={message}
                                handleClose={handleClose}
                            />
                        ) : null}
                        {/* <Grid item>
                <Link
                    className={classes.linkItem}
                    to="/signup"
                >
                    <Button
                        className={classes.signUpBtn}
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >
                        Sign Up
                    </Button>
                </Link>
            </Grid>
            <Grid item>
                <Link
                    className={classes.linkItem}
                    to="/login"
                >
                    <Button
                        className={classes.signUpBtn}
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >
                        Log In
                    </Button>
                </Link>
            </Grid> */}
                    </Grid>
                )}
        </>
    );
};


export default compose(
    withStyles(styles, { withTheme: true }),
)(withRouter(Home));