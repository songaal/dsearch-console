import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import Helmet from 'react-helmet';
import { spacing } from "@material-ui/system";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-kuroir";

import { setDocumentList } from '@actions/rankingTuningActions'
import MuiAlert from '@material-ui/lab/Alert';
import {
    Box, Snackbar, Link, CircularProgress,
    Table as MuiTable, TableRow, TableCell, TableHead, TableBody,
    TextField, Switch,
    TextareaAutosize as MuiTextareaAutosize,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Grid,
    Button,
    Typography,
    Zoom
} from "@material-ui/core";

import { TreeView, TreeItem, ToggleButton } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IndicesSelect from "../../../components/IndicesSelect";

const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));


const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Table = styled(MuiTable)(spacing);

var ids = 1;

const getTreeItemsFromData = treeItems => {
    return treeItems.map(detail => {
      let children = undefined;
      if (detail.details && detail.details.length > 0) {
        children = getTreeItemsFromData(detail.details);
      }
    
      return (
        <TreeItem
          key={ids}
          nodeId={ids++}
          label={detail.value + " : " + detail.description}
          children={children}
        />
      );
    });
  };
  

function ScoreTreeView({details, expand, nodeToggle, description}) {
    return (
        <TreeView
            defaultExpanded
            id="treeview"
            expanded={expand}
            onNodeToggle={nodeToggle}
            style={{ flexGrow: 1 }}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            <TreeItem key={ids} nodeId={ids++} label={description}>
                {getTreeItemsFromData(details)}
            </TreeItem>
        </TreeView>
    );
}

function ResultDocument({result, item, expand, nodeToggle}) {
    const analyzerTokensMap = result.analyzerTokensMap[item._index]
    let dataList = []


    Object.keys(item).forEach(key => {
        const id = item['_id']
        let text = item[key]
        if ("_explanation" === key) {
            return true;
        }
        
        if (analyzerTokensMap[id] !== undefined) {
            const analyzerFieldList = analyzerTokensMap[id]
            const analyzerTokens = analyzerFieldList.find(obj => obj['field'] === key)
            if (analyzerTokens !== undefined && analyzerTokens['tokens'] !== undefined && analyzerTokens['tokens'] !== null && analyzerTokens['tokens'].length > 0) {
                dataList.push({
                    field: key,
                    text: text,
                    tokens: analyzerTokens['tokens']
                  })
            } else {
                dataList.push({
                    field: key,
                    text: text,
                    tokens: []
                })
            }
        } else {
            dataList.push({
                field: key,
                text: text,
                tokens: []
            })
        }
    })
    console.log("dataList >> ", dataList)

    return (
        <Table>
            <TableBody>
                {
                    dataList.map(data => {
                        return (
                            <TableRow>
                                <TableCell>{data['field']}</TableCell>
                                <TableCell>{data['text']}</TableCell>
                                <TableCell>{data['tokens'].join(", ")}</TableCell>
                            </TableRow>
                        )
                    })
                }
                <TableRow>
                    <TableCell>점수</TableCell>
                    <TableCell colSpan={2}>
                         <ScoreTreeView description={item._explanation.description} details={item._explanation.details} expand={expand} nodeToggle={nodeToggle}></ScoreTreeView> 
                     </TableCell>
                 </TableRow>
            </TableBody>
        </Table>
    )
}

function RankingTuningResults({pageNum, result, expand, nodeToggle}) {
    ids = 1;
    return (
        <Table style={{ margin: "9px", overflow: "scroll" }}>
            <TableHead>
                <TableRow>
                    <TableCell align="right"> # </TableCell>
                    <TableCell align="center"> 결과 문서 </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {result.SearchResponse.length > 0 ? 
                    result.SearchResponse.map((item, index) => {
                        var number = index + ((pageNum-1)*10) + 1;
                        return (<TableRow >
                            <TableCell align="right">{number}</TableCell>
                            <TableCell >
                                <ResultDocument result={result} item={item} expand={expand} nodeToggle={nodeToggle}/>
                            </TableCell>
                        </TableRow>);
                    })
                : <TableRow>
                    <TableCell align="right"></TableCell>
                    <TableCell align="center">
                        <Typography>현재 검색된 결과가 없습니다.</Typography>
                    </TableCell>
                </TableRow>
                }
            </TableBody>
        </Table>
    );
}

