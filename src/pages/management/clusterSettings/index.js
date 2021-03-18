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
    Typography
} from "@material-ui/core";
import {spacing} from "@material-ui/system";
import AntTabs from "../../../components/AntTabs";
import async from "../../../components/Async";
import {green, orange} from "@material-ui/core/colors";
import {connect, useDispatch} from "react-redux";
import {editClusterFlush, editClusterServerCheck, setClusterServerCheck} from "../../../redux/actions/clusterActions"

const Divider = styled(MuiDivider)(spacing);


function ClusterSettings({serverCheck}) {
    const dispatch = useDispatch()
    const [openServerCheck, setOpenServerCheck] = React.useState(false)


    function handleServerCheck(flag) {
        const enable = flag ? "none" : "all"

        dispatch(editClusterServerCheck(enable))
            .then(() => {
                if (flag) {
                    editClusterFlush()
                }
                dispatch(setClusterServerCheck())
                setOpenServerCheck(false)
            })
    }

    return (
        <React.Fragment>
            <Helmet title="클러스터설정"/>
            <Grid container={true}>
                <Grid item xs={6}>
                    <Typography variant="h3" gutterBottom display="inline">
                        클러스터설정
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box align={"right"}>
                        <Button variant={"outlined"}
                                style={{backgroundColor: green['500'], color: 'white', display: serverCheck ?  "block" : "none"}}
                                size={"small"}
                                onClick={() => handleServerCheck(false)}
                        >
                            클러스터 점검완료
                        </Button>
                        <Button variant={"outlined"}
                                style={{backgroundColor: orange['500'], color: 'white', display: serverCheck ? "none" : "block"}}
                                size={"small"}
                                onClick={() => setOpenServerCheck(true)}
                        >
                            클러스터 점검시작
                        </Button>
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
    serverCheck: store.clusterReducers.serverCheck
}))(ClusterSettings);