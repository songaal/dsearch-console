import React, {useEffect} from "react";
import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import {useHistory} from "react-router-dom"
import {
    Divider as MuiDivider,
    Link,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
} from "@material-ui/core";

import {spacing} from "@material-ui/system";
import {setIndexAction, setIndicesAction} from "../../../redux/actions/indicesActions";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({}));
const Divider = styled(MuiDivider)(spacing);

function Index({dispatch, indices}) {
    const classes = useStyles();
    const history = useHistory();


    useEffect(() => {
        dispatch(setIndicesAction())
    }, [])


    function moveDetail(uuid) {
        history.push(`./indices/${uuid}`)
    }

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

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">#</TableCell>
                            <TableCell align="center">이름</TableCell>
                            <TableCell align="center">상태</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            indices.map((index, no) => {
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
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        </React.Fragment>
    );
}

export default connect(store => ({
    ...store.indicesReducers,
}))(Index);
