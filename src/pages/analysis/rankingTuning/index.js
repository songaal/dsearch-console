import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
// import { NavLink as RouterNavLink} from "react-router-dom";
import Helmet from 'react-helmet';
import { spacing } from "@material-ui/system";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-kuroir";
import {makeStyles} from '@material-ui/core/styles';
import { setDocumentList } from '@actions/rankingTuningActions'

import {
    Box, Link, CircularProgress,
    Table as MuiTable, TableRow, TableCell, TableHead, TableBody,
    TextField, Switch,
    Card as MuiCard,
    CardContent,
    Divider as MuiDivider,
    Grid,
    Button,
    Typography,
    FormControlLabel, Hidden
} from "@material-ui/core";

import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IndicesSelect from "../../../components/IndicesSelect";
import {resetDocumentList} from "../../../redux/actions/rankingTuningActions";

// const NavLink = React.forwardRef((props, ref) => (
//     <RouterNavLink innerRef={ref} {...props} />
// ));

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 250
    }
}));

const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Table = styled(MuiTable)(spacing);

let ids = 1;
const DEFAULT_TEMPLATE = `
{
    "query": {
      "match": {
        "productName": "노트북"
      }
    }
}
`;


const getTreeItemsFromData = treeItems => {
    return treeItems.map(detail => {
      let children = undefined;
      if (detail.details && detail.details.length > 0) {
        children = getTreeItemsFromData(detail.details);
      }
    
      return (
        <TreeItem
          key={ids}
          // nodeId={ids++}
          nodeId={`node${ids++}`}
          label={detail.value + " : " + detail.description}
          children={children}
        />
      );
    });
  };
  

  

function ScoreTreeView({details, expand, nodeToggle, description}) {
    return (
        <TreeView
            defaultExpanded={expand}
            expanded={expand}
            onNodeToggle={nodeToggle}
            style={{ flexGrow: 1 }}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            <TreeItem key={ids} nodeId={`node${ids++}`} label={description}>
                {getTreeItemsFromData(details)}
            </TreeItem>
        </TreeView>
    );
}

