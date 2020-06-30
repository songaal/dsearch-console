import React, {useState} from "react";
import styled from "styled-components";
import Helmet from 'react-helmet';

import {
    Box as MuiBox,
    Button as MuiButton,
    Card as MuiCard, Dialog, DialogActions, DialogContent, DialogTitle,
    Divider as MuiDivider,
    Grid as MuiGrid, Link, Menu, MenuItem, Switch, Table, TableBody, TableCell, TableRow, TextField,
    Typography as MuiTypography,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {positions, spacing} from "@material-ui/system";
import AntTabs from "~/components/AntTabs"
import SearchIcon from "@material-ui/icons/Search";
import {ArrowDropDown} from "@material-ui/icons";

const Divider = styled(MuiDivider)(spacing, positions);
const Typography = styled(MuiTypography)(spacing, positions);
const Box = styled(MuiBox)(spacing, positions);
const Card = styled(MuiCard)(spacing, positions);
const Button = styled(MuiButton)(spacing, positions);
const Grid = styled(MuiGrid)(spacing, positions);

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 250,
    },
    root: {
        flexGrow: 1,
        width: '100%',
    },
    edit: {
        width: '100%'
    }
}));


function Source() {
    const classes = useStyles();
    const [moreMenu, setMoreMenu] = useState(null)
    const [editModal, setEditModal] = useState(null)

    function toggleMoreMenu(event) {
        setMoreMenu(moreMenu === null ? event.currentTarget : null)
    }
    function toggleEditModal(event) {
        setEditModal(editModal === null ? event.currentTarget : null)
    }

    return (
        <React.Fragment>

            <br/>

            <Grid container>
                <Grid item xs={10}>
                    <Grid container my={3}>
                        <Grid item xs={2} mt={2}>
                            스케쥴 사용여부
                        </Grid>
                        <Grid item xs={10}>
                            <Switch />
                        </Grid>
                    </Grid>

                    <Grid container my={3}>
                        <Grid item xs={1} mt={2}>
                            상태
                        </Grid>
                        <Grid item xs={1} mt={2}>
                            대기
                        </Grid>
                        <Grid item xs={8}>
                            <Button variant={"outlined"}
                                    onClick={toggleMoreMenu}
                            >
                                더보기
                                <ArrowDropDown/>
                            </Button>
                            <Menu
                                anchorEl={moreMenu}
                                open={Boolean(moreMenu)}
                                onClose={toggleMoreMenu}
                            >
                                <MenuItem onClick={toggleMoreMenu}>
                                    연속실행
                                </MenuItem>
                                <MenuItem onClick={toggleMoreMenu}>
                                    1.색인실행
                                </MenuItem>
                                <MenuItem onClick={toggleMoreMenu}>
                                    2.전파실행
                                </MenuItem>
                                <MenuItem onClick={toggleMoreMenu}>
                                    3.교체실행
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2} align={"right"}>
                    <Button variant={"outlined"} >
                        수정
                    </Button>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12}>
                    <Box p={5}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>런처</TableCell>
                                    <TableCell>dbIndexer.jar
                                        <Link style={{cursor: "pointer"}}
                                              onClick={toggleEditModal}
                                        >수집설정</Link>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>실행포트</TableCell>
                                    <TableCell>30100</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>JDBC</TableCell>
                                    <TableCell>market-dev</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>크론주기</TableCell>
                                    <TableCell>0분 5시 *일 *월 *요일</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Grid>
            </Grid>


            <Dialog open={editModal}
                    fullWidth
                    onClose={toggleEditModal}
            >
                <DialogTitle>
                    설정
                </DialogTitle>
                <DialogContent>
                    <pre>
                        limit: 1000<br/>
                        bulk: 1000<br/>
                        sql: |<br/>
                        SELECT /*+ USE_NL(TPC,TPD) USE_NL(TPC, TP) USE_NL(TP,TPM) USE_NL(TPM,TPCDAT) USE_NL(TPCDAT,TPR) USE_NL(TPR,TPB) USE_NL(TPM,TPD)  USE_NL(TSP, TUP) USE_NL(TKFS, TSP) USE_NL(TKFS,TPB) USE_NL(TPDD, TPIP) USE_NL(TPDD,TUP) USE_NL(TPIP,TPBC) USE_NL(TPBC,TPEV) USE_NL(TPEV, TPMP) USE_NL(TPMP, TFDS) USE_NL(TFDS, TSS) */<br/>
                        tP.prod_c as ID,<br/>
                        tP.prod_c as productCode,<br/>
                        'dna' as shopCode,<br/>
                        tP.prod_n as productName,<br/>
                        NVL(tPM.maker_n ,'') as productMaker,<br/>
                    </pre>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleEditModal}>닫기</Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}

export default Source;
