import React, {useEffect} from "react";
import {connect} from "react-redux";
import Async from '~/components/Async';

import styled from "styled-components";
import Helmet from 'react-helmet';
import {Box, Button, Divider as MuiDivider, Grid, Typography,} from "@material-ui/core";
import AntTabs from "~/components/AntTabs"
import {spacing} from "@material-ui/system";
import SearchIcon from '@material-ui/icons/Search';
import {setActiveSettingIndex, setSettings, setRemoteCluster} from "../../../redux/actions/dictionaryActions";
import Settings from "./Settings"

const Divider = styled(MuiDivider)(spacing);

const firstTabs = [
    {icon: (<SearchIcon/>), component: Async(() => import("./Search"), { time: 0 })},
    {label: "개요", component: Async(() => import("./Summary"))},
]
    
function Dictionary({dispatch, authUser, settings, active, totalCount}) {
    const [openSettings, setOpenSettings] = React.useState(false)
    const [remote, setRemote] = React.useState({})
    let dictTabs = firstTabs.concat(
        settings.map(dictionary => ({label: dictionary.name, component: Async(() =>  import("./WrapperTabPanel") )}))
    )

    useEffect(() => {
        dispatch(setSettings())
        dispatch(setRemoteCluster()).then(body => {setRemote(body)})
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function handleTabChange(index) {
        dispatch(setActiveSettingIndex(index - firstTabs.length))
    }

    return (
        <>
            <Helmet title={`사전`}/>

            <Grid container>
                <Grid item xs={10}>
                    <Typography variant="h3" gutterBottom display="inline">
                        사전 {openSettings ? "설정" : ""}
                    </Typography>
                    <Box style={{fontSize: "0.9em"}} mt={3}>
                        {
                            remote['remote'] && remote['remote'] === true ? `사전소스정보: ${remote['host']||""}:${remote['port']||""}` : ""
                        }
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box align={"right"}>
                        <Button color={"primary"} variant={"outlined"} onClick={() => setOpenSettings(!openSettings)}>
                            {
                                openSettings ?
                                    "닫기"
                                    :
                                    "설정"
                            }
                        </Button >
                    </Box>
                </Grid>
            </Grid>

            <Divider my={6}/>

            {
                openSettings ?
                    <Settings />
                    :
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <AntTabs authUser={authUser} tabs={dictTabs} tabIndex={active} onChange={handleTabChange}/>
                        </Grid>
                    </Grid>
            }
        </>
    );
}

export default connect(store => ({ 
    authUser: store.dsearchReducers.authUser,
    settings: store.dictionaryReducers.settings, 
    active: store.dictionaryReducers.active }))(Dictionary);