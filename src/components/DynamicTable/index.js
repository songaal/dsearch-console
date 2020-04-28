import React from "react";
import PropTypes from "prop-types"

import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";


function DynamicTable({dataList}) {
    console.log(dataList[0].data);
    const fields = dataList.map(data => data.field);

    let rowCount = 0;
    dataList.forEach(data => rowCount < data.data.length ? rowCount = data.data.length : rowCount);

    let rows = [];
    let array = [...dataList.map(data => data.data)];

    for (let i = 0; i < rowCount; i++) {
        let cols = [];
        for (let j = 0; j < fields.length; j++) {
            cols.push(array[j][i] || null)
        }
        rows.push(cols)
    }

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {fields.map((field, index) => <TableCell key={index}>{field}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((cols, rowIdx) => {
                            return (
                                <TableRow key={rowIdx}>
                                    {cols.map((col, colIdx) => <TableCell key={colIdx}>{col}</TableCell>)}
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