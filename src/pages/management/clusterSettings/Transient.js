import React, {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {Box as MuiBox, Button, Card as MuiCard, CardContent, Grid, Typography, Dialog, DialogTitle,DialogContent, DialogActions,
    Checkbox, Snackbar, TextField, TextareaAutosize, Divider} from "@material-ui/core";

import {spacing} from "@material-ui/system";
import {Cached} from "@material-ui/icons";
import {setClusterSettingsAction} from "../../../redux/actions/clusterSettingsActions";
import Loader from "~/components/Loader";

const Card = styled(MuiCard)(spacing);
const Box = styled(MuiBox)(spacing);

function Transient({dispatch, transient, dsearch}) {
    const [data, setData] = useState({})

    const aceEditor = useRef(null);

    useEffect(() => {
        dispatch(setClusterSettingsAction())
    }, [])

    useEffect(() => {
        let settings = {}
        Object.keys(transient).forEach(key => {
            const prefixKey = key.substring(0, key.indexOf("."))
            if (settings[prefixKey] === undefined) {
                settings[prefixKey] = []
            }
            if (transient[prefixKey] && typeof transient[prefixKey] === "object" && transient[prefixKey].length > 0) {
                settings[prefixKey].push({key: key, value: (transient[key] || []).join("\n")})
            } else {
                settings[prefixKey].push({key: key, value: transient[key] || ""})
            }
        })
        setData(settings)
    }, [transient])

    function refresh() {
        setData({})
        dispatch(setClusterSettingsAction())
    }

    // function openModal(flag){
    //     setFlag(flag);
    //     setModalFlag(true);
    // }

    // function closeModal(){
    //     setModalFlag(false);
    // }

    // function isJson(str) {
    //     try {
    //         let json = JSON.parse(str);
    //         return (typeof json === 'object');
    //     } catch (e) {
    //         return false;
    //     }
    // }

    // function changeSettings(){
    //     if(!isJson(aceEditor.current.editor.getValue())){
    //         return ;
    //     }
    //     if(flag == 0) return;

    //     let type = "indexing";
    //     if(flag === -1){
    //         type = "indexing";
    //     }else{
    //         type = "propagate";
    //     }

    //     console.log(type, JSON.parse(aceEditor.current.editor.getValue()));
    //     dispatch(setDsearchSettingsAction(type, JSON.parse(aceEditor.current.editor.getValue())))
    //         .then((res) => {
    //             dispatch(getDsearchSettingsAction())
    //         })
    //         .catch((err) => {console.log(err)})
            
    //     setModalFlag(false);
    // }

    return (
        <React.Fragment>
            <Box align={"right"} mt={2}>
                <Button variant={"outlined"}
                        color={"primary"}
                        size={"small"}
                        onClick={refresh}
                ><Cached/> 설정 리로드</Button>
            </Box>
            {
                Object.keys(data).map((key, index) => {
                    return (
                        <Box key={index} my={3}>
                            <Typography variant={"h5"}>
                                {key.toUpperCase()}
                            </Typography>
                            <Card>
                                <CardContent>
                                    <Grid container spacing={6}>
                                        {
                                            data[key].map(setting => {
                                                return (
                                                    <Grid key={setting['key']} item xs={12} sm={6} md={4} lg={3}>
                                                        <Box align={"center"}>
                                                            <Box style={{fontSize: "0.9em"}}>
                                                                {setting['key']}
                                                            </Box>
                                                            <Box mt={2}>
                                                                {setting['value']}
                                                            </Box>
                                                        </Box>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Box>
                    )
                })
            }
            {/* <Dialog open={modalFlag}
                    fullWidth
                    onClose={() => closeModal()}
            >
                <DialogTitle>
                    {
                        flag === -1 ? "디서치 색인 설정" : "디서치 전파 설정" 
                    }
                </DialogTitle>
                <DialogContent>
                    {
                        <Box style={{ width: "100%" }}>
                            <TextField
                                fullWidth
                                disabled={true} 
                                label={flag === -1 ? "디서치 색인 설정" : "디서치 전파 설정"}
                            />
                            <br />
                            <AceEditor
                                ref={aceEditor}
                                mode="json"
                                theme="kuroir"
                                fontSize="15px"
                                height={"300px"}
                                width="100%"
                                tabSize={2}
                                setOptions={{ useWorker: false }}
                                value={flag === -1 ? JSON.stringify(dsearch["indexing"], null, 2) : JSON.stringify(dsearch["propagate"], null, 2)}
                            />
                        </Box>
                    }
                </DialogContent>
                <DialogActions>
                    <Button variant={"outlined"} color={"primary"} 
                    onClick={() => changeSettings()}
                    >수정</Button>
                    <Button onClick={() => closeModal()}>닫기</Button>
                </DialogActions>
            </Dialog> */}
        </React.Fragment>
    );
}

export default connect(store => ({...store.clusterSettingsReducers}))(Transient);
