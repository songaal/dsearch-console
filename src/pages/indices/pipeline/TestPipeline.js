import React, {useEffect, useState, useRef} from "react";
import { connect } from "react-redux";
import {
    Box, CircularProgress,
    Card,
    CardContent,
    Button,Hidden,
    Table,
    TableHead,
    TableRow,
    TableCell, Link,
    TableBody, Grid,
    Checkbox, Snackbar,FormControlLabel,
    FormControl, InputLabel, MenuItem, Select, Typography
} from "@material-ui/core";
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


function TestPipeline({ dispatch, pipeline, pipelineList, result}) {
    const classes = useStyles()
    const aceEditor = useRef(null);
    const [checked, setChecked] = useState(false);

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
        if( pipeline.length == 0 ){
            return;
        }
        if( JSON.stringify(aceEditor.current.editor.getValue()).length > 0 && isJson(aceEditor.current.editor.getValue())){
            if( checked ){
                dispatch(getPipelineDetail(pipeline, aceEditor.current.editor.getValue())) 
            }else{
                dispatch(getPipeline(pipeline, aceEditor.current.editor.getValue())) 
            }
            
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
                                                pipelineList == null || pipelineList == undefined || Object.keys(pipelineList).length == 0 ?
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
                                        height={"500px"}
                                        tabSize={2}
                                        width="100%"
                                        setOptions={{ useWorker: false }}
                                    />
                                </Box>
                                <Box align="right" mx={3} mt={3} align={"center"}>
                                    <Button fullWidth variant="outlined" color="primary" onClick={() => handleTest()}> 테스트 </Button>
                                    {/* {progress? <CircularProgress /> : <Button fullWidth variant="outlined" color="primary" onClick={handleSearchQuery}>검색</Button>} */}
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={12} lg={7}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" mx={3} mb={3}>
                                    <br />
                                    <br />
                                </Box>
                                <Box style={{ overflow: "scroll", border: "1px solid silver" }} mx={3} id="move">
                                    <pre style={{height:"500px", width:"100%"}}>
                                        {JSON.stringify(result,null,2)}
                                    </pre>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
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