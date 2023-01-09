import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {setDynamicIndexInfoBundleListActions,
        setDynamicIndexStatusChangeActions,
        setDynamicIndexAllStatusInfoActions
} from '@actions/dynamicIndexInfoActions';
import {
    Box,
    Button,
    CardActions,
    CardHeader,
    Typography,
    Card as MuiCard,
    Grid as MuiGrid,
    Dialog, DialogActions, DialogContent, DialogTitle, CardContent,
    CircularProgress
} from "@material-ui/core";
import styled from "styled-components";
import {spacing} from "@material-ui/system";
import {makeStyles} from "@material-ui/core/styles";
import {Cached} from "@material-ui/icons";
import {blue, red} from "@material-ui/core/colors";
import {rgba} from "polished";

const Card = styled(MuiCard)(spacing);
const Grid = styled(MuiGrid)(spacing);

const useStyles = makeStyles({
    marginGrid: {
        marginTop: "15px"
    },
    marginBox: {
        marginTop: "10px",
        marginRight: "4px",
        overflow: "auto"
    }
});

function DynamicBox({dispatch, dynamicIndexInfoBundle, classes, rndColor, dynamicIndexAllState}) {
    return (
        <>
            {Object.values(dynamicIndexInfoBundle).map((dynamicIndexInfo, i) =>{
                let dynamicIndexIdState = dynamicIndexAllState[dynamicIndexInfo.id] || {}
                let dynamicIndexStateCount = 0
                if (Object.keys(dynamicIndexIdState).length > 0) {
                    dynamicIndexStateCount = dynamicIndexIdState.count
                } else {
                    dynamicIndexStateCount = -1
                }
                return (<Grid item xs={2} key={"bundleBox" + i} className={classes.marginBox} >
                    <DynamicCard dynamicIndexInfo={dynamicIndexInfo}
                                 dispatch={dispatch}
                                 rndColor={rndColor}
                                 dynamicIndexInfoBundle={dynamicIndexInfoBundle}
                                 dynamicIndexStateCount={dynamicIndexStateCount}
                                 dynamicIndexIdState={dynamicIndexIdState}
                    />
                </Grid>)
            }
            )}
        </>
    );
}

