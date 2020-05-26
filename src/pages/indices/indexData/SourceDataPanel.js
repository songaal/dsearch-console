import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import {
    Card,
    CardContent,
    Grid,
    IconButton,
    InputBase,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import { setIndicesSourceDataListActions } from "@actions/indicesIndexDataActions";

const useStyles = makeStyles((theme) => ({}));

function SourceDataPanel({dispatch, index, indicesSourceDataList, params}) {
    const classes = useStyles()
    const [state, setState] = useState(params)
    useEffect(() =>{
        if (index) {
            dispatch(setIndicesSourceDataListActions({index}))
        }
    }, [index])

    const search = () => {
        dispatch(setIndicesSourceDataListActions({
            ...state,
            index
        }))
    }
    const handleChange = (id, event) => {
        setState({
            ...state,
            [id]: event.target.value
        })
    }

    let fields = []
    if(indicesSourceDataList.length > 0) {
        fields = Object.keys(indicesSourceDataList[0]["sourceAsMap"]||{})
    }

    return (
        <Box display={index ? "block" : "none"}>
            <br/>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <Box  className={classes.form}>
                                <InputBase
                                    className={classes.input}
                                    placeholder="ID"
                                    value={state.id}
                                    onChange={(e) => handleChange("id", e)}
                                />
                                <IconButton className={classes.iconButton} aria-label="search" onClick={search}>
                                    <Search/>
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                    </Grid>

                    <TableContainer>
                        <Table size={"small"}>
                            <TableHead>
                                <TableRow>
                                    {fields.map((field, index) => {
                                        if (index === 0) {
                                            return (
                                                <>
                                                    <TableCell key={"id"} align="center">id</TableCell>
                                                    <TableCell key={index} align="center">{field}</TableCell>
                                                </>
                                            )
                                        } else {
                                            return (<TableCell key={index} align="center">{field}</TableCell>)
                                        }
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    indicesSourceDataList.map((data, dataIndex) => {
                                        return (
                                            <TableRow key={dataIndex}>
                                                {
                                                    fields.map((field, fieldIndex) => {
                                                        if (fieldIndex === 0) {
                                                            return (
                                                                <>
                                                                    <TableCell key={"id"}>{data["id"]}</TableCell>
                                                                    <TableCell key={fieldIndex}>{data["sourceAsMap"][field]}</TableCell>
                                                                </>
                                                            )
                                                        } else {
                                                            return (
                                                                <TableCell key={fieldIndex}>{data["sourceAsMap"][field]}</TableCell>
                                                            )
                                                        }
                                                    })
                                                }
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    )
}

export default connect(store => ({
    ...store.indicesReducers,
    ...store.indicesIndexDataReducers
}))(SourceDataPanel)