import React, {useEffect, useState, useRef} from "react";
import { connect } from "react-redux";
import {
    Box, CircularProgress,
    Card,
    CardContent,
    Button, Grid,
    Checkbox, Snackbar,FormControlLabel,
    FormControl, InputLabel, MenuItem, Select, Typography
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-kuroir";
import { setPipelineAction, setPipelineList, getPipeline, getPipelineDetail } from '@actions/pipelineActions'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 250
    }
}));

const aceEditorTemplate = {
    "docs": [
      {
        "_source": {
          "field1": "<h1>hello world</h1>",
          "field2": "<h2>hello world</h2>",
          "field3": "<h3>hello world</h3>"
        }
      }
    ]
  }

function TestPipeline({ dispatch, pipeline, pipelineList}) {
    const classes = useStyles()
    const aceEditor = useRef(aceEditorTemplate);
    const [checked, setChecked] = useState(false);
    const [progress, setProgress] = useState(false);
    const [result, setResult] = useState({});
    const [snackbarFlag, setSnackbarFlag] = useState(false)

    const handleChange = (event) => {
        dispatch(setPipelineAction(event.target.value))
    };

    useEffect(() => {
        dispatch(setPipelineList())
    }, [])

    function isJson(str) {
        try {
            let json = JSON.parse(str);
            return (typeof json === 'object');
        } catch (e) {
            return false;
        }
    }

    function handleTest(){
        if( pipeline.length === 0 ){
            setSnackbarFlag(true)
            return;
        }

        if( JSON.stringify(aceEditor.current.editor.getValue()).length > 0 && isJson(aceEditor.current.editor.getValue())){
            setProgress(true)
            if( checked ){
                dispatch(getPipelineDetail(pipeline, aceEditor.current.editor.getValue()))
                .then((result) => {
                    setProgress(false)
                    setResult(result.payload);
                })
                .catch((error) => {
                    setProgress(false)
                })
            }else{
                dispatch(getPipeline(pipeline, aceEditor.current.editor.getValue())) 
                .then((result) => {
                    setProgress(false)
                    setResult(result.payload);
                })
                .catch((error) => {
                    setProgress(false)
                })
            }
        } else {
            setSnackbarFlag(true)
        }
    }

    return (
        <React.Fragment>
            <br />
            <Card>
                <CardContent>
                    <Box>
                        <Grid container>
                            <Grid item xs={12} md={12} lg={5}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" mx={3} mb={2}>
                                    <FormControl className={classes.formControl} >
                                        <InputLabel id="pipeline-select">파이프라인</InputLabel>
                                        <Select
                                            labelId="pipeline-select"
                                            id="pipeline-select"
                                            value={pipeline}
                                            onChange={handleChange}
                                        >
                                            {
                                                pipelineList === null || pipelineList === undefined || Object.keys(pipelineList).length == 0 ?
                                                    <></>
                                                    : Object.keys(pipelineList).sort().map((p, i) => (<MenuItem key={i} value={p}>{p}</MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>

                                    <FormControlLabel
                                        control={<Checkbox checked={checked} onChange={() => {setChecked(!checked)}} name="자세히" />}
                                        label="자세히"
                                    />
                                </Box>
                                <Box mx={3} style={{ border: "1px solid silver" }}>
                                    <AceEditor
                                        ref={aceEditor}
                                        id="aceEditor"
                                        mode="json"
                                        theme="kuroir"
                                        fontSize="15px"
                                        height={"400px"}
                                        tabSize={2}
                                        defaultValue={JSON.stringify(aceEditorTemplate, null, 2) }
                                        // placeholder={JSON.stringify(aceEditorPlaceHolder, null, 2) }
                                        width="100%"
                                        setOptions={{ useWorker: false }}
                                    />
                                </Box>
                                <Box align="right" mx={3} mt={3}>
                                    {progress? <CircularProgress /> : <Button fullWidth variant="outlined" color="primary" onClick={() => handleTest()}> 테스트 </Button>}
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={12} lg={7}>
                                <Box display="flex" alignItems="center" justifyContent="center" mx={3} mb={8}>
                                    <Typography color={"textPrimary"} variant="h6" >파이프라인 테스트 결과</Typography>
                                </Box>
                                <Box style={{ overflow: "scroll", border: "1px solid silver" }} mx={3} id="move">
                                    <pre style={{height:"400px", width:"100%", fontFamily: "godic", fontSize:"15px"}}>
                                        {JSON.stringify(result).length === 2 ? "입력한 내용이 없습니다." : JSON.stringify(result,null,2)}
                                    </pre>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Snackbar open={snackbarFlag} autoHideDuration={3000} onClose={() => { setSnackbarFlag(false); }}>
                        <MuiAlert elevation={6} variant="filled" severity="error"> {"인덱스를 선택하였는지 혹은 json 을 제대로 입력하였는지 확인해주세요"} </MuiAlert> 
                    </Snackbar>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default connect(store => ({
    authUser: store.dsearchReducers.authUser,
    pipelineList: store.pipelineReducers.pipelineList,
    pipeline: store.pipelineReducers.pipeline,
    result: store.pipelineReducers.result
}))(TestPipeline)