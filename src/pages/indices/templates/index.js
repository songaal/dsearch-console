import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Async from '~/components/Async';
import Helmet from 'react-helmet';
import AntTabs from "~/components/AntTabs";
import { setIndicesMapping } from '@actions/indicesMappingActions';

import {
    Card as MuiCard,
    CardContent,
    CardHeader,
    Divider as MuiDivider,
    Grid,
    Typography as MuiTypography,
    Box as MuiBox,
    FormControl,
    Select,
    FormHelperText,
    InputLabel,
    MenuItem, Paper, Table, TableHead, TableRow, TableBody, Checkbox, TableContainer, TableCell,
    Link,
    AppBar,
    Tab,
    Tabs,
    TextareaAutosize,
    Button as MuiButton,
    TextField,
} from "@material-ui/core";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {spacing, positions, palette} from "@material-ui/system";
import SearchIcon from "@material-ui/icons/Search";
import {connect} from "react-redux";
import indicesMappingReducers from "../../../redux/reducers/indicesMappingReducers";

const useStyles = makeStyles((theme) => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 250,
    },
    root: {
        flexGrow: 1,
        width: '100%',
        // backgroundColor: theme.palette.background.paper,
    },
    edit: {
        width: '100%'
    }
}), {withTheme: true});

const Divider = styled(MuiDivider)(spacing);
const Box = styled(MuiBox)(spacing, positions);
const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing, positions);
const Button = styled(MuiButton)(spacing, positions, palette);

function createData(name, pattern) {
    return { name, pattern};
}

const rows = [
    createData('VM-Template', "VM-*"),
    createData('VM-test-Template', "VM-TEST-*"),
    createData('VM-data', "VM-data-*")
];

function Template({dispatch, mapping}) {
    const classes = useStyles();
    const [indices, setIndices] = React.useState('VM');

    const handleChange = (event) => {
        setIndices(event.target.value);
    };
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
                <Link href={"template/edit"} color={"primary"} >
                    템플릿 생성
                </Link>
            </Box>

            <br/>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">#</TableCell>
                            <TableCell align="center">이름</TableCell>
                            <TableCell align="center">패턴</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, i) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row" align="center">{i + 1}</TableCell>
                                <TableCell align="center">
                                    <Link onClick={() => {location.href="template/view/" + i}} href={"#"}>
                                        {row.name}
                                    </Link>
                                </TableCell>
                                <TableCell align="center">{row.pattern}</TableCell>
                                <TableCell align="center">
                                    <Link href={"template/edit/1"} color={"primary"}>수정</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </React.Fragment>
    );
}

export default connect(store => ({  }))(Template);