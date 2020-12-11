import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import styled from "styled-components";
import Helmet from 'react-helmet';

import {
    Box as MuiBox,
    Divider as MuiDivider,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography as MuiTypography,
    Button,
    TableSortLabel,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {positions, spacing} from "@material-ui/system";
import {setIndexTemplatesAction} from "../../../redux/actions/indexTemplateActions";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 250,
    },
    root: {
        flexGrow: 1,
        width: '100%',
    },
    edit: {
        width: '100%'
    }
}));

const Divider = styled(MuiDivider)(spacing);
const Box = styled(MuiBox)(spacing, positions);
const Typography = styled(MuiTypography)(spacing, positions);

const fields = [
    { id: "no", label: "#", sorting: true},
    { id: "name", label: "이름", sorting: true},
    { id: "id", label: "아이디", sorting: true},
    { id: "edit", label: "", sorting: false},
]

function Templates({dispatch, authUser, templates}) {
    const history = useHistory();
    const classes = useStyles();
    const [orderBy, setOrderBy] = useState("")
    const [order, setOrder] = useState("asc")

    useEffect(() => {
        dispatch(setIndexTemplatesAction())
    }, [])
        // .map((c, i) => ({...c, no: collectionList.length - 1 - i}))
    let list = templates.sort((a, b) => {
        if(a['name'] > b['name']){
            return 1;
        }else if(a['name'] < b['name']){
            return -1;
        }else{
            return 0;
        }
    }).map((template, i) => {
        return {
            name: template['name'],
            pattern: template['index_patterns'],
            no: i
    }})

    return (
        <React.Fragment>
            <Helmet title="템플릿"/>

            <br/>

            <Typography variant="h3"
                        gutterBottom
                        display="inline"
            >
                템플릿
            </Typography>

            <Divider my={6}/>

            <Box align={'right'}>
                {authUser.role.index ?
                    <Link onClick={() => history.push("./indices-templates/new")}
                          style={{cursor: "pointer"}}
                          color={"primary"}>
                    템플릿 생성
                </Link> : <></>}
            </Box>

            <br/>

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
                            {/*<TableCell align="center">패턴</TableCell>*/}
                            {/*<TableCell align="center"></TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            list.sort((a, b) => {
                                if (orderBy && order) {
                                    if (order === 'asc') {
                                        return a[orderBy] > b[orderBy] ? 1 : -1
                                    } else {
                                        return a[orderBy] > b[orderBy] ? -1 : 1
                                    }
                                } else {
                                    return 0
                                }
                            }).map((row, i) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row" align="center">{row['no'] + 1}</TableCell>
                                    <TableCell align="center">
                                        <Link onClick={() => history.push(`./indices-templates/${row.name}`)}
                                              style={{cursor: "pointer"}} >
                                            {row.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">{row.pattern}</TableCell>
                                    <TableCell align="center">
                                        {authUser.role.index ?
                                            <Button variant={"outlined"} color={"primary"} onClick={() => history.push(`./indices-templates/${row.name}/edit`)}
                                                  style={{cursor: "pointer"}}
                                                  color={"primary"}>수정</Button>
                                            :
                                            <></>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

export default connect(store => ({ 
    authUser: store.dsearchReducers.authUser,
    ...store.indexTemplateReducers 
}))(Templates)