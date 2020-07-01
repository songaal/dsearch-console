import React from "react";
import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';
import {Card, CardContent, Typography, Divider as MuiDivider, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

import {spacing} from "@material-ui/system";


const useStyles = makeStyles((theme) => ({}));


const Divider = styled(MuiDivider)(spacing);

function Statistics() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <br/>

            <Card my={5}>
                <CardContent>
                    <Typography variant={"h5"} mt={5}>
                        docs
                    </Typography>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>count</TableCell>
                                <TableCell>34612</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>deleted</TableCell>
                                <TableCell>0</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <br/>

            <Card my={5}>
                <CardContent>
                    <Typography variant={"h5"} mt={5}>
                        indexing
                    </Typography>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>index_count</TableCell>
                                <TableCell>1111</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>index_time_in_millis</TableCell>
                                <TableCell>0</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>index_total</TableCell>
                                <TableCell>342222</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>index_failed</TableCell>
                                <TableCell>42555</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>


            <br/>

            <Card my={5}>
                <CardContent>
                    <Typography variant={"h5"} mt={5}>
                        indexing
                    </Typography>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>index_count</TableCell>
                                <TableCell>1111</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>index_time_in_millis</TableCell>
                                <TableCell>0</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>index_total</TableCell>
                                <TableCell>342222</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>index_failed</TableCell>
                                <TableCell>42555</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </React.Fragment>
    );
}

export default Statistics;
