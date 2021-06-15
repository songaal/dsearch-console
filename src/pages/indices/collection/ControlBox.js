import React, {useEffect, useState} from "react";
import styled from "styled-components";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
    Box as MuiBox,
    Button as MuiButton,
    CircularProgress,
    Grid as MuiGrid,
    Grow,
    LinearProgress,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Snackbar,
    Switch,
} from "@material-ui/core";
import {positions, spacing} from "@material-ui/system";
import Alert from '@material-ui/lab/Alert';
import {
    editCollectionAction,
    editCollectionScheduleAction,
    setCollection,
    setCollectionJob
} from "../../../redux/actions/collectionActions";
import {connect} from "react-redux";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import ScheduleIcon from '@material-ui/icons/Schedule';

const Box = styled(MuiBox)(spacing, positions);
const Button = styled(MuiButton)(spacing, positions);
const Grid = styled(MuiGrid)(spacing, positions);

// const useStyles = makeStyles((theme) => ({
//     formControl: {
//         minWidth: 250,
//     },
//     root: {
//         flexGrow: 1,
//         width: '100%',
//     },
//     edit: {
//         width: '100%'
//     },
//     typography: {
//         padding: theme.spacing(2),
//     },
// }));

// let testScheduleFlag = true
let timer = null


let pollingDelay = 2000
function ControlBox({dispatch, authUser, collection, job}) {
    const [actionOpen, setActionOpen] = React.useState(false);
    const actionAnchorRef = React.useRef(null);
    const [connected, setConnected] = useState(false)
    const [processUI, setProcessUI] = useState(false)
    const [errorSnackbar, setErrorSnackbar] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    // job이 있을 경우 데이터가 생김..
    const isRunningJob = job['status'] ? true : false

    // useEffect(() => {
    //     dispatch(setCollection(collection['id']))
    // }, [])

    useEffect(() => {
        dispatch(setCollection(collection['id']))
        
        const fetchJob = () => {
            dispatch(setCollectionJob(collection['id']))
                .then(job => {
                    setConnected(true); 
                    if (timer != null) {
                        try {
                            clearTimeout(timer)
                            timer = null
                        } catch(err) {}
                    }
                    timer = setTimeout(fetchJob, pollingDelay)
                })
                .catch(error => {
                    setConnected(false); 
                    if (timer != null) {
                        try {
                            clearTimeout(timer)
                            timer = null
                        } catch(err) {}
                    }
                    timer = setTimeout(fetchJob, pollingDelay)
                })
        }
        if (timer != null) {
            try {
                clearTimeout(timer)
                timer = null
            } catch(err) {}
        }

        timer = setTimeout(() => fetchJob(), 500);
        return () => {
            try {
                clearTimeout(timer)
            } catch(error) {
                // ignore..
            }
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleMenuItemClick = (event, option, index) => {
        if ('연속실행' === option) {
            handleAction('all')
        } else if ('색인실행' === option) {
            handleAction('indexing')
        } else if ('전파실행' === option) {
            handleAction('propagate')
        } else if ('교체실행' === option) {
            handleAction('expose')
        }
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
        setProcessUI(true)
        collection['scheduled'] = event.target.checked;
        dispatch(editCollectionScheduleAction(collection['id'], collection))
            .then(response => {
                dispatch(setCollection(collection['id']))
                setTimeout(() => {
                    setProcessUI(false)
                }, 2000)
            })
            .catch(error => {
                console.log(error)
                setErrorMessage("" + error)
                setErrorSnackbar(true)
                dispatch(setCollection(collection['id']))
                setTimeout(() => {
                    setProcessUI(false)
                }, 2000)
            })
    }
    function handleAction(action) {
        setProcessUI(true)
        // actions: all, indexing, propagate, expose, stop_propagation, stop_indexing
        dispatch(editCollectionAction(collection['id'], action))
            .then(response => {
                dispatch(setCollection(collection['id']))
                setTimeout(() => {
                    setProcessUI(false)
                }, 4000)
            })
            .catch(error => {
                console.log(error)
                setErrorMessage("" + error)
                setErrorSnackbar(true)
                dispatch(setCollection(collection['id']))
                setTimeout(() => {
                    setProcessUI(false)
                }, 4000)
            })
    }

    function handleErrorSnackbarClose() {
        setErrorSnackbar(false)
    }

    if (connected === false) {
        return (
            <Grid container my={0} ml={4}>
                <Grid item xs={9} mt={2} style={{alignSelf: "center"}}>
                    <Box>
                        연결 중...
                    </Box>
                    <Box>
                        <CircularProgress m={2} color="secondary" />
                    </Box>
                </Grid>
            </Grid>
        )
    }

    if (processUI) {
        return (
            <Grid container my={0} ml={4}>
                <Grid item xs={3} >
                    <Grid container my={3}>
                        <Grid item xs={3} mt={2}>
                            <Box style={{fontWeight: "bold"}}>스케쥴</Box>
                        </Grid>
                        <Grid item xs={9}>
                        </Grid>
                    </Grid>

                    <Grid container my={3}>
                        <Grid item xs={3} mt={5} style={{height: '37px'}}>
                            <b>상태</b>
                        </Grid>
                        <Grid item xs={9}>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={9} mt={2} style={{alignSelf: "center"}}>
                    <Box>
                        <CircularProgress m={2} color="secondary" />
                    </Box>
                </Grid>
            </Grid>
        )
    }

    let options = ['연속실행', '색인실행', '전파실행', '교체실행'];
    // if (typeof collection['ignoreRoleYn'] === "string" && collection['ignoreRoleYn'] === "Y") {
    //     options = ['연속실행', '색인실행', '교체실행'];
    // }

    return (
        <React.Fragment>
            <Grid container my={3} ml={4}>
                <Grid item xs={3} mt={2}>
                    <Box style={{fontWeight: "bold"}}>스케쥴</Box>
                </Grid>
                <Grid item xs={9}>
                    <Switch onChange={handleEditSchedule}
                            checked={collection['scheduled']}
                            disabled={!authUser.role.index}
                    />
                </Grid>
            </Grid>

            <Grid container my={3} ml={4}>
                <Grid item xs={3} mt={2} style={{height: '40px'}}>
                    <b>상태</b>
                </Grid>
                <Grid item xs={9}>
                    {/* 컨트롤 가능한 상태 */}
                    <Box style={{display: isRunningJob === false && collection['scheduled'] === false ? "block" : "none"}}>
                        <ButtonGroup variant="contained" color="primary" ref={actionAnchorRef}>
                            <Button disabled={true}
                                    style={{width: '100%', minWidth: "150px", maxWidth: "300px", color: "black"}}
                            >
                                수동 실행
                            </Button>
                            {authUser.role.index ?
                                <Button
                                    color="primary"
                                    size="small"
                                    onClick={handleToggle}
                                    disabled={!authUser.role.index}
                                >
                                    <ArrowDropDownIcon/>
                                </Button>
                                :
                                <></>
                            }
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
                                                        onClick={(event) => handleMenuItemClick(event, option, index)}
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
                    </Box>
                    <Box style={{
                        display: isRunningJob === false && collection['scheduled'] === true ? "block" : "none",
                        width: '100%', minWidth: "150px", maxWidth: "400px", color: "black" }}
                    >
                        <Alert iconMapping={{ success: <ScheduleIcon fontSize="inherit" /> }}
                               severity="success"
                               style={{display: isRunningJob ? 'none' : 'flex'}}
                        >스케쥴 대기중</Alert>
                    </Box>

                    <Box style={{
                        display: (isRunningJob === true && collection['scheduled'] === false) || (isRunningJob === true && collection['scheduled'] === true) ? "block" : "none",
                        width: '100%', minWidth: "150px", maxWidth: "400px", color: "black" }}
                    >
                        <Box style={{display: job['currentStep'] === 'FULL_INDEX' || job['currentStep'] === 'DYNAMIC_INDEX' ? 'block' : 'none' }}>
                            <Alert iconMapping={{ info: <PlayCircleOutlineIcon fontSize="inherit" style={{alignSelf: "center"}}/> }}
                                   severity="info"
                                   action={<Button color="inherit" style={{border: "1px solid silver"}} size="small" onClick={() => handleAction('stop_indexing')}> 정지 </Button> }
                            >
                                <LinearProgress/>
                                <Box mt={2}>
                                    색인을 진행하고 있습니다.
                                </Box>
                            </Alert>
                        </Box>

                        <Box style={{display: job['currentStep'] === 'PROPAGATE' ? 'block' : 'none' }}>
                            <Alert iconMapping={{ info: <PlayCircleOutlineIcon fontSize="inherit" style={{alignSelf: "center"}}/> }}
                                   severity="info"
                                   action={<Button color="inherit" style={{border: "1px solid silver"}} size="small" onClick={() => handleAction('stop_propagation')}> 취소 </Button> }
                            >
                                <LinearProgress />
                                <Box mt={2}>
                                    전파를 진행하고 있습니다.
                                </Box>
                            </Alert>
                        </Box>

                        <Box style={{display: job['currentStep'] === 'EXPOSE' ? 'block' : 'none' }}>
                            <Alert iconMapping={{ info: <PlayCircleOutlineIcon fontSize="inherit" /> }}
                                   severity="info"
                            >
                                <LinearProgress />
                                교체를 진행하고 있습니다.
                            </Alert>
                        </Box>

                    </Box>

                </Grid>
            </Grid>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
                autoHideDuration={6000}
                open={errorSnackbar}
                onClose={handleErrorSnackbarClose}
                severity="error"
                message={"요청이 실패되었습니다. " + errorMessage}
                key={"errorSnackbar"}
            />
        </React.Fragment>
    )
}

export default connect(store => ({ authUser: store.dsearchReducers.authUser, ...store.collectionReducers }))(ControlBox);
