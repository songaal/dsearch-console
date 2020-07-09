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
    Box, Snackbar, Link,
    Table as MuiTable, TableRow, TableCell, TableHead, TableBody,
    TextField as MuiTextField,
    TextareaAutosize as MuiTextareaAutosize,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Grid,
    Button,
    Typography
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
const TextareaAutosize = styled(MuiTextareaAutosize)(spacing);
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
    var productMaker = [];
    var productName = [];
    for(var tokens of result.analyzerTokensMap[item._id + ""]){
        if(tokens.field == 'PRODUCTMAKER'){
            productMaker = tokens.tokens;
        }else if(tokens.field == 'PRODUCTNAME'){
            productName = tokens.tokens;
        }
    }
    return (
        <Table >
            <TableBody>
                <TableRow>
                    <TableCell style={{ width: '100px' }}>ID</TableCell>
                    <TableCell > {item.ID} </TableCell>
                    <TableCell > {item.ID} </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ width: '100px' }}>제조사</TableCell>
                    <TableCell > {item.PRODUCTMAKER} </TableCell>
                    <TableCell > {productMaker.map((token, index) => { return (index === 0 ? token : ", "+ token)}) } </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ width: '100px' }}>상품명</TableCell>
                    <TableCell >{item.PRODUCTNAME} </TableCell>
                    <TableCell >{productName.map((token, index) => {return (index === 0 ? token : ", "+ token)})} </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ width: '100px' }}>간략설명</TableCell>
                    <TableCell > {item.ADDDESCRIPTION} </TableCell>
                    <TableCell > {item.ADDDESCRIPTION} </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ width: '100px' }}>묶음명</TableCell>
                    <TableCell ></TableCell>
                    <TableCell ></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ width: '100px' }}>관련키워드</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ width: '100px' }}>카테고리</TableCell>
                    <TableCell> {item.CATEGORYCODE1} {">"} {item.CATEGORYCODE2} {">"} {item.CATEGORYCODE3}</TableCell>
                    <TableCell> {item.CATEGORYCODE1} {">"} {item.CATEGORYCODE2} {">"} {item.CATEGORYCODE3} </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell >점수</TableCell>
                    <TableCell colSpan={2} >
                        <ScoreTreeView description={item._explanation.description} details={item._explanation.details} expand={expand} nodeToggle={nodeToggle}></ScoreTreeView> 
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
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
    // const [checked, setChecked] = useState(false);
    const [expand, setExpand] = useState([]);
    const [alert, setAlert] = useState(false);

    const handleExpandAll = (event) =>{
        var changeExpand = [];    
        for (var i = 1; i <= ids; i++)
            changeExpand.push(i);
        setExpand(changeExpand)
    }

    const handleFoldAll = (event) =>{
        setExpand([])
    }

    // const handleExpandChange = (event) => {
    //     if(checked){
    //         setExpand([])
    //     } else {
    //         var changeExpand = [];    
    //         for (var i = 1; i <= ids; i++)
    //             changeExpand.push(i);
    //         console.log(changeExpand)
    //         setExpand(changeExpand)
    //     }
    //     setChecked(!checked);
    // }

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

        var jsonData = JSON.parse(aceEditor.current.editor.getValue());
        jsonData.explain = true;
        jsonData.from = 0;
        jsonData.size = 10;

        var data = {};
        data.index = index;
        data.text = JSON.stringify(jsonData);
        dispatch(setDocumentList(data)).then((result) => {
            if( result.payload.Total.value > 0 ) setPageNum(1);
            else setPageNum(0);
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

        var jsonData = JSON.parse(aceEditor.current.editor.getValue());
        jsonData.explain = true;
        jsonData.from = (pageNum - 1) * 10;
        jsonData.size = 10;

        var data = {};
        data.index = index;
        data.text = JSON.stringify(jsonData);
        dispatch(setDocumentList(data));
        setPageNum(pageNum)
    }

    return (
        <Card mb={6}>
            <CardContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12} md={4}>
                                <Box mx={3}>
                                    <IndicesSelect />
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

                        <Grid container>
                            <Grid item xs="12" md="4">
                                <Box mx={3} style={{border: "1px solid silver"}}>
                                    <AceEditor
                                        ref={aceEditor}
                                        id="aceEditor"
                                        mode="json"
                                        theme="kuroir"
                                        name="ace-editor"
                                        fontSize="15px"
                                        height="600px"
                                        width="100%"
                                        placeholder="검색쿼리를 입력해주세요."
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs="12" md="8" >
                                <Box style={{overflow: "scroll", height: "600px", border: "1px solid silver"}} mx={3}>
                                    <RankingTuningResults pageNum={pageNum} result={result} expand={expand} nodeToggle={nodeToggle}/>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                    <Grid container>
                            <Grid item xs={12} md={4}>
                                <Box align="right" mx={3} mt={3}>
                                    <Button variant="outlined" color="primary" onClick={handleSearchQuery}>검색</Button>
                                </Box>
                                <Snackbar open={alert} autoHideDuration={10000} onClose={handleSnackBarClose}>
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
