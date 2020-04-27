import React from "react";
// import PropTypes from 'prop-types'

// Material components
// import { makeStyles, withStyles  } from '@material-ui/core/styles';
// import styled from "styled-components";
import {
    Grid
} from "@material-ui/core";

import DynamicTable from "~/components/DynamicTable";

export default function() {
    const dataList = [
        { field: "키1", data: ["test1", "test2"] },
        { field: "값2", data: ["test3", "test4", "1111"] },

    ]
    return (
        <>
            <Grid container spacing={6}>
                <Grid item  xs={'auto'}>
                    <DynamicTable dataList={ dataList }/>
                </Grid>
                <Grid item xs={"auto"}>
                    <DynamicTable dataList={ dataList }/>
                </Grid>
                {/*<Grid item xs={3}>*/}
                {/*    <DynamicTable dataList={ dataList }/>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={3}>*/}
                {/*    <DynamicTable dataList={ dataList }/>*/}
                {/*</Grid>*/}
            </Grid>
        </>
    )
}