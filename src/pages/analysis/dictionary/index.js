// React components
import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Async from '~/components/Async';

// Material components
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import styled from "styled-components";
import Helmet from 'react-helmet';
import {
    CardContent,
    Grid,
    Card as MuiCard,
    Divider as MuiDivider,
    Typography,

} from "@material-ui/core";

import AntTabs from "~/components/AntTabs"
import { spacing } from "@material-ui/system";
import SearchIcon from '@material-ui/icons/Search';

// Variable
const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);
const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1, width: '100%', backgroundColor: theme.palette.background.paper},
    container: { maxHeight: 440 },
}));

// TODO Redux
const tabs = [
    { icon: (<SearchIcon />), component: Async(() => import("./Search")) },
    { label: "개요", component: Async(() => import("./Summary")) },
    { label: "사용자사전", component: Async(() => import("./Summary")) },
    { label: "유사어사전", component: Async(() => import("./Summary")) },
    { label: "불용어사전", component: Async(() => import("./Summary")) },
    { label: "분리어사전", component: Async(() => import("./Summary")) },
    { label: "복합명사사전", component: Async(() => import("./Summary")) },
    { label: "단위명사전", component: Async(() => import("./Summary")) },
    { label: "단위명동의어사전", component: Async(() => import("./Summary")) },
    { label: "제조사명사전", component: Async(() => import("./Summary")) },
    { label: "브랜드명사전", component: Async(() => import("./Summary")) },
    { label: "카테고리키워드사전", component: Async(() => import("./Summary")) },
    { label: "영단어사전", component: Async(() => import("./Summary")) },
]

function Dictionary({dispatch}) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        tabIndex: 0
    });
    return (
        <>
            <Helmet title="사전"/>

            <Typography variant="h3" gutterBottom display="inline">
                사전
            </Typography>

            <Divider my={6}/>
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