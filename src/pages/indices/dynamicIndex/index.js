import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import Helmet from 'react-helmet';
import Async from '~/components/Async';
import AntTabs from "~/components/AntTabs"
import {Divider as MuiDivider, Typography} from "@material-ui/core";
import {spacing} from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);

function Dynamic({dispatch}) {
    return (
        <React.Fragment>
            <Helmet title="Dynamic"/>

            <br/>

            <Typography variant="h3"
                        display="inline"
            >
                동적 색인
            </Typography>

            <Divider my={6}/>

            <AntTabs tabs={[
                {label: "목록", component: Async(() => import("./DynamicIndexList"))},
                {label: "저장", component: Async(() => import("./DynamicIndexUpload"))}
            ]} />

        </React.Fragment>
    );
}

export default connect(store => ({
}))(Dynamic);

