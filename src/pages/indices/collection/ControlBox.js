import React, {useEffect, useState} from "react";
import styled from "styled-components";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
    Box as MuiBox,
    Button as MuiButton,
    Grid as MuiGrid,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Switch,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {positions, spacing} from "@material-ui/system";
import {editCollectionScheduleAction, setCollectionJob} from "../../../redux/actions/collectionActions";
import {connect} from "react-redux";

const Box = styled(MuiBox)(spacing, positions);
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

const options = ['연속실행', '색인실행', '전파실행', '교체실행'];

let eventCode = null
function ControlBox({dispatch, authUser, collection}) {
    const [actionOpen, setActionOpen] = React.useState(false);
    const actionAnchorRef = React.useRef(null);
    const [isScheduled, setSchedule] = useState(false)
    const [connecting, setConnecting] = useState(false)

    useEffect(() => {
        if (eventCode != null) {
            clearTimeout(eventCode)
            eventCode = null
        }
        const fetchJob = () => {
            dispatch(setCollectionJob(collection['id'])).then(job => {

                setTimeout(fetchJob, 1000)
            }).catch(error => {
                setConnecting(true)
                setTimeout(fetchJob, 1000)
            })
        }
        fetchJob()
        return () => {
            if (eventCode != null) {
                clearTimeout(eventCode)
                eventCode = null
            }
        }
    }, [collection])

    const handleMenuItemClick = (event, option, index) => {
        if ('연속실행' === option) {
            alert('연속실행')
        } else if ('색인실행' === option) {
            alert('색인실행')
        } else if ('전파실행' === option) {
            alert('전파실행')
        } else if ('교체실행' === option) {
            alert('교체실행')
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
        const tmpSchedule = !isScheduled
        setSchedule(tmpSchedule)
        dispatch(editCollectionScheduleAction(collection['id'], tmpSchedule)).then(response => {
            setSchedule(tmpSchedule)
        }).catch(error => {
            setSchedule(!tmpSchedule)
        })
    }

    return (
        <React.Fragment>
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

                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default connect(store => ({ authUser: store.fastcatxReducers.authUser, ...store.collectionReducers }))(ControlBox);
