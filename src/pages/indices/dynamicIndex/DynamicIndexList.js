import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {setDynamicIndexInfoBundleListActions,
        setDynamicIndexStatusChangeActions,
        setDynamicIndexStatusInfoActions,
        setDynamicIndexAllStatusInfoActions
} from '@actions/dynamicIndexInfoActions';
import {
    Box,
    Button,
    CardActions,
    CardHeader,
    Avatar,
    Card as MuiCard,
    Grid as MuiGrid,
    Dialog, DialogActions, DialogContent, DialogTitle
} from "@material-ui/core";
import styled from "styled-components";
import {spacing} from "@material-ui/system";
import {makeStyles} from "@material-ui/core/styles";
import {Cached} from "@material-ui/icons";

const Card = styled(MuiCard)(spacing);
const Grid = styled(MuiGrid)(spacing);

const useStyles = makeStyles({
    marginGrid: {
        marginTop: "15px"
    },
    marginBox: {
        marginTop: "15px",
        marginRight: "7px"
    }
});

function DynamicBox({dispatch, dynamicIndexInfoBundle, classes, rndColor, desc, dynamicIndexAllState, dynamicIndexState}) {
    return (
        <>
            {Object.values(dynamicIndexInfoBundle).map((dynamicIndexInfo, i) =>{
                let dynamicIndexIdState = dynamicIndexAllState[dynamicIndexInfo.id] || {}
                let dynamicIndexStateCount = 0
                if (Object.keys(dynamicIndexIdState).length > 0) {
                    dynamicIndexStateCount = dynamicIndexStateCount.count
                } else {
                    dynamicIndexStateCount = -1
                }
                return (<Grid item xs={2} key={"bundleBox" + i} className={classes.marginBox}>
                    <DynamicCard dynamicIndexInfo={dynamicIndexInfo}
                                 dispatch={dispatch}
                                 rndColor={rndColor}
                                 desc={desc}
                                 dynamicIndexStateCount={dynamicIndexStateCount}
                                 dynamicIndexState={dynamicIndexState}
                    />
                </Grid>)
            }
            )}
        </>
    );
}

function DynamicCard({dispatch, dynamicIndexInfo, rndColor, desc, dynamicIndexStateCount, dynamicIndexState}) {
    const [openStatusModal, setOpenStatusModal] = useState(false)
    const [openCheckModal, setOpenCheckModal] = useState(false)
    const [enable, setEnable] = useState(false)
    const [statusBtn, setStatusBtn] = useState(false)
    const [openBtn, setOpenBtn] = useState(false)
    const [closeBtn, setCloseBtn] = useState(false)

    useEffect(() => {
        if (dynamicIndexStateCount < 0) {
            setStatusBtn(false)
            setOpenBtn(false)
            setCloseBtn(false)
        } else {
            setStatusBtn(true)
            if (dynamicIndexStateCount == 0) {
                setOpenBtn(true)
                setCloseBtn(false)
            } else {
                setOpenBtn(false)
                setCloseBtn(true)
            }
        }
    }, [dynamicIndexStateCount])

    function handleStatus() {
        dispatch(setDynamicIndexStatusInfoActions(dynamicIndexInfo['id']))
        setOpenStatusModal(true)
    }

    function handleConsume(enable) {
        let enableBody = {
            "enable": enable
        }
        dispatch(setDynamicIndexStatusChangeActions(dynamicIndexInfo['id'], enableBody)).then(response => {
            if (response.payload == 200) {
                if (enable) {
                    setCloseBtn(true)
                    setOpenBtn(false)
                } else {
                    setOpenBtn(true)
                    setCloseBtn(false)
                }
            }
        })
        setOpenCheckModal(false)
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar style={{fontSize: 15, width: 80, height: 25, backgroundColor: rndColor}} variant="square">
                        {desc === "server" ? dynamicIndexInfo['bundleServer'] : dynamicIndexInfo['bundleQueue']}
                    </Avatar>
                }
                title={dynamicIndexInfo['scheme'] + "://" + dynamicIndexInfo['ip'] + ":" + dynamicIndexInfo['port']}
            />
            <CardActions disableSpacing>
                <Button style={{color: statusBtn ? "#1976d2" : "#000000"}} size="small" disabled={!statusBtn} onClick={() => handleStatus()}>STATUS</Button>
                <Box marginLeft='auto'>
                    <Button style={{color: openBtn ? "#1976d2" : "#000000"}} size="small" disabled={!openBtn}
                            onClick={() => {
                                setEnable(true)
                                setOpenCheckModal(true)
                            }}>OPEN</Button>
                    <Button style={{color: closeBtn ? "#1976d2" : "#000000"}} size="small" disabled={!closeBtn}
                            onClick={() => {
                                setEnable(false)
                                setOpenCheckModal(true)
                            }}>CLOSE</Button>
                </Box>
            </CardActions>
            <Dialog open={openStatusModal} onClose={() => setOpenStatusModal(!openStatusModal)}>
                <DialogTitle>QUEUE CONSUME ({dynamicIndexInfo['ip'] + ":" + dynamicIndexInfo['port']})</DialogTitle>
                <DialogContent>
                    <Box style={{fontSize: "1.2em"}}>
                        {Object.keys(dynamicIndexState).map((queueName, key) => {

                            if (queueName == 'count') return ;

                            return (
                                <Grid key={key} item xs={4}>
                                    <Box style={{whiteSpace: "nowrap", fontSize: "10px"}}>
                                        {queueName} : {dynamicIndexState[queueName]}
                                    </Box>
                                </Grid>
                            )
                        })}
                    </Box>
                </DialogContent>
                <DialogActions disableSpacing>
                    <Box>
                        <Button style={{marginLeft: "2px", fontSize: "5px"}}
                                onClick={() => setOpenStatusModal(false)}
                                variant="contained"
                        >
                            닫기
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
            <Dialog open={openCheckModal} onClose={() => setOpenCheckModal(!openCheckModal)}>
                <DialogTitle>{dynamicIndexInfo['ip'] + ":" + dynamicIndexInfo['port']}</DialogTitle>
                <DialogContent>
                    <Box> 동적 색인을 {enable ? "OPEN" : "CLOSE" } 하시겠습니까?</Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => handleConsume(enable)}>확인</Button>
                    <Button onClick={() => setOpenCheckModal(false)} variant="contained">닫기</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

