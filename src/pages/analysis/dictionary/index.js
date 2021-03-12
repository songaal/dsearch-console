import React, {useEffect} from "react";
import {connect} from "react-redux";
import Async from '~/components/Async';

import styled from "styled-components";
import Helmet from 'react-helmet';
import {
    Divider as MuiDivider,
    Grid,
    Typography,
    Button,
    Box,
} from "@material-ui/core";
import AntTabs from "~/components/AntTabs"
import {spacing} from "@material-ui/system";
import SearchIcon from '@material-ui/icons/Search';
import {setActiveSettingIndex, setSettings} from "../../../redux/actions/dictionaryActions";
import Settings from "./Settings"
const Divider = styled(MuiDivider)(spacing);

const firstTabs = [
    {icon: (<SearchIcon/>), component: Async(() => import("./Search"), { time: 0 })},
    {label: "개요", component: Async(() => import("./Summary"))},
]

/* 사전 순서 */
    // 사용자
    // 유사어
    // 불용어
    // 분리어
    // 복합명사
    // 단위명
    // 단위명동의어
    // 제조사명
    // 브랜드명
    // 카테고리키워드
    // 영단어
function sortTabs(dictTabs){
    let tabs = [];
    let indexList = [];
    
    console.log(dictTabs.length);

    // 없으면 -1, 있으면 인덱스 위치 반환
    let idx = dictTabs.findIndex(item => item.label == "사용자 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }
    
    idx = dictTabs.findIndex(item => item.label == "유사어 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.label == "분리어 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.label == "영단어 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.label == "단위명 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.label == "단위명동의어 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.label == "불용어 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.label == "제조사명 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.label == "브랜드명 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.label == "카테고리키워드사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }

    idx = dictTabs.findIndex(item => item.label == "복합명사 사전");
    if(idx > -1) {
        tabs.push(dictTabs[idx]); 
        indexList.push(idx);
    }
    
    dictTabs.map((item, index) => {
        let flag = indexList.findIndex(i => i == index);
        if(flag == -1) tabs.push(item);
    })

    console.log("tabs", tabs.length)

    return tabs;
}

function Dictionary({dispatch, authUser, settings, active}) {
    const [openSettings, setOpenSettings] = React.useState(false)
    let secondTabs = sortTabs(settings.map(dictionary => ({label: dictionary.name, component: Async(() =>  import("./WrapperTabPanel") )})));
    let dictTabs = firstTabs.concat(secondTabs)
    // let dictTabs = firstTabs.concat(settings.map(dictionary => ({label: dictionary.name, component: Async(() =>  import("./WrapperTabPanel") )})))
    

    useEffect(() => {
        dispatch(setSettings())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function handleTabChange(index) {
        dispatch(setActiveSettingIndex(index - firstTabs.length))
    }

    return (
        <>
            <Helmet title="사전"/>

            <Grid container>
                <Grid item xs={10}>
                    <Typography variant="h3" gutterBottom display="inline">
                        사전 {openSettings ? "설정" : ""}
                    </Typography>
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