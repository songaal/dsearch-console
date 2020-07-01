import React from "react";
import Async from '~/components/Async';
import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import AntTabs from "~/components/AntTabs"
import IndicesSelect from "~/components/IndicesSelect";
import {Divider as MuiDivider, Typography} from "@material-ui/core";

import {spacing} from "@material-ui/system";

const useStyles = makeStyles((theme) => ({}));
const Divider = styled(MuiDivider)(spacing);

const tabs = [
    {label: "개요", component: Async(() => import("./Summary"))},
    {label: "매핑", component: Async(() => import("./Mapping"))},
    {label: "셋팅", component: Async(() => import("./Setting"))},
    {label: "통계", component: Async(() => import("./Statistics"))},
    {label: "데이터", component: Async(() => import("./Data"))},
];

function Index() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Helmet title="인덱스"/>

            <IndicesSelect/>

            <Typography variant="h3" gutterBottom display="inline">인덱스</Typography>

            <Divider my={6} />

            <AntTabs tabs={tabs} />

        </React.Fragment>
    );
}

export default Index;