function DynamicIndexList({dispatch, dynamicIndexAllState, dynamicIndexState, dynamicIndexInfoBundleList}) {

    const classes = useStyles();
    const color = ['#1b2430', '#1976d2', '#388e3c', '#1976d2', '#3949ab']
    const [desc, setDesc] = React.useState("queue")

    useEffect(() => {
        dispatch(setDynamicIndexInfoBundleListActions())
        dispatch(setDynamicIndexAllStatusInfoActions())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch(setDynamicIndexInfoBundleListActions(desc))
    }, [desc]) // eslint-disable-line react-hooks/exhaustive-deps

    function handleDesc(desc) {
        if (desc === "queue") {
            setDesc("server")
        } else {
            setDesc("queue")
        }
    }

    return (
        <React.Fragment>
            <Box align={"right"} mt={2}>
                <Button variant={"outlined"}
                        color={"primary"}
                        size={"small"}
                        onClick={() => handleDesc(desc)}
                ><Cached/>정렬 변경</Button>
            </Box>

            <Grid container spacing={1}>
                {Object.keys(dynamicIndexInfoBundleList).sort((a, b) => {
                        if (a > b) return 1;
                        if (a < b) return -1;
                        return 0;
                    }).map((key, i) => {

                        let dynamicIndexInfoBundle = dynamicIndexInfoBundleList[key]

                        let rndColor = "";
                        if (color.length < i) {
                            rndColor = "#" + Math.round(Math.random() * 0xffffff).toString(16)
                        } else {
                            rndColor = color[i]
                        }

                        return (
                            <Grid container item spacing={dynamicIndexInfoBundleList.length} key={"bundleList" + i} className={classes.marginGrid}>
                                <DynamicBox
                                    dynamicIndexInfoBundle={dynamicIndexInfoBundle}
                                    dispatch={dispatch}
                                    classes={classes}
                                    rndColor={rndColor}
                                    desc={desc}
                                    dynamicIndexAllState={dynamicIndexAllState}
                                    dynamicIndexState={dynamicIndexState}
                                />
                            </Grid>
                        )
                    }
                )}
            </Grid>
        </React.Fragment>
    )
}

export default connect(store => ({
    dynamicIndexAllState: store.dynamicIndexReducers.dynamicIndexAllState,
    dynamicIndexState: store.dynamicIndexReducers.dynamicIndexState,
    dynamicIndexInfoBundleList: store.dynamicIndexReducers.dynamicIndexInfoBundleList
}))(DynamicIndexList);