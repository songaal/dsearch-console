import React from "react";
import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';
import {Box as MuiBox, Grid as MuiGrid, Table, TableBody, TableCell, TableRow} from "@material-ui/core";

import {spacing} from "@material-ui/system";


const useStyles = makeStyles((theme) => ({}));

const Grid = styled(MuiGrid)(spacing);
const Box = styled(MuiBox)(spacing);

function Summary() {
    const classes = useStyles();

    return (
        <React.Fragment>

            <Grid container>
                <Grid item xs={12}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>상태</TableCell>
                                <TableCell>
                                    <Box style={{backgroundColor: "green", width: "20px", height: "20px", borderRadius: "90px", float: "left"}}> </Box>

                                    <Box style={{paddingLeft: "30px", marginTop: "2px"}}>
                                        정상
                                    </Box>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>프라이머리</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>레플리카</TableCell>
                                <TableCell>2</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>문서 수</TableCell>
                                <TableCell>123123</TableCell>
                                <TableCell>삭제문서 수</TableCell>
                                <TableCell>23</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>스토리지 용량</TableCell>
                                <TableCell>1.5mb</TableCell>
                                <TableCell>프라이머리 <br/> 스토리지용량</TableCell>
                                <TableCell>33mb</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>별칭</TableCell>
                                <TableCell>
                                    search-prod<br/>
                                    search-prod<br/>
                                    search-vm<br/>
                                    production_vm<br/>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>

        </React.Fragment>
    );
}

export default Summary;
