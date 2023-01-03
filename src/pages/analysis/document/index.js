import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet';
import { spacing, width } from "@material-ui/system";
import AceEditor from "react-ace";
import { connect } from "react-redux";
import { Resizable } from 're-resizable';
import {
    analyzeDocument,
    analyzeDocumentDetail,
    createSearchQuery,
    deleteSearchQeury,
    getSearchQueryList,
} from "../../../redux/actions/documentAnalysisActions";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-kuroir";

import {
    Divider,
    Box,
    Button,
    Card as MuiCard,
    CardContent,
    Grid,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    FormControl,
    Typography,
    InputLabel,
    MenuItem,
    Select,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox,
    CircularProgress,
} from "@material-ui/core";

import { setIndicesAction } from "../../../redux/actions/indicesActions";

const Card = styled(MuiCard)(spacing);
const Table = styled(MuiTable)(spacing);

function DocumentResults({ dispatch, analysisData, analysisDataDetail, leftBoxHeight}) {
    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)
    const [detailModal, setDetailModal] = useState(false)

    useEffect(() => {
        let calcMaxPage = parseInt(Object.keys(analysisData["analysis"]).length / 10) + (Object.keys(analysisData["analysis"]).length % 10 >= 1 ? 1 : 0);
        setMaxPage(calcMaxPage)
        if (calcMaxPage > 0) setPage(1)
        else if(!calcMaxPage ) setPage(0)
    }, [analysisData])
    
    const getAnalyzedDocumentDetail = (event) => {
        let data = {
            index: analysisData["index"],
            docId: event.target.id
        }
        dispatch(analyzeDocumentDetail(data))
        setDetailModal(true)
    }

    return (
        <Box style={{ width: "100%", display: "flex", flexDirection: "column"}}>
            <Dialog
                fullWidth={true}
                open={detailModal}
                maxWidth={"lg"}
                onClose={() => { setDetailModal(false) }} >
                <DialogTitle id="dialog-title">{"문서 분석 디테일"}</DialogTitle>
                <DialogContent style={{ overflow: "auto" }} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" > 필드 명</TableCell>
                                <TableCell align="center" > 문서 내용 </TableCell>
                                <TableCell align="center" > 분석 내용 </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(analysisDataDetail).sort().map((fieldName) => {
                                return (
                                <TableRow hover key={fieldName}>
                                    <TableCell style={{width: "10%"}}>{fieldName}</TableCell>
                                    <TableCell style={{width: "40%"}}>{analysisDataDetail[fieldName]['document']}</TableCell>
                                    <TableCell style={{width: "50%"}}>{analysisDataDetail[fieldName]['documentTermVectors']}</TableCell>
                                </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="default" onClick={() => { setDetailModal(false) }}>닫기</Button>
                </DialogActions>
            </Dialog>

            <Box style={{ marginLeft: "auto", marginTop: "4px" }} mx={3} mb={2}>
                <Button
                    style={{ marginRight: "4px" }}
                    variant="outlined"
                    color="primary"
                    onClick={() => { 
                        setPage(page - 1);
                    }}
                    disabled={page <= 1}
                > 이전 </Button>
                <Box component={"span"} m={3}>
                    {page} / {maxPage}
                </Box>
                <Button
                    style={{ marginLeft: "4px" }}
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        setPage(page + 1);
                    }}
                    disabled={page === maxPage}
                > 다음 </Button>
            </Box>
            <Divider />
            <Box style={{overflow: "auto", height: leftBoxHeight - 60 }}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"> 번호 </TableCell>
                            <TableCell align="center"> 필드 명</TableCell>
                            <TableCell align="center"> 분석 내용 </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { analysisData["isSuccess"] === false ?  
                            <TableRow>
                                <TableCell colSpan={3} style={{textAlign: "center"}}> 데이터가 없거나 인덱스 분석기 및 쿼리를 확인해주세요 </TableCell>
                            </TableRow>
                        :
                            Object.keys(analysisData["analysis"]).sort().slice((page-1)* 10, page * 10).map((id, numOfId) => {
                                return Object.keys(analysisData["analysis"][id]).sort().map((fieldName, index) => {
                                    return (
                                        <TableRow key={fieldName + "_" + id}>
                                                {index === 0 ? 
                                                    <TableCell
                                                        id={id}
                                                        className={id}
                                                        onMouseOver={() => { 
                                                            for(var i = 0 ;i < document.getElementsByClassName(id).length; i++){
                                                                document.getElementsByClassName(id).item(i).style.backgroundColor = "#ebedf0"
                                                            }
                                                        }}
                                                        onMouseOut={() => { 
                                                            for(var i = 0 ;i < document.getElementsByClassName(id).length; i++){
                                                                document.getElementsByClassName(id).item(i).style.backgroundColor = ""
                                                            }
                                                        }}
                                                        onClick={(event) => { 
                                                            getAnalyzedDocumentDetail(event)
                                                        }}
                                                        rowSpan={Object.keys(analysisData["analysis"][id]).length} 
                                                        style={{fontWeight: "bold", width: "60px"}} 
                                                        padding="none"
                                                        align="center">{numOfId+1 + ((page-1)*10)}</TableCell> 
                                                    : <></> }
                                                <TableCell align="center" className={id} >
                                                    {fieldName}
                                                </TableCell>
                                                <TableCell align="center" className={id}>
                                                    {analysisData["analysis"][id][fieldName]['documentTermVectors']}
                                                </TableCell>
                                            </TableRow>)
                                        }
                                    )
                            })
                        }
                    </TableBody>
                </Table>
            </Box>
        </Box>
    )
}

