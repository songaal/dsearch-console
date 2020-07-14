import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components";

import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
    Box as MuiBox,
    Button as MuiButton,
    Card as MuiCard,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider as MuiDivider,
    Fade,
    Grid as MuiGrid, Grow,
    Link,
    Menu,
    MenuItem, MenuList,
    Paper,
    Popper,
    Select,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableRow, TextareaAutosize,
    TextField,
    Typography as MuiTypography,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {positions, spacing} from "@material-ui/system";
import {ArrowDropDown} from "@material-ui/icons";
import {connect} from "react-redux";
import {
    editCollectionScheduleAction,
    editCollectionSourceAction,
    setCollection
} from "../../../redux/actions/collectionActions";

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


function Source({dispatch, authUser, collection, JdbcList}) {
    const history = useHistory();
    const classes = useStyles();
    const [moreMenu, setMoreMenu] = useState(null)
    const [editModal, setEditModal] = useState(null)
    const [mode, setMode] = useState("VIEW")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(null);
    const [placement, setPlacement] = React.useState();

    const [sourceName, setSourceName] = useState("")
    const [launcher, setLauncher] = useState("")
    const [launcherYaml, setLauncherYaml] = useState("")
    const [host, setHost] = useState("")
    const [port, setPort] = useState("")
    const [jdbcId, setJdbcId] = useState("")
    const [cron, setCron] = useState("")

    const [invalid, setInvalid] = useState({})

    const [actionOpen, setActionOpen] = React.useState(false);
    const actionAnchorRef = React.useRef(null);
    const [isScheduled, setSchedule] = useState(false)

    useEffect(() => {
        setInvalid({})
        if (collection['sourceName'] === undefined || collection['sourceName'] === null || collection['sourceName'] === "") {
            setMode("FORCE_EDIT");
        } else {
            setSourceName(collection['sourceName']);
            setLauncher((collection['launcher']||{})['path']||"");
            setLauncherYaml((collection['launcher']||{})['yaml']||"");
            setHost((collection['launcher']||{})['host']||"");
            setPort((collection['launcher']||{})['port']||"");
            setJdbcId(collection['jdbcId']);
            setCron(collection['cron']);
            setSchedule(Boolean(collection['scheduled']));
        }
    }, [])

    // function toggleMoreMenu(event) {
    //     setMoreMenu(moreMenu === null ? event.currentTarget : null)
    // }

    function toggleEditModal(event) {
        setEditModal(editModal === null ? event.currentTarget : null)
    }

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    }

    function handleSaveProcess() {
        setInvalid({})
        let invalidCheck = {}
        if (sourceName.trim() === "") {
            invalidCheck['sourceName'] = true
        }
        if (launcher.trim() === "") {
            invalidCheck['launcher'] = true
        }
        if (host.trim() === "" || !/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/gi.test(host)) {
            invalidCheck['host'] = true
        }
        if (port === "") {
            invalidCheck['port'] = true
        }
        if (jdbcId === "") {
            invalidCheck['jdbcId'] = true
        }
        if (cron === "" || !/(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)|((((\d+,)+\d+|(\d+(\/|-)\d+)|\d+|\*) ?){5,7})/gi.test(cron)) {
            invalidCheck['cron'] = true
        }

        if (Object.keys(invalidCheck).length > 0) {
            setInvalid(invalidCheck)
            return false
        }

        dispatch(editCollectionSourceAction(collection['id'], {
            sourceName,
            cron,
            jdbcId,
            launcher: {
                path: launcher,
                yaml: launcherYaml,
                host,
                port,
            }
        })).then(response => {
            dispatch(setCollection(collection['id']))
            setMode("VIEW")
        }).catch(error => {
            console.log(error)
            alert(error)
        })
    }



    const handleMenuItemClick = (event, index) => {
        setActionOpen(false);
    };
    const handleToggle = () => {
        setActionOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (actionAnchorRef.current && actionAnchorRef.current.contains(event.target)) {
            return;
        }

        setActionOpen(false);
    };

    function handleEditSchedule(event) {
        const tmpSchedule = !isScheduled
        setSchedule(tmpSchedule)
        dispatch(editCollectionScheduleAction(collection['id'], tmpSchedule)).then(response => {
            setSchedule(tmpSchedule)
        }).catch(error => {
            setSchedule(!tmpSchedule)
        })
    }

    const jdbcHitList = JdbcList['hits']['hits']
    if (jdbcHitList.length === 0) {
        return (
            <React.Fragment>
                <br/><br/>
                <Box>
                    JDBC 등록 후 진행해주세요.
                    <Button variant={"text"}
                            color={"primary"}
                            onClick={() => history.push("../jdbc")}
                    >
                        JDBC 이동하기.
                    </Button>
                </Box>
            </React.Fragment>
        )
    }

    const options = ['연속실행', '색인실행', '전파실행', '교체실행'];
    // authUser.role.index = false;
    console.log(authUser);
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
                                        <Switch checked={isScheduled}
                                                onChange={handleEditSchedule}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container my={3}>
                                    <Grid item xs={3} mt={2}>
                                        <b>상태</b>
                                    </Grid>
                                    {/*<Grid item xs={2} mt={2}>*/}
                                    {/*    */}
                                    {/*</Grid>*/}
                                    <Grid item xs={9}>

                                        <ButtonGroup variant="contained" color="primary" ref={actionAnchorRef}>
                                            {/*<Button >{options[selectedIndex]}</Button>*/}
                                            <Button disabled={true} style={{minWidth: "100px", color: "black"}}> 대기 </Button>
                                            {authUser.role.index ? <Button
                                                color="primary"
                                                size="small"
                                                onClick={handleToggle}
                                            >
                                                <ArrowDropDownIcon/>
                                            </Button> : <></> }
                                        </ButtonGroup>
                                        <Popper open={actionOpen} anchorEl={actionAnchorRef.current} role={undefined}
                                                transition disablePortal>
                                            {({TransitionProps, placement}) => (
                                                <Grow
                                                    {...TransitionProps}
                                                    style={{
                                                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                                    }}
                                                >
                                                    <Paper>
                                                        <ClickAwayListener onClickAway={handleClose}>
                                                            <MenuList id="split-button-menu">
                                                                {options.map((option, index) => (
                                                                    <MenuItem
                                                                        key={option}
                                                                        onClick={(event) => handleMenuItemClick(event, index)}
                                                                    >
                                                                        {option}
                                                                    </MenuItem>
                                                                ))}
                                                            </MenuList>
                                                        </ClickAwayListener>
                                                    </Paper>
                                                </Grow>
                                            )}
                                        </Popper>

                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2} align={"right"}>
                                {authUser.role.index ? <Button mx={1} variant={"outlined"} onClick={() => setMode("EDIT")}>
                                    수정
                                </Button> : <></>}
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12}>
                                <Box>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>런처</TableCell>
                                                <TableCell>
                                                    {(collection['launcher'] || {})['path']}
                                                    <Link style={{cursor: "pointer", marginLeft: "5px"}}
                                                          onClick={toggleEditModal}
                                                    >수집설정</Link>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>실행호스트</TableCell>
                                                <TableCell>{(collection['launcher'] || {})['host']}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>실행포트</TableCell>
                                                <TableCell>{(collection['launcher'] || {})['port'] === 0 ? "" : (collection['launcher'] || {})['port']}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>JDBC</TableCell>
                                                <TableCell>
                                                    {
                                                        jdbcHitList.filter(jdbcObj => collection['jdbcId'] === jdbcObj['_id'])
                                                            .map(jdbcObj => {
                                                                return (
                                                                    <React.Fragment key={jdbcObj['_source']['name']}>
                                                                        {jdbcObj['_source']['name']}
                                                                    </React.Fragment>
                                                                )
                                                            })
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>크론주기</TableCell>
                                                <TableCell> {collection['cron']} </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>


                    {/*======================================= EDIT MODE  ===========================================*/}

                    <Box style={{display: mode === "EDIT" || mode === "FORCE_EDIT" ? "block" : "none"}}>
                        <Grid container>
                            <Grid item xs={10}>

                            </Grid>
                            <Grid item xs={2} align={"right"}>
                                <Button mx={1} variant={"outlined"} onClick={handleSaveProcess}>
                                    저장
                                </Button>
                                <Button style={{display: mode === 'EDIT' ? "inline" : "none"}} mx={1}
                                        variant={"outlined"} onClick={() => setMode("VIEW")}>
                                    취소
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
                                                    <TextField value={sourceName}
                                                               onChange={event => setSourceName(event.target.value)}
                                                               fullWidth
                                                               error={invalid['sourceName']||false}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>런처</TableCell>
                                                <TableCell>
                                                    <TextField value={launcher}
                                                               onChange={event => setLauncher(event.target.value)}
                                                               fullWidth
                                                               error={invalid['launcher']||false}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>런처 YAML</TableCell>
                                                <TableCell>
                                                    <TextareaAutosize value={launcherYaml}
                                                                      onChange={event => setLauncherYaml(event.target.value)}
                                                                      style={{width: "100%", minHeight: "200px"}}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>실행호스트</TableCell>
                                                <TableCell>
                                                    <TextField value={host}
                                                               onChange={event => setHost(event.target.value)}
                                                               fullWidth
                                                               placeholder={"127.0.0.1"}
                                                               error={invalid['host']||false}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>실행포트</TableCell>
                                                <TableCell>
                                                    <TextField value={port}
                                                               onChange={event => setPort(event.target.value)}
                                                               fullWidth
                                                               placeholder={"30100"}
                                                               type={"number"}
                                                               error={invalid['port']||false}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>JDBC</TableCell>
                                                <TableCell>
                                                    <Select value={jdbcId}
                                                            onChange={event => setJdbcId(event.target.value)}
                                                            style={{minWidth: "100%"}}
                                                            error={invalid['jdbcId']||false}
                                                    >
                                                        {
                                                            jdbcHitList.map((jdbcObj, index) => {
                                                                return (
                                                                    <MenuItem key={jdbcObj['_id']}
                                                                              value={jdbcObj['_id']}
                                                                    >
                                                                        {jdbcObj['_source']['name']}
                                                                    </MenuItem>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant={"head"} component={"th"}>크론주기</TableCell>
                                                <TableCell>
                                                    <Grid container>
                                                        <Grid item xs={11}>
                                                            <TextField value={cron}
                                                                       onChange={event => setCron(event.target.value)}
                                                                       fullWidth
                                                                       placeholder={"분 시 일 월 요일"}
                                                                       error={invalid['cron']||false}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                            <Link onMouseOver={handleClick('top')}>예제</Link>
                                                            <Popper open={Boolean(open)} anchorEl={anchorEl}
                                                                    placement={placement} transition>
                                                                {({TransitionProps}) => (
                                                                    <Fade {...TransitionProps} timeout={350}>
                                                                        <Paper>
                                                                            <Typography className={classes.typography}>
                                                                                예제<br/>
                                                                                */5 * * * * : 5분마다 한 번씩<br/>
                                                                                */5 * * * * : 5분마다 한 번씩<br/>
                                                                                0 5 1 * * : 매달 1일 새벽 5시에 실행.<br/>
                                                                                0 5,11 * * 0,3 : 매주 일요일과 수요일 새벽 5시와 밤
                                                                                11시.<br/>
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

            <Dialog open={Boolean(editModal)}
                    fullWidth
                    onClose={toggleEditModal}
            >
                <DialogTitle>
                    설정
                </DialogTitle>
                <DialogContent>
                    <pre>
                        {(collection['launcher'] || {})['yaml']}
                    </pre>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleEditModal}>닫기</Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}

export default connect(store => ({
    authUser: store.fastcatxReducers.authUser,
    ...store.collectionReducers, 
    ...store.jdbcReducers
}))(Source);
