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
} from "@material-ui/core";

import { setIndicesAction } from "../../../redux/actions/indicesActions";

const Card = styled(MuiCard)(spacing);
const Table = styled(MuiTable)(spacing);

function DocumentResults({ page, totalPage, errorMessage }) {

    return (
        <Box style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", border: "solid 1px silver"}}>
            <Box style={{ marginLeft: "auto", marginTop: "4px" }} mx={3} mb={2}>
                <Button
                    style={{ marginRight: "4px" }}
                    variant="outlined"
                    color="primary"
                    onClick={() => { }}
                    disabled={page === 0 || page === 1}
                > 이전 </Button>
                <Box component={"span"} m={3}>
                    1 / 1
                    {/* {page} / {totalPage} */}
                </Box>
                <Button
                    style={{ marginLeft: "4px" }}
                    variant="outlined"
                    color="primary"
                    onClick={() => { }}
                    disabled={page === 0 ? true : false}
                > 다음 </Button>
            </Box>
            <Divider />
            <Box style={{overflow: "auto", height: "90%"}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center"> 번호 </TableCell>
                        <TableCell align="center"> 필드 명</TableCell>
                        <TableCell align="center"> 분석 내용 </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell rowSpan={4} style={{fontWeight: "bold", width: "60px"}} padding="none" align="center">1</TableCell>
                        <TableCell align="center" >
                            field1
                        </TableCell>
                        <TableCell align="center" >
                            스마트폰|출시OS: 안드로이드10|화면정보|16.36cm(6.44인치)|S-AMOLED|2400x1080|409ppi|60Hz|20:9|시스템|스냅드래곤712|10nm|램:8GB|내장:128GB|MicroSD|네트워크|LTE-A|Wi-Fi4|블루투스v5.0|나노유심|듀얼유심지원|카메라|후면:4,800만화소+800만화소+200만화소+200만화소|전면:3,200만화소+800만화소|동영상:2160p(UHD),30fps|사운드|3.5mm|스피커:모노(1개)|보안/기능|지문인식(온스크린)|GPS|OTG|배터리|USB타입C|4,500mAh|충전지원$최대33W|규격/모델명|가로:75mm|세로:159.6mm|두께:8.5mm|무게:186.5g|LG U+ 미지원
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" >
                            field2
                        </TableCell>
                        <TableCell align="center" >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" >
                            field3
                        </TableCell >
                        <TableCell align="center" >
                            a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" >
                            field4
                        </TableCell>
                        <TableCell align="center" >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowSpan={4} style={{fontWeight: "bold", width: "60px"}} padding="none" align="center">2</TableCell>
                        <TableCell>
                            field1
                        </TableCell>
                        <TableCell>
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field2
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field3
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field4
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowSpan={4} style={{fontWeight: "bold", width: "60px"}} padding="none" align="center">3</TableCell>
                        <TableCell>
                            field1
                        </TableCell>
                        <TableCell>
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field2
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field3
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field4
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowSpan={4} style={{fontWeight: "bold", width: "60px"}} padding="none" align="center">4</TableCell>
                        <TableCell>
                            field1
                        </TableCell>
                        <TableCell>
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field2
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field3
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field4
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowSpan={4} style={{fontWeight: "bold", width: "60px"}} padding="none" align="center">5</TableCell>
                        <TableCell>
                            field1
                        </TableCell>
                        <TableCell>
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field2
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field3
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field4
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowSpan={4} style={{fontWeight: "bold", width: "60px"}} padding="none" align="center">6</TableCell>
                        <TableCell>
                            field1
                        </TableCell>
                        <TableCell>
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field2
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field3
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field4
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowSpan={4} style={{fontWeight: "bold", width: "60px"}} padding="none" align="center">7</TableCell>
                        <TableCell>
                            field1
                        </TableCell>
                        <TableCell>
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field2
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field3
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field4
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowSpan={4} style={{fontWeight: "bold", width: "60px"}} padding="none" align="center">8</TableCell>
                        <TableCell>
                            field1
                        </TableCell>
                        <TableCell>
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field2
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field3
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field4
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowSpan={4} style={{fontWeight: "bold", width: "60px"}} padding="none" align="center">9</TableCell>
                        <TableCell>
                            field1
                        </TableCell>
                        <TableCell>
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field2
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field3
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field4
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell rowSpan={4} style={{fontWeight: "bold", width: "60px"}} padding="none" align="center">10</TableCell>
                        <TableCell>
                            field1
                        </TableCell>
                        <TableCell>
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field2
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field3
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell >
                            field4
                        </TableCell>
                        <TableCell >
                            a, b, c, d
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </Box>
        </Box>
    )
}

function SearchQueryArea({ dispatch, searchQueryList, indexList }) {
    const [index, setIndex] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [searchQueryName, setSearchQueryName] = useState("");
    
    const [checkBoxList, setCheckBoxList] = useState({});

    const [isOpenSearchQueryLoadModal, setOpenSearchQueryLoadModal] = useState(false)
    const [isOpenSearchQuerySaveModal, setOpenSearchQuerySaveModal] = useState(false)

    const handleCheckBox = (id, checked)=> {
        let checkedList = {};

        Object.values(searchQueryList).map((item, index) => {
            checkedList[item.id] = item.id === id ? checked : false
        })
        
        console.log(checkBoxList, checkedList, id, checked)
        setCheckBoxList(checkedList)
    }

    const saveSearchQuery = (name, index, query) => {
        const searchQuery = {
            name: name,
            index: index,
            query: query
        }

        dispatch(createSearchQuery(searchQuery))
        dispatch(getSearchQueryList())
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
    }

    const deleteSearchQuery = () => {
        let checkedList = Object.keys(checkBoxList).filter(key => checkBoxList[key])
        if(checkedList === null || checkedList === undefined|| checkedList.length === 0) return;
        const checkedId = checkedList[0]
        dispatch(deleteSearchQeury(checkedId))
        dispatch(getSearchQueryList())
        setOpenSearchQueryLoadModal(false)
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
                                        key={item.name} 
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
                    <Button variant="contained" style={{ backgroundColor: "red", color: "white" }} onClick={() => { deleteSearchQuery() }}>삭제</Button>
                    <Button variant="contained" color="default" onClick={() => { setOpenSearchQueryLoadModal(false) }}>닫기</Button>
                </DialogActions>
            </Dialog>

            <Box display="flex" alignItems="center" justifyContent="space-between" mx={3} mb={2}>
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
                    <Button style={{ margin: "2px" }}
                        onClick={() => {
                            setOpenSearchQuerySaveModal(true)
                        }}>
                        쿼리 저장
                    </Button>
                    <Button style={{ margin: "2px" }} onClick={() => { setOpenSearchQueryLoadModal(true) }}>
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
                width="98%"
                height={"90%"}
                tabSize={2}
                setOptions={{ useWorker: false }}
            />
        </Box>
    );
}


function DocumentAnalysisCard({ dispatch, searchQueryList, indexList, analysisResult }) {

    const MAX_WIDTH = 1310;
    const MIN_WIDTH = 420;

    const [leftBoxWidth, setLeftBoxWidth] = useState(655);
    const [rightBoxWidth, setRightBoxWidth] = useState(655);
    const [leftBoxHeight, setLeftBoxHeight] = useState(500);
    const [rightBoxHeight, setRightBoxHeight] = useState(500);
    const [dividerHeight, setDividerHeight] = useState(500);

    return (
        <Card>
            <CardContent style={{
                    width: "100%",
                    height: "100%",
                    overflow: 'auto',
                    display: "flex"
                }}>
                {/* <Box style={{
                    width: "100%",
                    height: "100%",
                    overflow: 'auto',
                    display: "flex"
                }}> */}
                    <Resizable
                        onResizeStop={(e, direction, ref, d) => {
                            const w = leftBoxWidth + d.width
                            if (w > MAX_WIDTH - MIN_WIDTH) {
                                setLeftBoxWidth(MAX_WIDTH - MIN_WIDTH)
                                setRightBoxWidth(MIN_WIDTH)
                            } else if (w < MIN_WIDTH) {
                                setLeftBoxWidth(MIN_WIDTH)
                                setRightBoxWidth(MAX_WIDTH - MIN_WIDTH)
                            } else {
                                setLeftBoxWidth(w)
                                setRightBoxWidth(MAX_WIDTH - w)
                            }

                            setLeftBoxHeight(leftBoxHeight + d.height)
                            setRightBoxHeight(leftBoxHeight + d.height)
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
                        <SearchQueryArea dispatch={dispatch} searchQueryList={searchQueryList} indexList={indexList} />
                    </Resizable>
                    <Divider style={{ height: dividerHeight, margin: "4px" }} orientation="vertical" />
                    <Resizable
                        onResizeStop={(e, direction, ref, d) => {
                            const w = rightBoxWidth + d.width
                            if (w > MAX_WIDTH - MIN_WIDTH) {
                                setRightBoxWidth(MAX_WIDTH - MIN_WIDTH)
                                setLeftBoxWidth(MIN_WIDTH)
                            } else if (w < MIN_WIDTH) {
                                setRightBoxWidth(MIN_WIDTH)
                                setLeftBoxWidth(MAX_WIDTH - MIN_WIDTH)
                            } else {
                                setRightBoxWidth(w)
                                setLeftBoxWidth(MAX_WIDTH - w)
                            }

                            setLeftBoxHeight(rightBoxHeight + d.height)
                            setRightBoxHeight(rightBoxHeight + d.height)
                            setDividerHeight(rightBoxHeight + d.height)
                        }}
                        size={{ width: rightBoxWidth, height: rightBoxHeight }}
                        style={{
                            // border: "solid 1px silver"
                            height: "100%"
                        }}
                        minWidth={MIN_WIDTH + "px"}
                        maxWidth="90%"
                    >
                        <DocumentResults analysisResult={analysisResult} />
                    </Resizable>
                {/* </Box> */}
            </CardContent>
        </Card >
    );
}

function DocumentAnalysis({ dispatch, searchQueryList, indexList }) {

    useEffect(() => {
        dispatch(getSearchQueryList())
        dispatch(setIndicesAction())
    }, [searchQueryList]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <React.Fragment>
            <Helmet title="문서 분석" />
            <Typography variant="h3" gutterBottom display="inline">
                문서 분석
            </Typography>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={12}  >
                    <DocumentAnalysisCard dispatch={dispatch} searchQueryList={searchQueryList} indexList={indexList} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connect(store => ({
    searchQueryList: store.documentAnalysisReducers.searchQueryList,
    indexList: store.indicesReducers.indices
}))(DocumentAnalysis);
