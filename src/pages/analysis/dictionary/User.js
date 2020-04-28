import React from "react";
// import PropTypes from 'prop-types';
import {connect, useSelector} from "react-redux";
import {Grid} from "@material-ui/core";

function UserDictionary({dispatch, userList, user}) {
    console.log(dispatch, userList, user);
    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </>
    )
}

export default connect(store => ({userList: store.dictionaryReducers.userList, user: store.dictionaryReducers.user}))(UserDictionary);
