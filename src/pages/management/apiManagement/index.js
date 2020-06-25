import React, {useEffect} from "react";
import styled from "styled-components";
import Helmet from 'react-helmet';

import {
    Divider as MuiDivider,
    FormControl,
    MenuItem,
    Paper,
    Select as MuiSelect,
    Table,
    TableBody,
    TableCell,
    TableContainer as MuiTableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {sizing, spacing} from "@material-ui/system";

import {connect} from "react-redux";
import {setApiManagementActions} from "@actions/apiManagementActions";

const Divider = styled(MuiDivider)(spacing);
const Select = styled(MuiSelect)(spacing, sizing)
const TableContainer = styled(MuiTableContainer)(spacing)

function ApiManagement({dispatch, cat}) {
    const classes = useStyles();
    const [selected, setSelected] = React.useState("master");

    useEffect(() => {
        if (selected !== null) {
            dispatch(setApiManagementActions(selected))
        }
    }, [selected])

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    let fields = []
    if (cat.length > 0) {
        fields = Object.keys(cat[0])
    }

    return (
        <>
            <Helmet title="API"/>
            <Typography variant="h3" gutterBottom display="inline">
                API
            </Typography>

            <Divider my={6}/>

            <div className={classes.root}>

                <FormControl variant="outlined" fullWidth>
                    <Select labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={selected}
                            onChange={handleChange}
                    >
                        <MenuItem value="allocation">allocation</MenuItem>
                        <MenuItem value="shards">shards</MenuItem>
                        <MenuItem value="master">master</MenuItem>
                        <MenuItem value="nodes">nodes</MenuItem>
                        <MenuItem value="tasks">tasks</MenuItem>
                        <MenuItem value="indices">indices</MenuItem>
                        <MenuItem value="segments">segments</MenuItem>
                        <MenuItem value="count">count</MenuItem>
                        <MenuItem value="recovery">recovery</MenuItem>
                        <MenuItem value="health">health</MenuItem>
                        <MenuItem value="pending_tasks">pending_tasks</MenuItem>
                        <MenuItem value="aliases">aliases</MenuItem>
                        <MenuItem value="thread_pool">thread_pool</MenuItem>
                        <MenuItem value="plugins">plugins</MenuItem>
                        <MenuItem value="fielddata">fielddata</MenuItem>
                        <MenuItem value="nodeattrs">nodeattrs</MenuItem>
                        <MenuItem value="repositories">repositories</MenuItem>
                        <MenuItem value="templates">templates</MenuItem>
                    </Select>
                </FormControl>

                <TableContainer component={Paper} mt={5}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {fields.map((field, index) => <TableCell key={index}> {field} </TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                cat.map((data, dataIndex) => {
                                    return (
                                        <TableRow key={dataIndex}>
                                            {
                                                fields.map((field, index) => <TableCell
                                                    key={index}> {data[field]} </TableCell>)
                                            }
                                        </TableRow>
                                    )

                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </>
    );
}



const useStyles = makeStyles((theme) => ({

}));


export default connect(store => ({...store.apiManagementReducers}))(ApiManagement);
