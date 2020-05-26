import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import AntTabs from "~/components/AntTabs"
import IndicesSelect from "~/components/IndicesSelect";
import IndexedDataPanel from "./IndexedDataPanel"
import SourceDataPanel from "./SourceDataPanel"
import {Divider as MuiDivider, Typography} from "@material-ui/core";

import {spacing} from "@material-ui/system";


const useStyles = makeStyles((theme) => ({}));


const Divider = styled(MuiDivider)(spacing);


const tabs = [
    {label: "기본", component: SourceDataPanel},
    {label: "분석된 색인어", component: IndexedDataPanel},
];


function IndexData() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Helmet title="데이터"/>

            <IndicesSelect/>

            <Typography variant="h3" gutterBottom display="inline">
                데이터
            </Typography>

            <Divider my={6}/>

            <AntTabs tabs={tabs}/>

        </React.Fragment>
    );
}

export default connect(store => ({
    ...store.indicesReducers,
    ...store.indicesIndexDataReducers,
}))(IndexData);
