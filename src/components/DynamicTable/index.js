import React, {useEffect, useState} from "react";
import PropTypes from "prop-types"

import {
    Box,
    Checkbox,
    IconButton,
    InputBase,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Delete as DeleteIcon, OfflinePin as OfflinePinIcon} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    input: { border: "0px" },
}));

function DynamicTable({dataList, from = 0, limit = 100000, showCheckBox = false, onSelectClick, isEdit = false, onUpdate = () => {}, onDelete = () => {}}) {
    const classes = useStyles();
    const [selected, setSelected] = useState([])
    const [array, setArray] = useState([])

    useEffect(() => {
        setArray([...dataList.map(data => data.data)])
    }, [dataList])

    useEffect(() => {
        setSelected([])
    }, [showCheckBox])


    const fields = dataList.map(data => data.field);

    let rowCount = 0;
    dataList.forEach(data => rowCount < data.data.length ? rowCount = data.data.length : rowCount);

    let rows = [];
    for (let i = 0; i < rowCount; i++) {
        let cols = [];
        for (let j = 0; j < fields.length; j++) {
            if (array[j]) {
                if (typeof array[j][i] !== 'object') {
                    cols.push({id: array[j][i], text: array[j][i]})
                } else {
                    cols.push({id: array[j][i]['id'], text: array[j][i]['text']})
                }
            }
        }
        rows.push(cols)
    }
    rows = rows.splice(from, limit)

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
    function handleChange(event, id, colIdx, rowIdx) {
        let cloneArray = array.slice()
        cloneArray[colIdx][rowIdx]['text'] = event.target.value
        setArray(cloneArray)
    }
    function handleEdit(id, rowIdx) {
        let cols = []
        let updateFields = []
        for (let i = 0; i < array.length; i++) {
            cols.push(array[i][rowIdx]['text'] || '')
            updateFields.push(fields[i] || '')
        }
        onUpdate(id, cols, updateFields)
    }
    function handleDelete(id) {
        onDelete(id)
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
                                                                // 수정 모드
                                                                <InputBase className={classes.input}
                                                                           value={col.text|| ''}
                                                                           /*순서 주의 (colIdx, rowIdx)*/
                                                                           onChange={(event) => handleChange(event, col.id, colIdx, rowIdx)}
                                                                           fullWidth
                                                                           b={0}
                                                                />
                                                                :
                                                                // 조회 모드
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
                                                <Box align={"center"} justifyContent={"space-between"} display="flex" width="100%">
                                                    <Box></Box>
                                                    <IconButton size={"small"}
                                                                className={classes.iconButton}
                                                                onClick={() => handleEdit(cols[0]['id'], rowIdx)}
                                                    >
                                                        <OfflinePinIcon/>
                                                    </IconButton>
                                                    <IconButton size={"small"}
                                                                className={classes.iconButton}
                                                                onClick={() => handleDelete(cols[0]['id'])}
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