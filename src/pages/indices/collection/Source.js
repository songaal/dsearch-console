import React, {useState} from "react";
import styled from "styled-components";
import Helmet from 'react-helmet';

import {
    Box as MuiBox,
    Button as MuiButton,
    Card as MuiCard, CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider as MuiDivider,
    Fade,
    Grid as MuiGrid,
    Link,
    Menu,
    MenuItem,
    Paper,
    Popper,
    Select,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Typography as MuiTypography,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {positions, spacing} from "@material-ui/system";
import AntTabs from "~/components/AntTabs"
import SearchIcon from "@material-ui/icons/Search";
import {ArrowDropDown} from "@material-ui/icons";
import {connect} from "react-redux";
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
    },
    typography: {
        padding: theme.spacing(2),
    },
}));


function Source({dispatch, collection}) {
    const classes = useStyles();
    const [moreMenu, setMoreMenu] = useState(null)
    const [editModal, setEditModal] = useState(null)
    const [mode, setMode] = useState("VIEW")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(null);
    const [placement, setPlacement] = React.useState();

    function toggleMoreMenu(event) {
        setMoreMenu(moreMenu === null ? event.currentTarget : null)
    }
    function toggleEditModal(event) {
        setEditModal(editModal === null ? event.currentTarget : null)
    }
    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    }



    console.log('collection', collection)



    return (
        <React.Fragment>

            <br/>

            <Card>
                <CardContent>
                    <Box style={{display: mode === "VIEW" ? "block" : "none"}}>
                        <Grid container>
                            <Grid item xs={10}>
                                <Grid container my={3}>
                                    <Grid item xs={3} mt={2}>
                                        <Box style={{fontWeight: "bold"}}>스케쥴</Box>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Switch />
                                    </Grid>
                                </Grid>

                                <Grid container my={3}>
                                    <Grid item xs={3} mt={2}>
                                        <b>상태</b>
                                        <Box>대기</Box>
                                    </Grid>
                                    {/*<Grid item xs={2} mt={2}>*/}
                                    {/*    */}
                                    {/*</Grid>*/}
                                    <Grid item xs={9}>
                                        <Button variant={"outlined"}
                                                onClick={toggleMoreMenu}
                                        >
                                            실행
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
                                <Button variant={"outlined"} onClick={() => setMode("EDIT")}>
                                    수정
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12}>
                                <Box>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>런처</TableCell>
                                                <TableCell>dbIndexer.jar
                                                    <Link style={{cursor: "pointer"}}
                                                          onClick={toggleEditModal}
                                                    >수집설정</Link>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>실행포트</TableCell>
                                                <TableCell>30100</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>JDBC</TableCell>
                                                <TableCell>market-dev</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>크론주기</TableCell>
                                                <TableCell>0분 5시 *일 *월 *요일</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box style={{display: mode === "EDIT" ? "block" : "none"}}>

                        <Grid container>
                            <Grid item xs={10}>

                            </Grid>
                            <Grid item xs={2} align={"right"}>
                                <Button variant={"outlined"} onClick={() => setMode("VIEW")}>
                                    저장
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Box p={5}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>이름</TableCell>
                                                <TableCell>
                                                    <TextField value={"기준상품 전체색인 수집"} fullWidth/>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>런처</TableCell>
                                                <TableCell>
                                                    <TextField value={"dbIndexer.jar"} fullWidth/>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>실행포트</TableCell>
                                                <TableCell>
                                                    <TextField value={"30100"} fullWidth/>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>JDBC</TableCell>
                                                <TableCell>
                                                    <Select value={"market-dev"}>
                                                        <MenuItem value={"market-dev"}>market-dev</MenuItem>
                                                        <MenuItem value={"market-dev1"}>market-dev1</MenuItem>
                                                        <MenuItem value={"market-dev2"}>market-dev2</MenuItem>
                                                    </Select>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>크론주기</TableCell>
                                                <TableCell>
                                                    <Grid container>
                                                        <Grid item xs={11}>
                                                            <TextField value={"30 0 2 * * *"} fullWidth placeholder={"분 시 일 월 요일"}/>
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                            <Link onMouseOver={handleClick('top')}>예제</Link>
                                                            <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                                                                {({ TransitionProps }) => (
                                                                    <Fade {...TransitionProps} timeout={350}>
                                                                        <Paper>
                                                                            <Typography className={classes.typography}>
                                                                                예제<br/>
                                                                                */5 * * * * : 5분마다 한 번씩<br/>
                                                                                */5 * * * * : 5분마다 한 번씩<br/>
                                                                                0 5 1 * * : 매달 1일 새벽 5시에 실행.<br/>
                                                                                0 5,11 * * 0,3 : 매주 일요일과 수요일 새벽 5시와 밤 11시.<br/>
                                                                                0 5,11 * * * : 새벽 5시와 밤 11시
                                                                            </Typography>
                                                                        </Paper>
                                                                    </Fade>
                                                                )}
                                                            </Popper>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>

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

export default connect(store => ({...store.collectionReducers}))(Source);
