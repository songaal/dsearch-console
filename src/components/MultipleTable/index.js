import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Async from '~/components/Async';

// Material components
import styled from "styled-components";
import Helmet from 'react-helmet';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { spacing } from "@material-ui/system";
import {
    CardContent,
    Grid,
    Card as MuiCard,
    Divider as MuiDivider,
    Table,
    TableBody,
    TableHead,
    TableFooter,
    TableCell,
    TableRow
} from "@material-ui/core";


// Variable
const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);
const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1, width: '100%', backgroundColor: theme.palette.background.paper},
    container: { maxHeight: 440 },
}));


function MultipleTable({ size, data }) {
    const itemSize = size === 2 ? 6 : size === 3 ? 4 : size === 4 ? 3 : 12

    return(
        <Grid container spacing={6}>
            <Grid item xs={itemSize}>

            </Grid>
        </Grid>
    )
}

MultipleTable.prototype = {
    size: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired
}



export default MultipleTable