function DynamicCard({dispatch, dynamicIndexInfo, rndColor, dynamicIndexStateCount, dynamicIndexIdState}) {
    const classes = useStyles();
    const [openCheckModal, setOpenCheckModal] = useState(false)
    const [openCircleModal, setOpenCircleModal] = useState(false)
    const [cardDisable, setCardDisable] = useState(false)
    const [enable, setEnable] = useState(false)
    const [openBtn, setOpenBtn] = useState(false)
    const [closeBtn, setCloseBtn] = useState(false)

    useEffect(() => {
        setCardDisable(false)
        if (dynamicIndexStateCount < 0) {
            setOpenBtn(false)
            setCloseBtn(false)
            setCardDisable(false)
        } else {
            setCardDisable(true)
            if (dynamicIndexStateCount == 0) {
                setOpenBtn(true)
                setCloseBtn(false)
            } else {
                setOpenBtn(false)
                setCloseBtn(true)
            }
        }
    }, [dynamicIndexStateCount])

    function handleConsume(enable) {
        let enableBody = {
            "enable": enable
        }
        setOpenCircleModal(true)
        dispatch(setDynamicIndexStatusChangeActions(dynamicIndexInfo['id'], enableBody)).then(response => {
            if (response.payload == 200) {
                dispatch(setDynamicIndexAllStatusInfoActions()).then(response => {
                    if (enable) {
                        setOpenBtn(false)
                        setCloseBtn(true)
                    } else {
                        setOpenBtn(true)
                        setCloseBtn(false)
                    }
                    setOpenCircleModal(false)
                })
            }
        })
        setOpenCheckModal(false)
    }

    return (
        <Card style={{position: "relative", backgroundColor: cardDisable ? "" : rgba(0, 0, 0, 0.5)}}>
            <CircularProgress style={{display: openCircleModal ? "block" : "none", top: "45%", left: "42%", position: "absolute"}}/>
            <CardHeader style={{fontSize: 15, width: "100%", height: 25, backgroundColor: rndColor, color: "white", textAlign: "center"}}
                        title={dynamicIndexInfo['bundleServer'] + " - " + dynamicIndexInfo['bundleQueue']}
            />
            <CardContent>
                <Typography style={{fontSize: 14, fontWeight: "bold"}} >
                    {dynamicIndexInfo['scheme'] + "://" + dynamicIndexInfo['ip'] + ":" + dynamicIndexInfo['port']}
                </Typography>
                <Box className={classes.marginGrid} style={{fontSize: "1.2em"}}>
                    {
                        dynamicIndexStateCount >= 0 ?
                            <Box style={{fontSize: "1.2em"}}>
                                {Object.keys(dynamicIndexIdState).map((queueName, key) => {

                                    if (queueName == 'count') return ;

                                    return (
                                        <Grid key={key} item xs={4}>
                                            <Box style={{whiteSpace: "nowrap", fontSize: "10px"}}>
                                                {queueName} : {dynamicIndexIdState[queueName]}
                                            </Box>
                                        </Grid>
                                    )
                                })}
                            </Box>
                            :
                            <></>
                    }
                </Box>
            </CardContent>
            <CardActions>
                <Box marginLeft='auto'>
                    <Button style={{backgroundColor: openBtn ? blue['200'] : ""}}size="small" disabled={!openBtn} variant="contained"
                            onClick={() => {
                                setEnable(true)
                                setOpenCheckModal(true)
                            }}>ON</Button>
                    <Button style={{backgroundColor: closeBtn ? red['200'] : "", marginLeft: 10}} size="small" disabled={!closeBtn} variant="contained"
                            onClick={() => {
                                setEnable(false)
                                setOpenCheckModal(true)
                            }}>OFF</Button>
                </Box>
            </CardActions>
            <Dialog open={openCheckModal} onClose={() => setOpenCheckModal(!openCheckModal)}>
                <DialogTitle>{dynamicIndexInfo['ip'] + ":" + dynamicIndexInfo['port']}</DialogTitle>
                <DialogContent>
                    <Box> 동적 색인을 {enable ? "ON" : "OFF" } 하시겠습니까?</Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => handleConsume(enable)} style={{backgroundColor: enable ? blue['200'] : red['200'] }}>
                        {enable ? "ON" : "OFF" }
                    </Button>
                    <Button onClick={() => setOpenCheckModal(false)} variant="contained">닫기</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

function DynamicIndexList({dispatch, dynamicIndexAllState, dynamicIndexInfoBundleList}) {

    const classes = useStyles();
    const color = ['#1b2430', '#1976d2', '#388e3c', '#1976d2', '#3949ab']
    const [refDynamicIndexAllState, setRefDynamicIndexAllState] = useState(dynamicIndexAllState)

    useEffect(() => {
        dispatch(setDynamicIndexInfoBundleListActions())
        dispatch(setDynamicIndexAllStatusInfoActions())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setRefDynamicIndexAllState(dynamicIndexAllState)
    }, [dynamicIndexAllState])

    /*useEffect(() => {
        dispatch(setDynamicIndexAllStatusInfoActions())
    }, [refDynamicIndexAllState]) // eslint-disable-line react-hooks/exhaustive-deps*/

    function handleRefresh() {
        dispatch(setDynamicIndexAllStatusInfoActions())
    }

    return (
        <React.Fragment>
            <Box align={"right"} mt={2}>
                <Button variant={"outlined"}
                        color={"primary"}
                        size={"small"}
                        onClick={() => handleRefresh()}
                ><Cached/> Consume Status Update</Button>
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
                                    dynamicIndexAllState={refDynamicIndexAllState}
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
    dynamicIndexInfoBundleList: store.dynamicIndexReducers.dynamicIndexInfoBundleList
}))(DynamicIndexList);