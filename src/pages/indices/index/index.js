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
    Typography,
} from "@material-ui/core";

import {spacing} from "@material-ui/system";
import {setIndicesAction} from "../../../redux/actions/indicesActions";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({}));
const Divider = styled(MuiDivider)(spacing);

function Index({dispatch, indices}) {
    const classes = useStyles();
    const history = useHistory();
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        dispatch(setIndicesAction())
    }, [])


    function moveDetail(uuid) {
        history.push(`./indices/${uuid}`)
    }

    function handleChecked(event) {
        setChecked(!checked)
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
                            <TableCell align="center">#</TableCell>
                            <TableCell align="center">이름</TableCell>
                            <TableCell align="center">상태</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
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
