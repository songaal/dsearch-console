import React from "react";
import styled from "styled-components";
import {NavLink as RouterNavLink} from "react-router-dom";

import Helmet from 'react-helmet';

import {
    Breadcrumbs as MuiBreadcrumbs,
    Card as MuiCard,
    CardContent, CardHeader,
    Divider as MuiDivider,
    Grid,
    Link,
    Typography,
    Box as MuiBox, TextField,
    Button
} from "@material-ui/core";
import {
    Cached
} from "@material-ui/icons"
import {spacing} from "@material-ui/system";
import AntTabs from "../../../components/AntTabs";
import async from "../../../components/Async";

const Divider = styled(MuiDivider)(spacing);

function ClusterSettings() {
    return (
        <React.Fragment>
            <Helmet title="클러스터설정"/>
            <Typography variant="h3" gutterBottom display="inline">
                클러스터설정
            </Typography>

            <Divider my={6}/>

            <AntTabs tabs={[
                {label: "영구설정", component: async(() => import("./Permanence"))},
                {label: "임시설정", component: async(() => import("./Temporary"))},
                {label: "기본값", component: async(() => import("./Basic"))},
            ]} />


        </React.Fragment>
    );
}

export default ClusterSettings;
