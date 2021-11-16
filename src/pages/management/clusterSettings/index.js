import React from "react";
import styled from "styled-components";

import Helmet from 'react-helmet';

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider as MuiDivider,
    Grid,
    Typography,
    Snackbar
} from "@material-ui/core";
import {spacing} from "@material-ui/system";
import AntTabs from "../../../components/AntTabs";
import async from "../../../components/Async";
import {green, orange} from "@material-ui/core/colors";
import {connect, useDispatch} from "react-redux";
import MuiAlert from '@material-ui/lab/Alert';
import {editClusterFlush, setClusterServerCheck, editClusterServerCheckAfterScheduleFlush} from "../../../redux/actions/clusterActions"

const Divider = styled(MuiDivider)(spacing);

function ClusterSettings({authUser, serverCheck}) {
    const dispatch = useDispatch()
    const [openServerCheck, setOpenServerCheck] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState("")
    const [alertFlag, setAlertFlag] = React.useState(false)
    const [alertColor, setAlertColor] = React.useState("info");
    

    function handleServerCheck(flag) {
        if (flag) {
            editClusterFlush()
        }
        dispatch(editClusterServerCheckAfterScheduleFlush(flag))
        .then(() => {         
            dispatch(setClusterServerCheck())
            setOpenServerCheck(false)
            setAlertFlag(true)
            setAlertColor("info");
            setAlertMessage("점검 모드가 "+ (flag ? "시작" : "종료") + "되었습니다");
        }).catch(err => {
            setAlertFlag(true)
            setAlertColor("error");
            setAlertMessage(err+"");
        })
    }

    return (
        <React.Fragment>
            <Snackbar open={alertFlag} autoHideDuration={3000} onClose={() => { setAlertFlag(false); setAlertMessage("") }}>
                <MuiAlert elevation={6} variant="filled" severity={alertColor}> {alertMessage} </MuiAlert>
            </Snackbar>
            <Helmet title="클러스터설정"/>
            <Grid container={true}>
                <Grid item xs={6}>
                    <Typography variant="h3" gutterBottom display="inline">
                        클러스터설정
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box align={"right"}>
                        {authUser.role.manage ? <Button variant={"outlined"}
                            style={{ backgroundColor: green['500'], color: 'white', display: serverCheck ? "block" : "none" }}
                            size={"small"}
                            onClick={() => handleServerCheck(false)}
                        >
                            클러스터 점검완료
                        </Button> :
                            <Button variant={"outlined"}
                                style={{ backgroundColor: green['500'], color: 'white', display: serverCheck ? "block" : "none" }}
                                size={"small"}
                                disabled
                            >
                                클러스터 점검완료
                        </Button>}

                        {authUser.role.manage ? <Button variant={"outlined"}
                            style={{ backgroundColor: orange['500'], color: 'white', display: serverCheck ? "none" : "block", disabled: authUser.role.manage }}
                            size={"small"}
                            onClick={() => setOpenServerCheck(true)}
                        >
                            클러스터 점검시작
                        </Button> :
                            <Button variant={"outlined"}
                                disabled
                                style={{ backgroundColor: orange['500'], color: 'white', display: serverCheck ? "none" : "block", disabled: authUser.role.manage }}
                                size={"small"}
                            >
                                클러스터 점검시작
                        </Button>}
                    </Box>
                </Grid>
            </Grid>

            <Divider my={6}/>

            <AntTabs tabs={[
                {label: "기본값", component: async(() => import("./Defaults"))},
                {label: "영구설정", component: async(() => import("./Persistent"))},
                {label: "임시설정", component: async(() => import("./Transient"))},
            ]} />

            <Dialog open={openServerCheck}
                    fullWidth
                    onClose={()=> setOpenServerCheck(false)}
            >
                <DialogTitle>
                    클러스터 점검
                </DialogTitle>
                <DialogContent>
                    <pre>
                        클러스터 점검을 시작하시겠습니까? <br /><br />
                        <span style={{color: "red"}}>
                            * 색인 중인 인덱스가 있는지 확인하세요. <br />
                        </span>
                    </pre>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="default" onClick={() => setOpenServerCheck(false)}>취소</Button>
                    <Button variant="contained" style={{backgroundColor: orange['500'], color: 'white'}} onClick={() => handleServerCheck(true)}>시작</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default connect(store => ({
    authUser: store.dsearchReducers.authUser,
    serverCheck: store.clusterReducers.serverCheck
}))(ClusterSettings);