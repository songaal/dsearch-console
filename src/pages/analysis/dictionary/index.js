import React, {useEffect} from "react";
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
import {setActiveSettingIndex, setSettings} from "../../../redux/actions/dictionaryActions";

const Divider = styled(MuiDivider)(spacing);

const firstTabs = [
    {icon: (<SearchIcon/>), component: Async(() => import("./Search"), { time: 0 })},
    {label: "개요", component: Async(() => import("./Summary"))},
]

function Dictionary({dispatch, authUser, settings, active}) {
    let dictTabs = firstTabs.concat(settings.map(dictionary => ({label: dictionary.name, component: Async(() =>  import("./WrapperTabPanel") )})))

    useEffect(() => {
        dispatch(setSettings())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function handleTabChange(index) {
        dispatch(setActiveSettingIndex(index - firstTabs.length))
    }

    return (
        <>
            <Helmet title="사전"/>
            <Typography variant="h3" gutterBottom display="inline">
                사전
            </Typography>
            <Divider my={6}/>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <AntTabs authUser={authUser} tabs={dictTabs} tabIndex={active} onChange={handleTabChange}/>
                </Grid>
            </Grid>
        </>
    );
}

export default connect(store => ({ 
    authUser: store.dsearchReducers.authUser,
    settings: store.dictionaryReducers.settings, 
    active: store.dictionaryReducers.active }))(Dictionary);