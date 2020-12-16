import React from "react";
import styled from "styled-components";
// import {NavLink as RouterNavLink} from "react-router-dom";
import {connect} from "react-redux";
import Helmet from 'react-helmet';
import Async from '~/components/Async';
import AntTabs from "~/components/AntTabs"
import {Divider as MuiDivider, Grid, Typography,} from "@material-ui/core";
import {spacing} from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);

function Pipeline({dispatch}) {

    return (
        <React.Fragment>
            <Helmet title="PipeLine"/>
            <Typography variant="h3" gutterBottom display="inline">파이프라인</Typography>
            <Divider my={6}/>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                <AntTabs tabs={[
                        {label: "목록", component: Async(() => import("./Summary"))},
                        {label: "테스트", component: Async(() => import("./TestPipeline"))}
                    ]} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connect(store => ({
}))(Pipeline);

