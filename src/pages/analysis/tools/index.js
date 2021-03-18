import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import Helmet from 'react-helmet';
import {makeStyles} from '@material-ui/core/styles';
import {actionAnalyzer, actionPlugin, setAnalyzerList, setPluginList} from '@actions/toolsActions'

import {
    Box,
    Button,
    Card as MuiCard,
    CardContent,
    Checkbox,
    Divider as MuiDivider,
    FormControl,
    FormControlLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField as MuiTextField,
    Typography,
} from "@material-ui/core";

import {spacing} from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 250
    },
    select: { minWidth: 120, marginLeft: theme.spacing(1), flex: 1, borderBottom: "1px solid gray", '&:hover': { borderBottom: "1px solid black" } },
}));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const TextField = styled(MuiTextField)(spacing);


function BriefResult({resultBrief}){
    let total = [];
    if(resultBrief.tokens){
        for(let i = 0; i < resultBrief.tokens.length; i++){
            if(i % 5 === 0){
                total.push([]);
            }
            total[total.length-1].push(resultBrief.tokens[i].token)
        }
    }
    
    return <Table>
                <colgroup>
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                </colgroup>
                <TableBody>
                {total.length > 0 ?
                    total.map((listItem, listItemIndex) => {
                        return (<TableRow hover key={listItemIndex}>
                            {listItem.map((item) => { return <TableCell> {item}</TableCell> })}
                        </TableRow>)
                    })
                    : <TableRow hover key={"nothing"}><TableCell>{"검색된 결과가 없습니다"}</TableCell></TableRow>}
                    </TableBody>
        </Table>;
}

function DetailResult({resultDetail}){

    if(!resultDetail.result){
        return <Table key="empltyDetail">
            <TableBody>
            <TableRow>
                <TableCell>{"검색된 결과가 없습니다."}</TableCell>
            </TableRow>
            </TableBody>
        </Table>
    }
    
    return (<Table key="detailResult">
        <TableBody>
        <TableRow hover>
            <TableCell>
                <Typography variant="h4">1. {resultDetail.result[2].key}</Typography>
                    <br />
                    <div dangerouslySetInnerHTML={ {__html: resultDetail.result[2].value} }></div>
                </TableCell>
        </TableRow>
        <TableRow hover>
            <TableCell>
                <Typography variant="h4" >2. {resultDetail.result[3].key}</Typography>
                <br />
                <div dangerouslySetInnerHTML={ {__html: resultDetail.result[3].value} }></div>
            </TableCell>
        </TableRow>
        <TableRow hover>
            <TableCell>
                <Typography variant="h4">3. {resultDetail.result[4].key}</Typography>
                <br />
                <div dangerouslySetInnerHTML={ {__html: resultDetail.result[4].value} }></div>
            </TableCell>
        </TableRow>
        <TableRow hover>
            <TableCell>
            <Typography variant="h4">4. {resultDetail.result[5].key}</Typography>
            <br />
                <div dangerouslySetInnerHTML={ {__html: resultDetail.result[5].value} }></div>
            </TableCell>
        </TableRow>
        <TableRow hover>
            <TableCell>
                <Typography variant="h4">5. {resultDetail.result[6].key}</Typography>
                <br />
                <div dangerouslySetInnerHTML={ {__html: resultDetail.result[6].value} }></div>
            </TableCell>
        </TableRow>
        <TableRow hover>
            <TableCell>
                <Typography variant="h4">6. {resultDetail.result[7].key}</Typography>
                <br />
                <div dangerouslySetInnerHTML={ {__html: resultDetail.result[7].value} }></div>
            </TableCell>
        </TableRow>
        </TableBody>
    </Table>
    );
}

