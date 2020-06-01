import React, {useState, useRef, useEffect} from "react";
import PropTypes from "prop-types"

import {Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";


function DynamicTable({dataList, showCheckBox = false, onSelectClick}) {
    const [selected, setSelected] = useState([])

    useEffect(() => {
        setSelected([])
    }, [showCheckBox])

    const fields = dataList.map(data => data.field);

    let rowCount = 0;
    dataList.forEach(data => rowCount < data.data.length ? rowCount = data.data.length : rowCount);

    let rows = [];
    let array = [...dataList.map(data => data.data)];

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

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {
                            !showCheckBox ? null :
                                <TableCell padding="checkbox">
                                    <Checkbox defaultChecked={false} onChange={(event) => handleSelectAllClick(event.target.checked)}/>
                                </TableCell>
                        }
                        {fields.map((field, index) => <TableCell key={index}>{field}</TableCell>)}
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
                                                        !showCheckBox ? null :
                                                            <TableCell padding="checkbox">
                                                                <Checkbox checked={selected.includes(col.id)}
                                                                          onChange={(event) => handleSelectClick(col.id, event.target.checked)}
                                                                />
                                                            </TableCell>
                                                    }
                                                    <TableCell>{col.text}</TableCell>
                                                </React.Fragment>
                                            )
                                        })
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