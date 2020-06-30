import React from "react";
import styled from "styled-components";
import Helmet from 'react-helmet';
import Async from "~/components/Async";

import {
    Box as MuiBox,
    Button as MuiButton,
    Card as MuiCard,
    Divider as MuiDivider,
    Grid as MuiGrid,
    Typography as MuiTypography,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {positions, spacing} from "@material-ui/system";
import AntTabs from "~/components/AntTabs"

const Divider = styled(MuiDivider)(spacing, positions);
const Typography = styled(MuiTypography)(spacing, positions);
const Box = styled(MuiBox)(spacing, positions);
const Card = styled(MuiCard)(spacing, positions);
const Button = styled(MuiButton)(spacing, positions);
const Grid = styled(MuiGrid)(spacing, positions);

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 250,
    },
    root: {
        flexGrow: 1,
        width: '100%',
    },
    edit: {
        width: '100%'
    }
}));

const tabs = [
    {label: "개요", component: Async(() => import("./Summary"))},
    {label: "수집소스", component: Async(() => import("./Source"))},
    {label: "히스토리", component: Async(() => import("./History"))},
]

function Detail() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Helmet title="컬렉션"/>

            <br/>

            <Typography variant="h3">
                컬렉션
            </Typography>


            <Typography variant="h4" mt={2}>
                searc-prod
            </Typography>

            <Divider my={6}/>

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <AntTabs tabs={tabs} />
                </Grid>
            </Grid>

        </React.Fragment>
    );
}

export default Detail;