function ToolsCard({dispatch, analyzerList, pluginList, resultBrief, resultDetail}) {
    const [selectedItem, setSelectedItem] = useState("EMPTY");
    const [toolsTypeAction, setToolsTypeAction] = useState("detail")
    const classes = useStyles()
    const [state, setState] = useState(true);
    const [detailPluginList, setDetailPluginList] = useState(((pluginList||{})['plugins']||[]));

    useEffect(() => {
        if(toolsTypeAction === 'detail') {
            setDetailPluginList(((pluginList||{})['plugins']||[]))
            if(detailPluginList.length > 0 )setSelectedItem(detailPluginList[0])
        }
    }, [toolsTypeAction, pluginList, detailPluginList])

    let index2AnalyzerList = []
    if (analyzerList !== undefined && analyzerList !== null) {
        Object.keys(analyzerList).filter(analyzerKey => !analyzerKey.startsWith(".")).map(analyzerKey => {
            const analysis = analyzerList[analyzerKey].settings.index.analysis;
            if (analysis !== undefined && analysis.analyzer !== undefined) {
                Object.keys(analysis.analyzer).map(analyzer => index2AnalyzerList.push(analyzerKey + "/" + analyzer))
            }
            return <></>;
        })
    }

    const handleChange = (event) => {
        if(toolsTypeAction === 'brief'){
            if (((pluginList||{})['plugins']||[]).length !== 0) {
                setSelectedItem(((pluginList||{})['plugins']||[])[0])
            } else {
                setSelectedItem("EMPTY")
            }
            dispatch(setAnalyzerList())
        }else{
            if (index2AnalyzerList.length !== 0) {
                setSelectedItem(index2AnalyzerList[0])
            } else {
                setSelectedItem("EMPTY")
            }
            dispatch(setPluginList())
        }
        setToolsTypeAction(event.target.value)
    };


    const handleSelectedItemChange = (event) =>{
        setSelectedItem(event.target.value)
    }

    const handleToolsClick = () =>{
        let analyzer_contents = document.getElementById("analyzer_contents");
        let analyzer_select = document.getElementById("analyzer_select");
        let data = {};
        if(toolsTypeAction === 'brief') {
            let split = analyzer_select.innerHTML.split('/');
            if (split && split.length === 2) {
                let index = split[0].replace(' ', '');
                let analyzer = split[1].replace(' ', '');
                data.text = analyzer_contents.value;
                data.analyzer = analyzer
                dispatch(actionAnalyzer(index, data)).catch((error) =>{console.log(error)});
            } else {
                console.error('err', split)
            }
        }else {
            let plugin = analyzer_select.innerHTML
            plugin = plugin.replace(/ /gi, "");

            data.useForQuery = state;
            data.plugin = plugin;
            data.text = analyzer_contents.value;
            dispatch(actionPlugin(data));
        }
    }
    return (
        <Card mb={6}>
            <CardContent>
                <TextField id="analyzer_contents" label="분석할 내용을 입력해 주세요." variant="outlined" fullWidth onKeyPress={ (e) => { if (e.key === 'Enter') handleToolsClick();}}> </TextField>
                <Box display="flex" alignItems="center" justifyContent="left" >
                    <Box p={3}>
                        <FormControl>
                            <RadioGroup value={toolsTypeAction} row onChange={handleChange} >
                                <FormControlLabel value="brief" control={<Radio size="small" />} label="간략" />
                                <FormControlLabel value="detail" control={<Radio size="small" />} label="상세" />
                                {toolsTypeAction === 'brief' ? <></> :  
                                    <FormControlLabel control={ <Checkbox checked={state} onClick={() => {setState(!state)}}/> } label="쿼리용도" />
                                }
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box p={3}>
                        <FormControl className={classes.formControl}>
                            {/* <InputLabel>분석 도구 선택</InputLabel> */}
                            <Select id="analyzer_select" 
                                value={selectedItem} 
                                onChange={handleSelectedItemChange}
                                defaultValue=""
                                displayEmpty
                                >
                                    {
                                        toolsTypeAction === "brief" ?
                                        index2AnalyzerList.length === 0 ?
                                            <MenuItem key={"no"} selected={true} disabled={true} value="EMPTY"> 분석기가 없습니다. </MenuItem>
                                            :
                                            index2AnalyzerList.map((item, index) => {
                                                if(index === 0) {
                                                    return <MenuItem key={item} selected={true} value={item}> {item} </MenuItem>;
                                                }else{
                                                    return <MenuItem key={item} value={item}> {item} </MenuItem>;
                                                }
                                            })
                                        :
                                        detailPluginList.length === 0 ?
                                        <MenuItem key={"no"} selected={true} disabled={true} value="EMPTY"> 분석기가 없습니다. </MenuItem>
                                        :
                                        detailPluginList.map((item, index) => {
                                            if(index === 0) {
                                                return <MenuItem key={item} selected={true} value={item}> {item} </MenuItem>;
                                            }else{
                                                return <MenuItem key={item} value={item}> {item} </MenuItem>;
                                            }
                                        }) 
                                        // ((pluginList||{})['plugins']||[]).length === 0 ?
                                        //     <MenuItem key={"no"} selected={true} disabled={true} value="EMPTY"> 분석기가 없습니다. </MenuItem>
                                        //     :
                                        //     ((pluginList||{})['plugins']||[]).map((item, index) => {
                                        //         if(index === 0) {
                                        //             return <MenuItem key={item} selected={true} value={item}> {item} </MenuItem>;
                                        //         }else{
                                        //             return <MenuItem key={item} value={item}> {item} </MenuItem>;
                                        //         }
                                        //     })
                                    }
                            </Select>
                        </FormControl>
                    </Box>
                    <Button variant="outlined" color="secondary" onClick={handleToolsClick}>
                        분석
                    </Button>
                </Box>

                <Box m={2}>
                    <Typography variant="h4" display="inline" >분석 결과</Typography>
                </Box>
                <Box p={2}>
                    {toolsTypeAction === 'brief' ? <BriefResult resultBrief={resultBrief} /> :  <DetailResult resultDetail={resultDetail}/>}
                </Box>
            </CardContent>
        </Card>
    );
}

function Tools({ dispatch, analyzerList, pluginList, resultBrief, resultDetail }) {
    useEffect(() => {
        dispatch(setAnalyzerList())
        dispatch(setPluginList())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <React.Fragment>
            <Helmet title="분석도구"/>
            <Typography variant="h3" display="inline">
                분석도구
            </Typography>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <ToolsCard dispatch={dispatch} analyzerList={analyzerList} pluginList={pluginList}  resultBrief={resultBrief} resultDetail={resultDetail} onClick={() => console.log("click")} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connect(store => ({
    pluginList: store.toolsReducers.pluginList,
    analyzerList: store.toolsReducers.analyzerList,
    resultBrief : store.toolsReducers.resultBrief,
    resultDetail : store.toolsReducers.resultDetail
}))(Tools);
