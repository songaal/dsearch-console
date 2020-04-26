// React components
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
    Typography,
} from "@material-ui/core";

// FastcatX Components
import AntTabs from "~/components/AntTabs"

// Variable
const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);
const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1, width: '100%', backgroundColor: theme.palette.background.paper},
    container: { maxHeight: 440 },
}));

// TODO Redux
const tabs = [
    { id: "0", label: "개요", component: Async(() => import("./Summary")) },
    { id: "1", label: "검색", component: Async(() => import("./Search")) },
    { id: "2", label: "사용자사전", component: Async(() => import("./Summary")) },
    { id: "3", label: "유사어사전", component: Async(() => import("./Summary")) },
    { id: "4", label: "불용어사전", component: Async(() => import("./Summary")) },
    { id: "5", label: "분리어사전", component: Async(() => import("./Summary")) },
    { id: "6", label: "복합명사사전", component: Async(() => import("./Summary")) },
    { id: "7", label: "단위명사전", component: Async(() => import("./Summary")) },
    { id: "8", label: "단위명동의어사전", component: Async(() => import("./Summary")) },
    { id: "9", label: "제조사명사전", component: Async(() => import("./Summary")) },
    { id: "10", label: "브랜드명사전", component: Async(() => import("./Summary")) },
    { id: "11", label: "카테고리키워드사전", component: Async(() => import("./Summary")) },
    { id: "12", label: "영단어사전", component: Async(() => import("./Summary")) },
]


function Dictionary({dispatch}) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        tabIndex: 0
    });
    return (
        <>
            <Helmet title="사전" />

            <Typography variant="h3" gutterBottom display="inline">
                사전
            </Typography>

            <Divider my={6} />
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <AntTabs tabs={tabs}/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
export default connect()(Dictionary);