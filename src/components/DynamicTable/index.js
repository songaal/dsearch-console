import React, {useState, useRef, useEffect, createRef} from "react";
import PropTypes from "prop-types"

import {
    Box,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    IconButton, InputBase
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {
    Edit as EditIcon,
    Delete as DeleteIcon
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    input: { border: "0px" },
}));

function DynamicTable({dataList, showCheckBox = false, onSelectClick, isEdit = false}) {
    const classes = useStyles();
    const [selected, setSelected] = useState([])
    const [cloneDataList, setCloneDataList] = useState([])

    useEffect(() => {
        setCloneDataList(dataList)
    }, [dataList])

    useEffect(() => {
        setSelected([])
    }, [showCheckBox])


    const fields = cloneDataList.map(data => data.field);

    let rowCount = 0;
    cloneDataList.forEach(data => rowCount < data.data.length ? rowCount = data.data.length : rowCount);

    let rows = [];
    let array = [...cloneDataList.map(data => data.data)];

    for (let i = 0; i < rowCount; i++) {
        let cols = [];
        for (let j = 0; j < fields.length; j++) {
            if (typeof array[j][i] !== 'object') {
                cols.push({id: array[j][i], text: array[j][i]})
            } else {
                cols.push({id: array[j][i]['id'], text: array[j][i]['text']})
            }
        }
        rows.push(cols)
    }

    function handleSelectAllClick(checked) {
        let ids = []
        rows.forEach(row => {
            onSelectClick(row[0].id, checked)
            ids.push(row[0].id)
        })
        checked ? setSelected(ids) : setSelected([])
    }
    function handleSelectClick(id, checked) {
        onSelectClick(id, checked)
        checked ? setSelected(selected.concat(id)) : setSelected(selected.filter(select => select !== id))
    }
    function handleEdit(id, index) {

    }
    function handleDelete(index) {

    }
    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {
                            fields.map((field, index) => (
                                <React.Fragment key={field}>
                                    {
                                        showCheckBox && index === 0  ?
                                            <TableCell padding="checkbox">
                                                <Checkbox defaultChecked={false} onChange={(event) => handleSelectAllClick(event.target.checked)}/>
                                            </TableCell>
                                            :
                                            null
                                    }
                                    <TableCell>{field}</TableCell>
                                </React.Fragment>
                            ))
                        }
                        {
                            showCheckBox && isEdit ?
                                <TableCell>
                                    <Box align={"center"}>
                                        액션
                                    </Box>
                                </TableCell>
                                :
                                null
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((cols, rowIdx) => {
                            return (
                                <TableRow key={rowIdx}>
                                    {
                                        cols.map((col, colIdx) => {
                                            return (
                                                <React.Fragment key={colIdx}>
                                                    {
                                                        showCheckBox && colIdx === 0 ?
                                                            <TableCell padding="checkbox">
                                                                <Checkbox checked={selected.includes(col.id)}
                                                                          onChange={(event) => handleSelectClick(col.id, event.target.checked)}
                                                                />
                                                            </TableCell>
                                                            :
                                                            null
                                                    }
                                                    <TableCell>
                                                        {
                                                            showCheckBox && isEdit ?
                                                                <InputBase className={classes.input}
                                                                           value={col.text}
                                                                           onChange={(event) => event.target.value}
                                                                           fullWidth
                                                                           b={0}
                                                                />
                                                                :
                                                                col.text
                                                        }
                                                    </TableCell>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                    {
                                        showCheckBox && isEdit ?
                                            <TableCell>
                                                <Box align={"center"}>
                                                    <IconButton size={"small"}
                                                                className={classes.iconButton}
                                                                onClick={() => handleEdit(cols[0]['id'], rowIdx)}
                                                    >
                                                        <EditIcon/>
                                                    </IconButton>
                                                    <IconButton size={"small"}
                                                                className={classes.iconButton}
                                                                onClick={() => handleDelete(cols[0]['id'], rowIdx)}
                                                    >
                                                        <DeleteIcon/>
                                                    </IconButton>

                                                </Box>
                                            </TableCell>
                                            :
                                            null
                                    }
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

DynamicTable.prototype = {
    dataList: PropTypes.array.isRequired
};

export default DynamicTable