function SearchQueryArea({ dispatch, searchQueryList, indexList, leftBoxHeight, analysisData }) {
    const [index, setIndex] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [searchQueryName, setSearchQueryName] = useState("");
    const [progress , setProgress] = useState(false)
    const [delProgress , setDelProgress] = useState(false)

    
    const [checkBoxList, setCheckBoxList] = useState({});

    const [isOpenSearchQueryLoadModal, setOpenSearchQueryLoadModal] = useState(false)
    const [isOpenSearchQuerySaveModal, setOpenSearchQuerySaveModal] = useState(false)

    useEffect(() => {
        setProgress(false)
    }, [analysisData])

    const uncheckedAllCheckBox = () => {
        let checkedList = {};

        Object.values(searchQueryList).map((item, index) => {
            checkedList[item.id] = false
        })
        
        setCheckBoxList(checkedList)
    }

    const handleCheckBox = (id, checked)=> {
        let checkedList = {};

        Object.values(searchQueryList).map((item, index) => {
            checkedList[item.id] = item.id === id ? checked : false
        })
        
        setCheckBoxList(checkedList)
    }

    const saveSearchQuery = (name, index, query) => {
        const searchQuery = {
            name: name,
            index: index,
            query: query
        }

        dispatch(createSearchQuery(searchQuery))
        setTimeout(() => {dispatch(getSearchQueryList())}, 1000) 
    }

    const loadSearchQuery = () => {
        let checkedList =  Object.keys(checkBoxList).filter(key => checkBoxList[key]);
        if(checkedList === null || checkedList === undefined|| checkedList.length === 0) return;
        const checkedId = checkedList[0]
        const target = Object.values(searchQueryList).filter(item => item.id === checkedId)[0]
        setIndex(target.index);
        setSearchQueryName(target.name);
        setSearchQuery(target.query);
        setOpenSearchQueryLoadModal(false)
        uncheckedAllCheckBox()
    }

    const deleteSearchQuery = () => {
        let checkedList = Object.keys(checkBoxList).filter(key => checkBoxList[key])
        if(checkedList === null || checkedList === undefined|| checkedList.length === 0) return;
        const checkedId = checkedList[0]
        dispatch(deleteSearchQeury(checkedId))
        setDelProgress(true)
        setTimeout(() => {
            dispatch(getSearchQueryList())
            setDelProgress(false)
            // setOpenSearchQueryLoadModal(false)
        }, 1000) 
        uncheckedAllCheckBox()
    }

    const analyzeSearchQueryDocument = () => {
        let data = {
            name: searchQueryName,
            index: index,
            query: searchQuery
        }

        dispatch(analyzeDocument(data))
        setProgress(true)
        uncheckedAllCheckBox()
    }

    return (
        <Box style={{height: "100%"}}>
            <Dialog
                open={isOpenSearchQuerySaveModal}
                onClose={() => { setOpenSearchQuerySaveModal(false) }} >
                <DialogTitle id="dialog-title">{"쿼리 저장"}</DialogTitle>
                <DialogContent
                    style={{ minWidth: "500px", minHeight: "300px", display: "flex", flexDirection:"column" }}>
                    <TextField label="쿼리 이름" size="small" variant="outlined" value={searchQueryName} onChange={(event) => {setSearchQueryName(event.target.value)}} />
                    <Divider style={{marginTop: "8px", marginBottom: "8px"}}/>
                    인덱스 명: <b>{index}</b>
                    <Divider style={{marginTop: "8px"}}/>
                    <pre>{searchQuery}</pre>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" 
                        color="primary"
                        onClick={() => {
                            saveSearchQuery(searchQueryName, index, searchQuery)
                            setOpenSearchQuerySaveModal(false)
                        }}>저장</Button>
                    <Button variant="contained" color="default" onClick={() => { setOpenSearchQuerySaveModal(false) }}>닫기</Button>
                </DialogActions>
            </Dialog>

            <Dialog 
                open={isOpenSearchQueryLoadModal} 
                onClose={() => { setOpenSearchQueryLoadModal(false) }} >
                <DialogTitle id="dialog-title">{"쿼리 불러오기"}</DialogTitle>
                <DialogContent>
                <FormGroup>
                    {
                        Object.values(searchQueryList).sort((a, b) => {
                            if (a.id > b.id) return 1
                            if (a.id < b.id) return -1
                            return 0;
                        }).map((item, index) => {
                            return <FormControlLabel 
                                        key={item.id} 
                                        control={
                                            <Checkbox size="small" 
                                                id={item.id} 
                                                checked={checkBoxList[item.id] || false} 
                                                onChange={(event) => { 
                                                    handleCheckBox(event.target.id, event.target.checked)
                                            }} />
                                        } 
                                        label={item.name} />
                        })
                    }
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="primary" onClick={() => { loadSearchQuery() }}>불러오기</Button>
                    {
                        delProgress 
                            ? <CircularProgress></CircularProgress> 
                            : <Button variant="contained" style={{ backgroundColor: "red", color: "white" }} onClick={() => { deleteSearchQuery() }}>삭제</Button>
                    }
                    <Button variant="contained" color="default" onClick={() => { setOpenSearchQueryLoadModal(false) }}>닫기</Button>
                </DialogActions>
            </Dialog>

            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <FormControl style={{ minWidth: "250px" }}>
                    <InputLabel id="index-select">인덱스 명</InputLabel>
                    <Select
                        labelId="index-select-btn"
                        id="index-select-btn"
                        value={index}
                        onChange={(event) => {
                            setIndex(event.target.value)
                        }}
                        
                    >
                        {
                            indexList === null || indexList === undefined || Object.values(indexList).length === 0 ?
                                <MenuItem></MenuItem>
                                : Object.values(indexList).filter(item => !item.index.startsWith('.')).sort((a, b) => {
                                    if (a.index > b.index) return 1
                                    if (a.index < b.index) return -1
                                    return 0
                                }).map((indexInfo, i) => (<MenuItem key={indexInfo.uuid} value={indexInfo.index}>{indexInfo.index}</MenuItem>))
                        }
                    </Select>
                </FormControl>

                <Box display="flex" alignItems="center" justifyContent="space-between" style={{minWidth: "150px"}}>
                    {
                        progress ? 
                            <CircularProgress /> : 
                            <Button variant="contained" color="primary" style={{ margin: "2px" }} size="small"
                                onClick={() => {
                                    analyzeSearchQueryDocument()
                                }}>
                                    쿼리 실행
                                </Button>
                    }
                    <Button variant="outlined" color="primary" style={{ margin: "2px" }} size="small"
                        onClick={() => {
                            setOpenSearchQuerySaveModal(true)
                        }}>
                        쿼리 저장
                    </Button>
                    <Button variant="outlined" size="small" color="secondary" style={{ marginLeft: "2px" }} onClick={() => { setOpenSearchQueryLoadModal(true) }}>
                        쿼리 불러오기
                    </Button>
                </Box>
            </Box>
            <AceEditor
                onChange={(newValue) => {
                    setSearchQuery(newValue)
                }}
                value={searchQuery}
                id="aceEditor"
                mode="json"
                theme="kuroir"
                fontSize="14px"
                width="100%"
                height={(leftBoxHeight - 60) + "px"}
                tabSize={2}
                setOptions={{ useWorker: false }}
            />
        </Box>
    );
}