function ResultDocument({result, item, expand, nodeToggle}) {
    if(result.SearchResponse.length === 0) return <></>;

    const analyzerTokensMap = result.analyzerTokensMap[item._index]
    let dataList = []

    Object.keys(item).forEach(key => {
        const id = item['_id']
        let text = item[key]
        if ("_explanation" === key || "_id"  === key || "_index" === key) {
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

    return (
        <Table>
            <TableBody>
                {
                    dataList.map((data, index) => {
                        let tokenValue = (data['tokens']||[]).map(t => `"${t}"`).join(", ");
                        let text = JSON.stringify(data['text']);
                        let field = data['field'];
                        return (
                            <TableRow key={"data-" + index}>
                                <TableCell style={{fontWeight: "bold"}}>{field}</TableCell>
                                <TableCell>{text}</TableCell>
                                <TableCell>{tokenValue.length > 0 ? tokenValue : text}</TableCell>
                            </TableRow>
                        )
                    })
                }
                <TableRow>
                    <TableCell>점수</TableCell>
                    <TableCell colSpan={2}>
                         <ScoreTreeView description={item._explanation.description}
                                        details={item._explanation.details}
                                        expand={expand}
                                        nodeToggle={nodeToggle}
                         />
                     </TableCell>
                 </TableRow>
            </TableBody>
        </Table>
    )
}

function RankingTuningResults({pageNum, result, expand, nodeToggle, errorMessage}) {
    ids = 1;

    if (errorMessage.length > 0) {
        return (
            <Table style={{ margin: "9px", overflow: "scroll" }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center"> 오류. </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <pre>
                                {errorMessage}
                            </pre>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )
    } else {
        return (
            <Table style={{ margin: "9px", overflow: "scroll" }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="right"> # </TableCell>
                        <TableCell align="center"> 결과 문서 </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {result.SearchResponse.length !== 0 ?
                        result.SearchResponse.map((item, index) => {
                            let number = index + ((pageNum-1)*10) + 1;
                            // return <></>;
                            return (<TableRow key={"a" + number}>
                                <TableCell style={{fontWeight: "bold"}} align="right">{number}</TableCell>
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
}
let eventCode = null
function RankingTuningCard({dispatch, result, index}) {
    const classes = useStyles()
    const aceEditor = useRef("");
    let inputIndex = useRef('');

    const [pageNum, setPageNum] = useState(0);
    const [progress, setProgress] = useState(false);
    const [expand, setExpand] = useState([]);
    const [checked, setChecked] = useState(false);
    const [autoHeight, setAutoHeight] = useState('600px')
    const [errorMessage, setErrorMessage] = useState('')
    const [query, setQuery] = useState("")

    useEffect(() => {
        dispatch(resetDocumentList())
        setQuery('')
        setPageNum(0)
        setErrorMessage('')
        aceEditor.current.editor.setValue(DEFAULT_TEMPLATE)

        if (eventCode !== null) {
            clearInterval(eventCode)
        }
        eventCode = setInterval(() => {
            let windowHeight = Math.ceil(window.innerHeight * 0.6)
            if (windowHeight < 500) {
                windowHeight = 500
            } else if (windowHeight > 900) {
                windowHeight = Math.ceil(window.innerHeight * 0.8)
            }
            setAutoHeight(windowHeight + "px")
        }, 500)
        return () => {
            if (eventCode !== null) {
                clearInterval(eventCode)
            }
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const handleChecked = (evnet) =>{
        setChecked(!checked);
    }

    const handleExpandAll = (event) =>{
        let changeExpand = [];
        for (let i = 1; i <= ids; i++)
            changeExpand.push(`node${i}`);
        setExpand(changeExpand)
    }

    const handleFoldAll = (event) =>{
        setExpand([])
    }

    function isJson(str) {
        try {
            let json = JSON.parse(str);
            return (typeof json === 'object');
        } catch (e) {
            return false;
        }
    }
    const handleSearchQuery = (event) =>{
        // dispatch(resetDocumentList())
        setPageNum(0)
        setQuery('')
        setErrorMessage('')

        ids = 1;
        if(!isJson(aceEditor.current.editor.getValue())){
            setErrorMessage("올바른 JSON 형식이 아닙니다.")
            return;
        }

        /* 스크롤 top으로 위치 시키기 */
        document.querySelector("#move").scrollTo(0, 0);

        setProgress(true);
        let jsonData = JSON.parse(aceEditor.current.editor.getValue());
        jsonData.explain = true;
        jsonData.from = 0;
        jsonData.size = 10;
        let data = {};

        if(checked){
            data.isMultiple = true;
            data.index = inputIndex.current.value.replace(/ /gi, "");
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
            setQuery(aceEditor.current.editor.getValue())
        }).catch((error)=>{
            setQuery('')
            dispatch(resetDocumentList())
            setPageNum(0);
            setProgress(false);
            try {
                setErrorMessage(error.response.data.message)
            } catch (error1) {
                setErrorMessage(error)
            }
        })
    }

    function nodeToggle(event, expanded) {
        setExpand(expanded)
    }

    function handlePagination(pageNum) {
        // dispatch(resetDocumentList())
        setErrorMessage('')
        ids = 1;
        // if(!isJson(aceEditor.current.editor.getValue())){
        //     setErrorMessage("올바른 JSON 형식이 아닙니다.")
        //     return;
        // }
        document.querySelector("#move").scrollTo(0, 0);
        setProgress(true);
        // let jsonData = JSON.parse(aceEditor.current.editor.getValue());
        let jsonData = Object.assign(JSON.parse(query),{
            explain: true,
            from: ((pageNum - 1) * 10),
            size: 10
        })
        // jsonData.explain = true;
        // jsonData.from = (pageNum - 1) * 10;
        // jsonData.size = 10;

        let data = {};
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
        }).catch((error) => {
            dispatch(resetDocumentList())
            try {
                setErrorMessage(error.response.data.message)
            } catch (error1) {
                setErrorMessage(error)
            }
        })
        setPageNum(pageNum)
    }

    return (
        <Card mb={6}>
            <CardContent>

                <Grid container>
                    <Grid item xs={12} md={12} lg={5}>

                        <Box display="flex"  alignItems="center"  justifyContent="space-between" mx={3} mb={2}>
                            {checked ? <TextField className={classes.formControl} inputRef={inputIndex} label="인덱스를 입력해주세요"/> : <IndicesSelect />}
                            <FormControlLabel
                                style={{whiteSpace: "nowrap"}}
                                control={
                                    <Switch
                                        checked={checked}
                                        onChange={handleChecked}
                                        color="primary"
                                        name="IndexModeSelector"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                }
                                label="직접 입력"
                            />
                        </Box>

                        <Box mx={3} style={{border: "1px solid silver"}}>
                            <AceEditor
                                ref={aceEditor}
                                id="aceEditor"
                                mode="json"
                                theme="kuroir"
                                fontSize="15px"
                                height={autoHeight}
                                width="100%"
                                placeholder="검색쿼리를 입력해주세요."
                                setOptions={{ useWorker: false }}
                            />
                        </Box>

                        <Box align="right" mx={3} mt={3}>
                            {progress? <CircularProgress /> : <Button fullWidth variant="outlined" color="primary" onClick={handleSearchQuery}>검색</Button>}
                        </Box>

                        {/*<Snackbar open={alert} autoHideDuration={5000} onClose={handleSnackBarClose}>*/}
                        {/*    <MuiAlert elevation={6} variant="filled" severity="error">*/}
                        {/*        올바른 형식의 JSON이 아닙니다.*/}
                        {/*    </MuiAlert>*/}
                        {/*</Snackbar>*/}
                    </Grid>
                    <Grid item xs={12} md={12} lg={7}>

                        <Hidden lgUp>
                            <Box mt={10}> </Box>
                        </Hidden>

                        <Box display="flex" alignItems="center"  justifyContent="space-between" mx={3} style={{height: "52px"}}>
                            <Typography variant="h6">총 {result.Total.value ? result.Total.value : "0"}건의 검색결과</Typography>
                            <Box display="flex">
                                <Box m={2}><Link href="#" onClick={handleExpandAll} > + 점수 펼치기 </Link></Box>
                                <Box m={2}><Link href="#" onClick={handleFoldAll}> - 점수 접기 </Link></Box>
                            </Box>
                        </Box>
                        <Box style={{overflow: "scroll", height: autoHeight, border: "1px solid silver"}} mx={3} id="move">
                                <RankingTuningResults pageNum={pageNum} result={result} expand={expand} nodeToggle={nodeToggle} errorMessage={errorMessage}/>
                        </Box>
                        <Box align="center" mx={3} mt={3}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => handlePagination(pageNum - 1)}
                                disabled={pageNum === 0 || pageNum === 1 }
                                > 이전 </Button>
                            <Box component={"span"} m={3}>
                                {pageNum} / {result.Total.value ? ( Math.ceil(Number(result.Total.value) / 10)) : "0" }
                            </Box>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => handlePagination(pageNum + 1)}
                                disabled={pageNum === 0 ? true : Math.ceil(Number(result.Total.value) / 10) === pageNum ? true : false}
                                > 다음 </Button>
                        </Box>
                    </Grid>
                </Grid>












                {/*<Grid container>*/}
                {/*    <Grid item xs={12}>*/}
                {/*        <Grid container>*/}
                {/*            <Grid item xs={12} md={12} lg={4}>*/}
                {/*                <Box display="flex"  alignItems="center"  justifyContent="space-between" mx={3} mb={2}>*/}
                {/*                    {checked ? <TextField className={classes.formControl} inputRef={inputIndex} label="인덱스를 입력해주세요"/> : <IndicesSelect />}*/}
                {/*                    <FormControlLabel*/}
                {/*                        style={{whiteSpace: "nowrap"}}*/}
                {/*                        control={*/}
                {/*                            <Switch*/}
                {/*                                checked={checked}*/}
                {/*                                onChange={handleChecked}*/}
                {/*                                color="primary"*/}
                {/*                                name="IndexModeSelector"*/}
                {/*                                inputProps={{ 'aria-label': 'primary checkbox' }}*/}
                {/*                            />*/}
                {/*                        }*/}
                {/*                        label="직접 입력"*/}
                {/*                    />*/}
                {/*                </Box>*/}
                {/*            </Grid>*/}
                {/*            <Grid item xs={12} md={12} lg={8}>*/}
                {/*            /!* justifyContent="space-between" *!/*/}
                {/*                <Box display="flex" alignItems="center"  justifyContent="space-between" mx={3}>*/}
                {/*                <Typography variant="h6">총 {result.Total.value ? result.Total.value : "0"}건의 검색결과</Typography>*/}
                {/*                <Box display="flex">*/}
                {/*                    <Box m={2}><Link href="#" onClick={handleExpandAll} > + 점수 펼치기 </Link></Box>*/}
                {/*                    <Box m={2}><Link href="#" onClick={handleFoldAll}> - 점수 접기 </Link></Box>*/}
                {/*                </Box>*/}
                {/*                /!* <FormControlLabel */}
                {/*                    control={<Checkbox checked={checked} onChange={handleExpandChange} name="selected" />}*/}
                {/*                    label="펼치기"*/}
                {/*                /> *!/*/}
                {/*                </Box>*/}
                {/*            </Grid>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}

                {/*    <Grid item xs={12}>*/}
                {/*        <Grid container style={{height: autoHeight}}>*/}
                {/*            <Grid item xs={12} md={12} lg={4}>*/}
                {/*                <Box mx={3} style={{border: "1px solid silver"}}>*/}
                {/*                    <AceEditor*/}
                {/*                        ref={aceEditor}*/}
                {/*                        id="aceEditor"*/}
                {/*                        mode="json"*/}
                {/*                        theme="kuroir"*/}
                {/*                        fontSize="15px"*/}
                {/*                        height={autoHeight}*/}
                {/*                        width="100%"*/}
                {/*                        placeholder="검색쿼리를 입력해주세요."*/}
                {/*                        setOptions={{ useWorker: false }}*/}
                {/*                    />*/}
                {/*                </Box>*/}
                {/*            </Grid>*/}
                {/*            <Grid item xs={12} md={12} lg={8}>*/}
                {/*                <Box style={{overflow: "scroll", height: autoHeight, border: "1px solid silver"}} mx={3} id="move">*/}
                {/*                        <RankingTuningResults pageNum={pageNum} result={result} expand={expand} nodeToggle={nodeToggle}/>*/}
                {/*                </Box>*/}
                {/*            </Grid>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}

                {/*    <Grid item xs={12}>*/}
                {/*        <Grid container>*/}
                {/*            <Grid item xs={12} md={4}>*/}
                {/*                <Box align="right" mx={3} mt={3}>*/}
                {/*                    {progress? <CircularProgress /> : <Button variant="outlined" color="primary" onClick={handleSearchQuery}>검색</Button>}*/}
                {/*                </Box>*/}
                {/*                <Snackbar open={alert} autoHideDuration={5000} onClose={handleSnackBarClose}>*/}
                {/*                    <MuiAlert elevation={6} variant="filled" severity="error">*/}
                {/*                        올바른 형식의 JSON이 아닙니다.*/}
                {/*                    </MuiAlert>*/}
                {/*                </Snackbar>*/}
                {/*            </Grid>*/}

                {/*            <Grid item xs={12} md={8}>*/}
                {/*                <Box align="center" mx={3} mt={3}>*/}
                {/*                    <Button */}
                {/*                        variant="outlined" */}
                {/*                        color="primary"*/}
                {/*                        onClick={() => handlePagination(pageNum - 1)}*/}
                {/*                        disabled={pageNum === 0 || pageNum === 1 }*/}
                {/*                        > 이전 </Button>*/}
                {/*                    <Box component={"span"} m={3}>*/}
                {/*                        {pageNum} / {result.Total.value ? ( Math.ceil(Number(result.Total.value) / 10)) : "0" }*/}
                {/*                    </Box>*/}
                {/*                    <Button */}
                {/*                        variant="outlined" */}
                {/*                        color="primary"*/}
                {/*                        onClick={() => handlePagination(pageNum + 1)}*/}
                {/*                        disabled={pageNum === 0 ? true : Math.ceil(Number(result.Total.value) / 10) === pageNum ? true : false}*/}
                {/*                        > 다음 </Button>*/}
                {/*                </Box>*/}
                {/*            </Grid>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
            </CardContent>
        </Card>
    );
}

function RankingTuning({ dispatch, result, index}) {

    useEffect(() => {
        return () => dispatch(resetDocumentList())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <React.Fragment>
            <Helmet title="랭킹튜닝"/>
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
