import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import {useHistory} from "react-router-dom"
import {
    Box,
    Divider as MuiDivider, FormControlLabel,
    Link,
    Paper, Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Typography,
    TableSortLabel,
} from "@material-ui/core";

import {spacing} from "@material-ui/system";
import {setIndicesAction} from "../../../redux/actions/indicesActions";
import {connect} from "react-redux";
import {green, grey, orange, red, yellow} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({}));
const Divider = styled(MuiDivider)(spacing);

const fields = [
    { id: "no", label: "#", sorting: true},
    { id: "index", label: "이름", sorting: true},
    { id: "pri", label: "샤드", sorting: false},
    { id: "docs.count", label: "문서 수", sorting: true},
    { id: "store.size", label: "용량", sorting: true},
    { id: "status", label: "상태", sorting: false},
]


function Index({dispatch, indices}) {
    const classes = useStyles();
    const history = useHistory();
    const [checked, setChecked] = useState(false)
    const [orderBy, setOrderBy] = useState("")
    const [order, setOrder] = useState("asc")

    useEffect(() => {
        dispatch(setIndicesAction())
    }, [])


    function moveDetail(uuid) {
        history.push(`./indices/${uuid}`)
    }

    function handleChecked(event) {
        setChecked(!checked)
    }
    let sortedIndices = indices
        .filter(index => checked ? true : index['index'].startsWith(".") === false )
        .map((index, no) => { return index; })
        .sort((a, b) => {
            if(a['index'] > b['index']){
                return 1;
            }else if(a['index'] < b['index']){
                return -1;
            }else{
                return 0;
            }
        })
        .map((c, i) => ({...c, no: i }))


    return (
        <React.Fragment>
            <Helmet title="인덱스"/>

            <Typography variant="h3" gutterBottom display="inline">
                인덱스
            </Typography>

            <Divider my={6}/>

            {/*<Box align={'right'}>*/}
            {/*    <Link href={"../indices/template"} color={"primary"} >*/}
            {/*        인덱스 생성*/}
            {/*    </Link>*/}
            {/*</Box>*/}

            <br/>
            <Box align={"right"}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={checked}
                            onChange={handleChecked}
                            color="primary"
                            name="IndexModeSelector"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    }
                    label="특수 인덱스 보기"
                />
            </Box>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            {
                                fields.map(field =>
                                    <TableCell align="center" key={field['id']}>
                                        {
                                            field["sorting"] ?
                                                <TableSortLabel
                                                    active={orderBy === field['id']}
                                                    direction={orderBy === field['id'] ? order : 'asc'}
                                                    onClick={event => {
                                                        setOrderBy(field['id'])
                                                        const isAsc = orderBy === field['id'] && order === 'asc';
                                                        setOrder(isAsc ? 'desc' : 'asc');
                                                    }}
                                                >
                                                    {field['label']}
                                                </TableSortLabel>
                                                :
                                                field['label']
                                        }
                                    </TableCell>)
                            }
                            {/*<TableCell align="center">#</TableCell>*/}
                            {/*<TableCell align="center">이름</TableCell>*/}
                            {/*<TableCell align="center">샤드</TableCell>*/}
                            {/*<TableCell align="center">문서 수</TableCell>*/}
                            {/*<TableCell align="center">용량</TableCell>*/}
                            {/*<TableCell align="center">상태</TableCell>*/}
                            {/*health*/}
                        {/*  status  */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            sortedIndices.sort((a, b) => {
                                if (orderBy && order) {
                                    let x = a[orderBy]
                                    let y = b[orderBy]
                                    if (orderBy === 'docs.count') {
                                        x = Number(x)
                                        y = Number(y)
                                    } else if (orderBy === 'store.size') {
                                        let x1 = Number(x.replace(/[a-z]/gi, ""))
                                        let y1 = Number(y.replace(/[a-z]/gi, ""))
                                        let xUnit = String(x||"").replace(/[0-9.]/g, "").toLowerCase()
                                        let yUnit = String(y||"").replace(/[0-9.]/g, "").toLowerCase()
                                        x = x1 + Number(xUnit.includes("k") ? 1024 : xUnit.includes("m") ? (1024 * 1024) : xUnit.includes("g") ? (1024 * 1024 * 1024) : xUnit.includes("t") ? (1024 * 1024 * 1024 * 1024) : 0)
                                        y = y1 + Number(yUnit.includes("k") ? 1024 : yUnit.includes("m") ? (1024 * 1024) : yUnit.includes("g") ? (1024 * 1024 * 1024) : yUnit.includes("t") ? (1024 * 1024 * 1024 * 1024) : 0)
                                    }
                                    if (order === 'asc') {
                                        return x > y ? 1 : -1
                                    } else {
                                        return x > y ? -1 : 1
                                    }
                                } else {
                                    return 0
                                }
                            }).map((index, no) => {
                                let statusColor = "";
                                let statusText = "";
                                if (index['status'] === 'close') {
                                    statusColor = grey[700];
                                    statusText = "닫힘";
                                } else if (index['health'] === "yellow") {
                                    statusColor = yellow[700];
                                    statusText = "주의";
                                } else if (index['health'] === "red") {
                                    statusColor = red[700];
                                    statusText = "오류";
                                } else {
                                    statusColor = green[500];
                                    statusText = "정상";
                                }

                                return (
                                    <TableRow key={index['uuid']}>
                                        <TableCell component="th" scope="row" align="center">{index['no'] + 1}</TableCell>
                                        <TableCell align="center" >
                                            <Link style={{cursor: "pointer"}} onClick={() => moveDetail(index['uuid'])}>
                                                {index['index']}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box>
                                                P[{index['pri']||'-'}] R[{index['rep']||'-'}]
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box>
                                                {Number(index['docs.count']).toLocaleString()||'-'}
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box>
                                                {index['store.size']||'-'}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box align="center">
                                                <Avatar style={{backgroundColor: statusColor, width: "40px", fontSize: "0.8em"}}>
                                                    {statusText}
                                                </Avatar>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        {/* {
                            indices.filter(index => checked ? true : index['index'].startsWith(".") === false ).map((index, no) => {
                                return (
                                    <TableRow key={index['uuid']}>
                                        <TableCell component="th" scope="row" align="center">{no + 1}</TableCell>
                                        <TableCell align="center" >
                                            <Link style={{cursor: "pointer"}} onClick={() => moveDetail(index['uuid'])}>
                                                {index['index']}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">{index['status']}</TableCell>
                                    </TableRow>
                                )
                            })
                        } */}
                    </TableBody>
                </Table>
            </TableContainer>

        </React.Fragment>
    );
}

export default connect(store => ({
    ...store.indicesReducers,
}))(Index);
