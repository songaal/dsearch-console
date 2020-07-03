import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Async from '~/components/Async';
import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import AntTabs from "~/components/AntTabs"
import IndicesSelect from "~/components/IndicesSelect";
import {Divider as MuiDivider, Typography} from "@material-ui/core";
import {useLocation} from "react-router-dom";
import {spacing} from "@material-ui/system";
import {
    setIndexAction,
    setIndexAliasesAction,
    setIndexInfoListAction, setIndexMappingsAction,
    setIndexSettingsAction, setIndexStateAction
} from "../../../redux/actions/indicesActions";

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
    const dispatch = useDispatch()
    const { indices, index } = useSelector(store => ({...store.indicesReducers}))
    const location = useLocation()
    const classes = useStyles();

    useEffect(() => {
        const uuid = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
        const searchIndex = indices.find(obj => obj['uuid'] === uuid)
        if (searchIndex) {
            dispatch(setIndexAction(searchIndex['index']))
        }
    }, [indices])

    useEffect(() => {
        if (index) {
            dispatch(setIndexAliasesAction(index))
            dispatch(setIndexInfoListAction(index))
            dispatch(setIndexSettingsAction(index))
            dispatch(setIndexMappingsAction(index))
            dispatch(setIndexStateAction(index))
        }
    }, [index])

    return (
        <React.Fragment>
            <Helmet title="인덱스"/>

            <IndicesSelect/>

            <Typography variant="h3" gutterBottom display="inline">인덱스</Typography>

            <Divider my={6} />

            <AntTabs tabs={tabs} tabIndex={4} />

        </React.Fragment>
    );
}

export default Index;