function DocumentAnalysisCard({ dispatch, searchQueryList, indexList, analysisData, analysisDataDetail}) {

    const MAX_WIDTH = 1310;
    const MIN_WIDTH = 500;

    const [leftBoxWidth, setLeftBoxWidth] = useState(655);
    const [leftBoxHeight, setLeftBoxHeight] = useState(500);
    const [dividerHeight, setDividerHeight] = useState(500);

    return (
        <Card>
            <CardContent style={{
                    width: "100%",
                    height: "100%",
                    overflow: 'auto',
                    display: "flex"
                }}>
                    <Resizable
                        onResizeStop={(e, direction, ref, d) => {
                            const w = leftBoxWidth + d.width 
                            if (w > MAX_WIDTH ) {
                                setLeftBoxWidth(MAX_WIDTH )
                            } else if (w < MIN_WIDTH) {
                                setLeftBoxWidth(MIN_WIDTH)
                            } else {
                                setLeftBoxWidth(w)
                            }

                            setLeftBoxHeight(leftBoxHeight + d.height)
                            setDividerHeight(leftBoxHeight + d.height)
                        }}
                        size={{ width: leftBoxWidth, height: leftBoxHeight }}
                        style={{
                            // border: "solid 1px silver",
                            height: "100%"
                        }}
                        minWidth={MIN_WIDTH + "px"}
                        maxWidth="90%"
                    >
                        <SearchQueryArea dispatch={dispatch} searchQueryList={searchQueryList} indexList={indexList} leftBoxHeight={leftBoxHeight} analysisData={analysisData} />
                    </Resizable>
                    <Divider style={{ height: dividerHeight, margin: "4px" }} orientation="vertical" />
                    <Box width={"100%"} height="100%">
                        <DocumentResults dispatch={dispatch} analysisData={analysisData} leftBoxHeight={leftBoxHeight} analysisDataDetail={analysisDataDetail}/>
                    </Box>
            </CardContent>
        </Card >
    );
}

function DocumentAnalysis({ dispatch, searchQueryList, indexList, analysisData, analysisDataDetail}) {

    useEffect(() => {
        dispatch(getSearchQueryList())
        dispatch(setIndicesAction())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <React.Fragment>
            <Helmet title="문서 분석" />
            <Typography variant="h3" gutterBottom display="inline">
                문서 분석
            </Typography>

            <Divider my={6}  />

            <Grid container spacing={6}>
                <Grid item xs={12} >
                    <DocumentAnalysisCard dispatch={dispatch} searchQueryList={searchQueryList} indexList={indexList} analysisData={analysisData} analysisDataDetail={analysisDataDetail} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connect(store => ({
    analysisDataDetail: store.documentAnalysisReducers.analysisDataDetail,
    analysisData: store.documentAnalysisReducers.analysisData,
    searchQueryList: store.documentAnalysisReducers.searchQueryList,
    indexList: store.indicesReducers.indices
}))(DocumentAnalysis);