function RankingTuningCard({dispatch, result, index}) {
    var aceEditor = useRef("");
    const [pageNum, setPageNum] = useState(0);
    const [progress, setProgress] = useState(false);
    const [expand, setExpand] = useState([]);
    const [checked, setChecked] = useState(false);
    const [alert, setAlert] = useState(false);
    const [autoHeight, setAutoHeight] = useState(600)
    var inputIndex = useRef('');

    // useEffect(() => {
    //     let windowHeight = window.innerHeight  - 150
    //     if (windowHeight < 500) {
    //         windowHeight = 500
    //     }
    //     setAutoHeight(windowHeight)
    // }, [])

    const handleChecked = (evnet) =>{
        setChecked(!checked);
    }

    const handleExpandAll = (event) =>{
        var changeExpand = [];    
        for (var i = 1; i <= ids; i++)
            changeExpand.push(i);
        setExpand(changeExpand)
    }

    const handleFoldAll = (event) =>{
        setExpand([])
    }

    function isJson(str) {
        try {
            var json = JSON.parse(str);
            return (typeof json === 'object');
        } catch (e) {
            return false;
        }
    }
    const handleSearchQuery = (event) =>{
        ids = 1;
        if(!isJson(aceEditor.current.editor.getValue())){
            setAlert(true);
            return;
        }
        setProgress(true);
        var jsonData = JSON.parse(aceEditor.current.editor.getValue());
        jsonData.explain = true;
        jsonData.from = 0;
        jsonData.size = 10;
        var data = {};

        if(checked){
            data.isMultiple = true;
            data.index = inputIndex.current.value;
            data.text = JSON.stringify(jsonData);
        } else {
            data.isMultiple = true;
            data.index = index;
            data.text = JSON.stringify(jsonData);
        }

        dispatch(setDocumentList(data)).then((result) => {
            if( result.payload.Total.value > 0 ) setPageNum(1);
            else setPageNum(0);
            setProgress(false);
        })
    }

    const handleSnackBarClose = (event) =>{
        setAlert(false);
    }

    function nodeToggle(event, expanded) {
        setExpand(expanded)
    }

    function handlePagination(pageNum) {
        
        ids = 1;
        if(!isJson(aceEditor.current.editor.getValue())){
            setAlert(true);
            return;
        }
        setProgress(true);
        var jsonData = JSON.parse(aceEditor.current.editor.getValue());
        jsonData.explain = true;
        jsonData.from = (pageNum - 1) * 10;
        jsonData.size = 10;

        var data = {};
        if(checked){
            data.isMultiple = true;
            data.index = inputIndex.current.value;
        }else{
            data.isMultiple = true;
            data.index = index;
        }
        
        data.text = JSON.stringify(jsonData);
        dispatch(setDocumentList(data)).then(() => {
            setProgress(false);
        });
        setPageNum(pageNum)
    }

    return (
        <Card mb={6}>
            <CardContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12} md={4}>
                                <Box display="flex"  alignItems="center"  justifyContent="space-between" mx={3}>
                                    {checked ? <TextField style={{width:"250px"}} inputRef={inputIndex} label="인덱스를 입력해주세요"/> : <IndicesSelect />}
                                    <Switch
                                        checked={checked}
                                        onChange={handleChecked}
                                        color="primary"
                                        name="IndexModeSelector"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={8}>
                            {/* justifyContent="space-between" */}
                                <Box display="flex" alignItems="center"  justifyContent="space-between" mx={3}>
                                <Typography variant="h6">총 {result.Total.value ? result.Total.value : "0"}건의 검색결과</Typography>
                                <Box display="flex">
                                    <Box m={2}><Link href="#" onClick={handleExpandAll} > + 점수 펼치기 </Link></Box>
                                    <Box m={2}><Link href="#" onClick={handleFoldAll}> - 점수 접기 </Link></Box>
                                </Box>
                                {/* <FormControlLabel 
                                    control={<Checkbox checked={checked} onChange={handleExpandChange} name="selected" />}
                                    label="펼치기"
                                /> */}
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>

                        <Grid container style={{height: autoHeight + "px"}}>
                            <Grid item xs="12" md="4">
                                <Box mx={3} style={{border: "1px solid silver"}}>
                                    <AceEditor
                                        ref={aceEditor}
                                        id="aceEditor"
                                        mode="json"
                                        theme="kuroir"
                                        name="ace-editor"
                                        fontSize="15px"
                                        height={autoHeight + "px"}
                                        width="100%"
                                        placeholder="검색쿼리를 입력해주세요."
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs="12" md="8" >
                                <Box style={{overflow: "scroll", height: autoHeight + "px", border: "1px solid silver"}} mx={3}>
                                        <RankingTuningResults pageNum={pageNum} result={result} expand={expand} nodeToggle={nodeToggle}/>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                    <Grid container>
                            <Grid item xs={12} md={4}>
                                <Box align="right" mx={3} mt={3}>
                                    {progress? <CircularProgress /> : <Button variant="outlined" color="primary" onClick={handleSearchQuery}>검색</Button>}
                                </Box>
                                <Snackbar open={alert} autoHideDuration={5000} onClose={handleSnackBarClose}>
                                    <MuiAlert elevation={6} variant="filled" severity="error">
                                        올바른 형식의 JSON이 아닙니다.
                                    </MuiAlert>
                                </Snackbar>
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <Box align="center" mx={3} mt={3}>
                                    <Button 
                                        variant="outlined" 
                                        color="primary"
                                        onClick={() => handlePagination(pageNum - 1)}
                                        disabled={pageNum === 0}
                                        > 이전 </Button>
                                    <Box component={"span"} m={3}>
                                        {pageNum} / {result.Total.value ? ( Math.ceil(Number(result.Total.value) / 10)) : "0" }
                                    </Box>
                                    <Button 
                                        variant="outlined" 
                                        color="primary"
                                        onClick={() => handlePagination(pageNum + 1)}
                                        disabled={pageNum === 0? true : Math.ceil(Number(result.Total.value) / 10) === pageNum ? true : false}
                                        > 다음 </Button>
                                </Box>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

function RankingTuning({ dispatch, result, index}) {
    useEffect(() => {
        dispatch(setDocumentList())
    }, [])

    return (
        <React.Fragment>
            <Helmet title="Blank" />
            <Typography variant="h3" gutterBottom display="inline">
                랭킹튜닝
            </Typography>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={12}  >
                    <RankingTuningCard dispatch={dispatch} result={result} index={index} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connect(store => ({
    result: store.rankingTuningReducers.result,
    index: store.indicesReducers.index
}))(RankingTuning);
