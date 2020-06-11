import React from "react";
import {connect} from "react-redux";
import Async from '~/components/Async';

import styled from "styled-components";
import Helmet from 'react-helmet';
import {
    Divider as MuiDivider,
    Grid,
    Typography
} from "@material-ui/core";

import AntTabs from "~/components/AntTabs"
import {spacing} from "@material-ui/system";
import SearchIcon from '@material-ui/icons/Search';

const Divider = styled(MuiDivider)(spacing);

const tabs = [
    {icon: (<SearchIcon/>), component: Async(() => import("./Search"))},
    {label: "개요", component: Async(() => import("./Summary"))},
    {label: "사용자사전", component: Async(() => import("./User"))},
    {label: "유사어사전", component: Async(() => import("./Synonym"))},
    {label: "불용어사전", component: Async(() => import("./Stop"))},
    {label: "분리어사전", component: Async(() => import("./Space"))},
    {label: "복합명사사전", component: Async(() => import("./Compound"))},
    {label: "단위명사전", component: Async(() => import("./Unit"))},
    {label: "단위명동의어사전", component: Async(() => import("./UnitSynonym"))},
    {label: "제조사명사전", component: Async(() => import("./Maker"))},
    {label: "브랜드명사전", component: Async(() => import("./Brand"))},
    {label: "카테고리키워드사전", component: Async(() => import("./Category"))},
    {label: "영단어사전", component: Async(() => import("./English"))},
];

function Dictionary() {
    return (
        <>
            <Helmet title="사전"/>
            <Typography variant="h3" gutterBottom display="inline">
                사전
            </Typography>
            <Divider my={6}/>


            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <AntTabs tabs={tabs} tabIndex={3}/>
                </Grid>
            </Grid>
        </>
    );
}

export default Dictionary;