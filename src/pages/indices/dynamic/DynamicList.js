import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {setDynamicInfoBundleListActions,
        setDynamicStatusChangeActions,
        setDynamicStatusInfoActions
} from '@actions/dynamicInfoActions';
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
    descBox: {
        minWidth: 250,
    },
    marginGrid: {
        marginTop: "30px"
    },
    marginBox: {
        marginRight: "7px"
    }
});

function DynamicBox({dispatch, dynamicInfoBundle, classes, rndColor, desc, dynamicState}) {
    return (
        <>
            {Object.values(dynamicInfoBundle).map((dynamicInfo, i) =>
                <Grid item xs={2} key={"bundleBox" + i} className={classes.marginBox}>
                    <DynamicCard dynamicInfo={dynamicInfo}
                                 dispatch={dispatch}
                                 rndColor={rndColor}
                                 desc={desc}
                                 dynamicState={dynamicState}
                    />
                </Grid>
            )}
        </>
    );
}

function DynamicCard({dispatch, dynamicInfo, rndColor, desc, dynamicState}) {
    const [status, setStatus] = React.useState({})
    const [openRemoveModal, setOpenRemoveModal] = useState(false)
    const [statusBtn, setStatusBtn] = useState(false)
    const [openBtn, setOpenBtn] = useState(false)
    const [closeBtn, setCloseBtn] = useState(false)

    useEffect(() => {
        dispatch(setDynamicStatusInfoActions(dynamicInfo['id']))
    }, [desc])

    useEffect(() => {
        Object.keys(dynamicState).map((id) => {
            let dynamicServerState = dynamicState[id]
            if (dynamicServerState['count']) {
                setStatusBtn(true)
                if (dynamicServerState['count'] == 0) {
                    setOpenBtn(true)
                    setCloseBtn(false)
                } else {
                    setOpenBtn(false)
                    setCloseBtn(true)
                }
            } else {
                setStatusBtn(false)
                setOpenBtn(false)
                setCloseBtn(false)
            }
        })

    }, [dynamicState])

    function handleStatus(id) {
        dispatch(setDynamicStatusInfoActions(id)).then(response => {
            setStatus(response.payload)
        }).catch()
        setOpenRemoveModal(true)
    }

    function handleConsume(id, enable) {
        let enableBody = {
            "enable": enable
        }
        dispatch(setDynamicStatusChangeActions(dynamicInfo['id'], enableBody)).then(response => {
            if (response.payload == 200) {
                if (enable == "true") {
                    setCloseBtn(true)
                    setOpenBtn(false)
                } else {
                    setOpenBtn(true)
                    setCloseBtn(false)
                }
            }
        })
    }

    return (
        <Card sx={{ maxWidth: 320 }}>
            <CardHeader
                avatar={
                    <Avatar style={{fontSize: 15, width: 80, height: 25, backgroundColor: rndColor}} variant="square">
                        {desc === "server" ? dynamicInfo['bundleServer'] : dynamicInfo['bundleQueue']}
                    </Avatar>
                }
                title={dynamicInfo['scheme'] + "://" + dynamicInfo['ip'] + ":" + dynamicInfo['port']}
            />
            <CardActions disableSpacing>
                <Button style={{color: statusBtn ? "#1976d2" : "#000000"}} size="small" disabled={!statusBtn} onClick={() => handleStatus(dynamicInfo['id'])}>STATUS</Button>
                <Box marginLeft='auto'>
                    <Button style={{color: openBtn ? "#1976d2" : "#000000"}} size="small" disabled={!openBtn} onClick={() => handleConsume(dynamicInfo['id'], "true")}>OPEN</Button>
                    <Button style={{color: closeBtn ? "#1976d2" : "#000000"}} size="small" disabled={!closeBtn} onClick={() => handleConsume(dynamicInfo['id'], "false")}>CLOSE</Button>
                </Box>
            </CardActions>
            <Dialog open={openRemoveModal} onClose={() => setOpenRemoveModal(!openRemoveModal)}>
                <DialogTitle>QUEUE CONSUME ({dynamicInfo['ip'] + ":" + dynamicInfo['port']})</DialogTitle>
                <DialogContent>
                    <Box style={{fontSize: "1.2em"}}>
                        {Object.keys(status).map((queueName, key) => {

                            if (queueName == 'count') return ;

                            return (
                                <Grid key={key} item xs={4}>
                                    <Box style={{whiteSpace: "nowrap", fontSize: "10px"}}>
                                        {queueName} : {status[queueName]}
                                    </Box>
                                </Grid>
                            )
                        })}
                    </Box>
                </DialogContent>
                <DialogActions disableSpacing>
                    <Box>
                        <Button style={{marginLeft: "2px", fontSize: "5px"}}
                                onClick={() => setOpenRemoveModal(false)}
                                variant="contained"
                        >
                            닫기
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

function DynamicList({dispatch, dynamicInfoBundleList, dynamicState}) {

    const classes = useStyles();
    const color = ['#1b2430', '#1976d2', '#388e3c', '#1976d2', '#3949ab']
    const [desc, setDesc] = React.useState("queue")

    useEffect(() => {
        dispatch(setDynamicInfoBundleListActions())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function handleDesc(desc) {
        let tmp = ""
        if (desc === "queue") {
            tmp = "server"
        } else {
            tmp = "queue"
        }
        dispatch(setDynamicInfoBundleListActions(tmp))
        setDesc(tmp)
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

            <Grid container>
                {Object.keys(dynamicInfoBundleList).sort((a, b) => {
                        if (a > b) return 1;
                        if (a < b) return -1;
                        return 0;
                    }).map((key, i) => {

                        let dynamicInfoBundle = dynamicInfoBundleList[key]

                        let rndColor = "";
                        if (color.length < i) {
                            rndColor = "#" + Math.round(Math.random() * 0xffffff).toString(16)
                        } else {
                            rndColor = color[i]
                        }

                        return (
                            <Grid container item spacing={dynamicInfoBundle.length} key={"bundleList" + i} className={classes.marginGrid}>
                                <DynamicBox
                                    dynamicInfoBundle={dynamicInfoBundle}
                                    dispatch={dispatch}
                                    classes={classes}
                                    rndColor={rndColor}
                                    desc={desc}
                                    dynamicState={dynamicState}
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
    dynamicState: store.dynamicReducers.dynamicState,
    dynamicInfoBundleList: store.dynamicReducers.dynamicInfoBundleList
}))(DynamicList);