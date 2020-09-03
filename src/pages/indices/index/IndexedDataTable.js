import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';
import flat from "flat"
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider as MuiDivider,
    FormControl,
    Grid,
    IconButton,
    InputBase,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress
} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {spacing} from "@material-ui/system";
import {
    analyzerDocumentSourceAction,
    setIndexDocumentSourceListAction,
    setIndexMappingsAction
} from "../../../redux/actions/indicesActions";

const useStyles = makeStyles((theme) => ({}));

const Divider = styled(MuiDivider)(spacing);

const rowSizeList = [5, 10, 20]
const idKey = "* ID"
function IndexedDataTable({dispatch, index, mappings}) {
    const classes = useStyles()
    const [keyword, setKeyword] = useState("");
    const [keywordInput, setKeywordInput] = useState("");
    const [columns, setColumns] = useState([]);
    const [from, setFrom] = useState(0);
    const [size, setSize] = useState(5);
    const [dataList, setDataList] = useState([])
    const [totalSize, setTotalSize] = useState(0)
    const [loading, setLoading] = useState(false)

    // 인덱스 변경시 호출
    useEffect(() => {
        setKeyword("")
        setColumns([])
        setFrom(0)
        fetchDocuments({searchKeyword: "", searchFrom: 0})
    }, [index])

    function fetchDocuments({ searchFrom, searchSize, searchKeyword }) {
        setDataList([])
        setLoading(true)
        dispatch(setIndexMappingsAction(index)).then(response => {
            const mappings = response.payload
            let flatMappings = {}
            Object.keys(flat(mappings))
                .forEach(key => {
                    flatMappings[key.replace(/.properties/gi, "")] = flat(mappings)[key]
                })
            return { mappings, flatMappings }
        }).then(payload => {

            let searchColumns = []
            if (/[^0-9]/gi.test(searchKeyword)) {
                // 문자
                const flatMappings = flat(mappings)
                searchColumns = columns.filter(c => ['text','keyword'].includes(flatMappings[`${c}.type`]))
            } else {
                searchColumns = columns
            }

            return dispatch(setIndexDocumentSourceListAction({
                index,
                from: searchFrom||from,
                size: searchSize||size,
                keyword: searchKeyword === undefined ? keyword : searchKeyword,
                columns: searchColumns
            })).then(documents => ({
                ...payload,
                documents: documents
            }))
        }).then(payload => {
            const hits = payload['documents']['hits']['hits']

            if (searchKeyword === undefined || searchKeyword === '') {
                let tmpColumns = {}
                // tmpColumns['ID'] = null
                hits.forEach(hit => {
                    const source = flat(hit['_source'])
                    Object.keys(source).forEach(key => {
                        tmpColumns[key] = null
                    })
                })
                setColumns(Object.keys(tmpColumns))
            }


            let documentAnalyzerMap = {}
            hits.forEach(hit => {
                const id = hit['_id']
                const flatSource = flat(hit['_source'])
                documentAnalyzerMap[id] = []
                Object.keys(flatSource).forEach(flatField => {
                    let analyzer = ""
                    if(payload['flatMappings'][flatField + ".type"] === "text") {
                        analyzer = "standard"
                    }
                    if (payload['flatMappings'][flatField + ".analyzer"]) {
                        analyzer = payload['flatMappings'][flatField + ".analyzer"]
                    }

                    if (analyzer && analyzer !== "") {
                        documentAnalyzerMap[id].push({
                            field: flatField, text: flatSource[flatField], analyzer: analyzer
                        })
                    }
                })
            })
            return {
                ...payload,
                totalSize: payload['documents']['hits']['total']['value'],
                documentAnalyzerMap: documentAnalyzerMap
            }
        }).then(payload => {
            dispatch(analyzerDocumentSourceAction(index, payload['documentAnalyzerMap'])).then(response => {
                let tmpDataList = []
                payload['documents']['hits']['hits'].forEach(hit => {
                    const source = flat(hit['_source'])
                    tmpDataList.push({key: idKey, value: hit['_id'], term: "-"})
                    Object.keys(source).forEach(key => {
                        let term = ""
                        if (response[hit['_id']] && response[hit['_id']].length > 0) {
                            let analyzer = response[hit['_id']].find(obj => obj['field'] === key)
                            if (analyzer && analyzer['term'] && analyzer['term'].length > 0) {
                                term = analyzer['term'].join(", ")
                            }
                        }
                        tmpDataList.push({key: key, value: source[key], term: term})
                    })
                })
                setLoading(false)
                setDataList(tmpDataList)
                setTotalSize(payload['totalSize'])
            })
        }).catch(error => {
            setLoading(false)
            alert("실패." + error)
            console.log('error')
        })
    }

    function handleSizeChange(event) {
        setSize(event.target.value)
        fetchDocuments({searchFrom:0, searchSize: event.target.value})
    }

    function handlePagination(searchFrom) {
        setFrom(searchFrom)
        fetchDocuments({searchFrom:searchFrom})
    }

    function handleChangeKeyword(searchKeyword) {
        setKeyword(searchKeyword)
        setFrom(0)
        fetchDocuments({searchFrom:0, searchKeyword: searchKeyword})
    }
    // 인덱스가 없으면 무시.
    if (!index) return null;

    return (
        <>
            <br/>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={4}>
                            <Box className={classes.form}>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Search"
                                    value={keywordInput}
                                    onChange={event => setKeywordInput(event.target.value)}
                                    onKeyUp={event => {
                                        if (event.keyCode === 13) {
                                            handleChangeKeyword(keywordInput)
                                        }
                                    }}
                                />
                                <IconButton  className={classes.iconButton} onClick={() => handleChangeKeyword(keywordInput)}>
                                    <Search/>
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box align={"center"}>
                                <Button variant={"outlined"}
                                        onClick={() => handlePagination(from - size)}
                                        disabled={from <= 0}
                                >
                                    이전
                                </Button>
                                <Box component={"span"} m={3}>
                                    {
                                        dataList.length > 0 ?
                                            isNaN((from / size) + 1) ? 0 : (from / size) + 1
                                            :
                                            0
                                    }
                                    /
                                    {isNaN(Math.ceil(totalSize / size)) ? 0 : Math.ceil(totalSize / size)}
                                </Box>
                                <Button variant={"outlined"}
                                        onClick={() => handlePagination(from + size)}
                                        disabled={
                                            (isNaN((from / size) + 1) ? 0 : (from / size) + 1)
                                            >=
                                            (isNaN(Math.ceil(totalSize / size)) ? 0 : Math.ceil(totalSize / size))
                                        }
                                >
                                    다음
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box align={"right"}>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={size}
                                        onChange={handleSizeChange}
                                    >
                                        {
                                            rowSizeList.map(num => <MenuItem key={num} value={num}>{num}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>

                    <TableContainer>
                        <Table size={"small"}>
                            <colgroup>
                                <col style={{width:'20%'}}/>
                                <col style={{width:'40%'}}/>
                                <col style={{width:'40%'}}/>
                            </colgroup>
                            <TableHead>
                                <TableRow>
                                    <TableCell>아이디</TableCell>
                                    <TableCell>값</TableCell>
                                    <TableCell>분석결과</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{display: loading ? "table-row-group" : "none"}}>
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Box align={"center"}>
                                            <CircularProgress />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody style={{display: loading ? "none" : "table-row-group"}}>
                                {
                                    dataList.map((data, dataIndex) => {
                                        return (
                                            <TableRow key={`${data['key']}-${dataIndex}`}>
                                                <TableCell>
                                                    {data['key']}
                                                </TableCell>
                                                <TableCell>
                                                    {data['value']}
                                                </TableCell>
                                                <TableCell>
                                                    {data['term']}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <br/>

                    <Grid container>
                        <Grid item xs={12}>
                            <Box align={"center"}>
                                <Button variant={"outlined"}
                                        onClick={() => handlePagination(from - size)}
                                        disabled={from <= 0}
                                >
                                    이전
                                </Button>
                                <Box component={"span"} m={3}>
                                    {
                                        dataList.length > 0 ?
                                            isNaN((from / size) + 1) ? 0 : (from / size) + 1
                                            :
                                            0
                                    }
                                    /
                                    {isNaN(Math.ceil(totalSize / size)) ? 0 : Math.ceil(totalSize / size)}
                                </Box>
                                <Button variant={"outlined"}
                                        onClick={() => handlePagination(from + size)}
                                        disabled={
                                            (isNaN((from / size) + 1) ? 0 : (from / size) + 1)
                                            >=
                                            (isNaN(Math.ceil(totalSize / size)) ? 0 : Math.ceil(totalSize / size))
                                        }
                                >
                                    다음
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}


export default connect(store => ({...store.indicesReducers}))(IndexedDataTable)