import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';
import {
    Avatar,
    Box as MuiBox,
    Card,
    CardContent,
    Grid as MuiGrid,
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@material-ui/core";

import {spacing} from "@material-ui/system";
import {green, grey, red, yellow} from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({}));

const Grid = styled(MuiGrid)(spacing);
const Box = styled(MuiBox)(spacing);

function Summary({index, indexInfoList, aliases, settings}) {
    const classes = useStyles();
    const indexInfo = indexInfoList[0]

    if (!indexInfo) {
        return null
    }

    if (indexInfo['index'] !== index) {
        return null;
    }

    return (
        <React.Fragment>
            <br />
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>상태</TableCell>
                                        <TableCell>
                                            <Box style={{marginTop: "2px"}}>
                                                <Avatar style={{backgroundColor: indexInfo['health'] === "green" ? green[500] : indexInfo['health'] === "yellow" ? yellow[700] : red[700],
                                                    width: "40px", fontSize: "0.8em"}}>
                                                    {indexInfo['health'] === "green" ? "정상" : indexInfo['health'] === "yellow" ? "경고" : "오류"}
                                                </Avatar>
                                            </Box>
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>오픈여부</TableCell>
                                        <TableCell>{indexInfo['status']}</TableCell>

                                        <TableCell>동결여부</TableCell>
                                        <TableCell>{ ((settings['settings']||{})['index']||{})['frozen']||null }</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>프라이머리</TableCell>
                                        <TableCell>{Number(indexInfo['pri']).toLocaleString()}</TableCell>
                                        <TableCell>레플리카</TableCell>
                                        <TableCell>{Number(indexInfo['rep']).toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>문서 수</TableCell>
                                        <TableCell>{Number(indexInfo['docs.count']).toLocaleString()}</TableCell>
                                        <TableCell>삭제문서 수</TableCell>
                                        <TableCell>{Number(indexInfo['docs.deleted']).toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>스토리지 용량</TableCell>
                                        <TableCell>{indexInfo['store.size']}</TableCell>
                                        <TableCell>프라이머리 <br/> 스토리지용량</TableCell>
                                        <TableCell>{indexInfo['pri.store.size']}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>별칭</TableCell>
                                        <TableCell>
                                            {Object.keys(aliases).join(<br/>)}
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

export default connect(store => ({...store.indicesReducers}))(Summary);
