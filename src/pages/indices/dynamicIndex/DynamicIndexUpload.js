import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {
    Box,
    Button,
    Card,
    CardContent,
    Snackbar,
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-kuroir";
import {setDynamicIndexInfoListActions, setDynamicIndexUploadActions} from '@actions/dynamicIndexInfoActions';

function DynamicIndexUpload({ dispatch, dynamicIndexInfoList }) {
    const aceEditor = useRef(dynamicIndexInfoList);
    const [snackbarFlag, setSnackbarFlag] = useState(false)
    const [message, setMessage] = useState('')
    const [messageStatus, setMessageStatus] = useState("success")
    
    useEffect(() => {
        dispatch(setDynamicIndexInfoListActions()).then(response => {
            aceEditor.current.editor.setValue(JSON.stringify(response.payload, null, 2))
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function isJson(str) {
        try {
            let json = JSON.parse(str);
            return (typeof json === 'object');
        } catch (e) {
            return false;
        }
    }

    function handleUpload() {
        
        setSnackbarFlag(true)
        
        if(!isJson(aceEditor.current.editor.getValue())){
            setMessage("올바른 JSON 형식이 아닙니다.")
            setMessageStatus("error")
            return;
        }

        let body = {
            "dynamic": aceEditor.current.editor.getValue()
        }

        dispatch(setDynamicIndexUploadActions(body)).then(response => {
            if (response.payload == 0) {
                setMessage("업로드 실패했습니다.")
                setMessageStatus("error")
            } else {
                setMessage(response.payload + "개 업로드 하였습니다.")
                setMessageStatus("success")
            }
        })
    }

    return (
        <React.Fragment>
            <br />
            <Card>
                <CardContent>
                    <Box style={{ border: "1px solid silver" }}>
                        <AceEditor
                            ref={aceEditor}
                            id="aceEditor"
                            mode="json"
                            theme="kuroir"
                            fontSize="15px"
                            height={"400px"}
                            tabSize={2}
                            width="100%"
                            setOptions={{ useWorker: false }}

                        />
                    </Box>
                    <Box align="right" mx={3} mt={3}>
                        <Button fullWidth variant="outlined" color="primary" onClick={() => handleUpload()}> 업로드 </Button>
                    </Box>
                    <Snackbar open={snackbarFlag} autoHideDuration={3000} onClose={() => { setSnackbarFlag(false); }}>
                        <MuiAlert elevation={6} variant="filled" severity={messageStatus}> {message} </MuiAlert>
                    </Snackbar>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default connect(store => ({
    dynamicIndexInfoList : store.dynamicIndexReducers.dynamicIndexInfoList
}))(DynamicIndexUpload)