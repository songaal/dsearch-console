import React from "react";
// import PropTypes from 'prop-types';
import { connect, useSelector } from "react-redux";
import {
    Grid
} from "@material-ui/core";

import DynamicTable from "~/components/DynamicTable";

function UserDictionary({ dispatch }) {
    // const store = useStore()
    const userList = useSelector(state => state.dictionaryReducers.userList, []);

    console.log(userList)

    // console.log("userList: ", userList)
    return (
        <>
            <Grid container spacing={6}>
                <Grid item  xs={12}>

                </Grid>
            </Grid>
        </>
    )
}

export default connect()(UserDictionary);
