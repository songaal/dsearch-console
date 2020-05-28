import React, {useEffect, useState, useRef} from "react";
import {connect, useSelector, useStore} from "react-redux";
import {
    Box,
    Card,
    CardContent, FormControl,
    Grid,
    IconButton,
    Button,
    InputBase, InputLabel, MenuItem, Select,
    Table,
    TableBody,
    TableCell as MuiTableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import styled from "styled-components";
import {spacing, palette} from "@material-ui/system";
import {setIndicesDataAction} from "../../../redux/actions/indicesIndexDataActions";

const TableCell = styled(MuiTableCell)(spacing, palette)
const useStyles = makeStyles((theme) => ({}));


function IndexedDataPanel({dispatch, index}) {
    const classes = useStyles()
    const [id, setId] = useState("");
    const [pageNum, setPageNum] = useState(0);
    const [rowSize, setRowSize] = useState(15);
    const [lastPageNum, setLastPageNum] = useState(0);
    const [fields, setFields] = useState([])
    const [dataList, setDataList] = useState([])
    const [analyzeTermMap, setAnalyzeTermMap] = useState({})

    // 인덱스 변경시 호출
    useEffect(() => {
        setId("")
        setPageNum(0)
        setLastPageNum(0)
        dispatch(setIndicesDataAction({
            index, id: "", pageNum: 0, rowSize
        })).then(store => store.payload).then(result => {
            setFields(result['fields'])
            setDataList(result['hits'])
            setLastPageNum(result['lastPageNum'])
            setAnalyzeTermMap(result['analyzeDocumentTermMap'])
        }).catch(error => console.error(error))
    }, [index])

    // 인덱스가 없으면 무시.
    if (!index) return;

    function handlePagination(pageNum) {
        setPageNum(pageNum)
        dispatch(setIndicesDataAction({
            index, id, pageNum: pageNum, rowSize
        })).then(store => store.payload).then(result => {
            setFields(result['fields'])
            setDataList(result['hits'])
            setLastPageNum(result['lastPageNum'])
            setAnalyzeTermMap(result['analyzeDocumentTermMap'])
        }).catch(error => console.error(error))
    }

    function handleIdChange(event) {
        setId(event.target.value)
        setPageNum(0)
        dispatch(setIndicesDataAction({
            index, id: event.target.value, pageNum, rowSize
        })).then(store => store.payload).then(result => {
            setFields(result['fields'])
            setDataList(result['hits'])
            setLastPageNum(result['lastPageNum'])
            setAnalyzeTermMap(result['analyzeDocumentTermMap'])
        }).catch(error => console.error(error))
    }

    function handleRowSizeChange(event) {
        setRowSize(event.target.value)
        setPageNum(0)
        dispatch(setIndicesDataAction({
            index, id, pageNum, rowSize: event.target.value
        })).then(store => store.payload).then(result => {
            setFields(result['fields'])
            setDataList(result['hits'])
            setLastPageNum(result['lastPageNum'])
            setAnalyzeTermMap(result['analyzeDocumentTermMap'])
        }).catch(error => console.error(error))
    }

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
                                    placeholder="ID"
                                    value={id}
                                    onChange={handleIdChange}
                                />
                                <IconButton className={classes.iconButton} aria-label="search">
                                    <Search/>
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box align={"center"}>
                                <Button variant={"outlined"}
                                        onClick={() => handlePagination(pageNum - 1)}
                                        disabled={pageNum === 0}
                                >
                                    이전
                                </Button>
                                <Box component={"span"} m={3}>
                                    {lastPageNum === 0 ? 0 : pageNum + 1} / {lastPageNum}
                                </Box>
                                <Button variant={"outlined"}
                                        onClick={() => handlePagination(pageNum + 1)}
                                        disabled={(pageNum + 1) === lastPageNum || lastPageNum === 0}
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
                                        value={rowSize}
                                        onChange={handleRowSizeChange}
                                    >
                                        {
                                            [15, 25, 50, 100].map(num => <MenuItem key={num} value={num}>{num}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>

                    <TableContainer>
                        <Table size={"small"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>아이디</TableCell>
                                    <TableCell>값</TableCell>
                                    <TableCell>분석결과</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    dataList.map((data, dataIndex) => {
                                        if (fields === null) {
                                            return (<React.Fragment key={dataIndex}></React.Fragment>)
                                        }
                                        const Fields = fields.map(field => {
                                            let text = ""
                                            if (data['sourceAsMap'] && typeof data["sourceAsMap"][field] !== 'object') {
                                                text = data['sourceAsMap'][field]
                                            }
                                            let analyzeText = ""
                                            if (analyzeTermMap[data.id] && analyzeTermMap[data.id][field] && analyzeTermMap[data.id][field].length > 0) {
                                                analyzeText = analyzeTermMap[data.id][field].map(analyze => analyze.term).join(",")
                                            }

                                            return (
                                                <TableRow>
                                                    <TableCell> {field} </TableCell>
                                                    <TableCell> {text} </TableCell>
                                                    <TableCell> {analyzeText} </TableCell>
                                                </TableRow>
                                            )
                                        })

                                        return (
                                            <React.Fragment>
                                                <TableRow>
                                                    <TableCell> * ID </TableCell>
                                                    <TableCell> {data.id} </TableCell>
                                                    <TableCell> - </TableCell>
                                                </TableRow>
                                                {Fields}
                                            </React.Fragment>
                                        )
                                    })
                                }

                                {/*<TableCell scope="row"> {row.val1} </TableCell>*/}
                                {/*<TableCell> {row.val2} </TableCell>*/}


                                {
                                    // dataList.map((data, dataIndex) => {
                                    //     return (
                                    //         <TableRow key={dataIndex}>
                                    //             {
                                    //                 fields.map((field, fieldIndex) => {
                                    //                     if (fieldIndex === 0) {
                                    //                         return (
                                    //                             <React.Fragment key={fieldIndex}>
                                    //                                 <TableCell>{data["id"]}</TableCell>
                                    //                                 <TableCell>{data["sourceAsMap"][field]}</TableCell>
                                    //                             </React.Fragment>
                                    //                         )
                                    //                     } else {
                                    //                         return (
                                    //                             <TableCell key={fieldIndex}>{data["sourceAsMap"][field]}</TableCell>
                                    //                         )
                                    //                     }
                                    //                 })
                                    //             }
                                    //         </TableRow>
                                    //     )
                                    // })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <br/>

                    <Grid container>
                        <Grid item xs={12}>
                            <Box align={"center"}>
                                <Button variant={"outlined"}
                                        onClick={() => handlePagination(pageNum - 1)}
                                        disabled={pageNum === 0}
                                >
                                    이전
                                </Button>
                                <Box component={"span"} m={3}>
                                    {lastPageNum === 0 ? 0 : pageNum + 1} / {lastPageNum}
                                </Box>
                                <Button variant={"outlined"}
                                        onClick={() => handlePagination(pageNum + 1)}
                                        disabled={(pageNum + 1) === lastPageNum || lastPageNum === 0}
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

export default connect(store => ({
    ...store.indicesReducers
}))(IndexedDataPanel)