import React from "react";
import styled from "styled-components";

import Helmet from 'react-helmet';

import {Divider as MuiDivider, Typography} from "@material-ui/core";
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
                {label: "기본값", component: async(() => import("./Defaults"))},
                {label: "영구설정", component: async(() => import("./Persistent"))},
                {label: "임시설정", component: async(() => import("./Transient"))},
            ]} />


        </React.Fragment>
    );
}

export default ClusterSettings;
