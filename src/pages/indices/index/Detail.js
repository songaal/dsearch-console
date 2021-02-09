import React, {useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import Async from '~/components/Async';
import styled from "styled-components";
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Helmet from 'react-helmet';
import AntTabs from "~/components/AntTabs"
import IndicesSelect from "~/components/IndicesSelect";
import {
    Box,
    Grid,
    Button,
    Divider as MuiDivider,
    Typography,
    CircularProgress, Snackbar, Backdrop
} from "@material-ui/core";
import {useHistory, useLocation} from "react-router-dom";
import {spacing} from "@material-ui/system";
import {
    deleteIndexAction,
    setIndexAction,
    setIndexAliasesAction, setIndexDocumentSourceListAction,
    setIndexInfoListAction, setIndexManagedAction,
    setIndexMappingsAction,
    setIndexSettingsAction,
    setIndexStateAction
} from "../../../redux/actions/indicesActions";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemText from '@material-ui/core/ListItemText';
import {red} from "@material-ui/core/colors";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Divider = styled(MuiDivider)(spacing);
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));
const StyledMenuItem = withStyles((theme) => ({
    root: {
        minWidth: "150px",
        // '&:focus': {
        //     backgroundColor: theme.palette.primary.main,
        //     '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        //         color: theme.palette.common.white,
        //     },
        // },
    },
}))(MenuItem);


const tabs = [
    {label: "개요", component: Async(() => import("./Summary"))},
    {label: "매핑", component: Async(() => import("./Mapping"))},
    {label: "셋팅", component: Async(() => import("./Setting"))},
    {label: "통계", component: Async(() => import("./Statistics"))},
    {label: "데이터", component: Async(() => import("./Data"), { time: 1000 })},
];

function Index({indexInfoList, settings}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const qs = new URLSearchParams(location.search)
    const { indices, index } = useSelector(store => ({...store.indicesReducers}))
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [process, setProcess] = React.useState(false);
    const [openRemoveModal, setOpenRemoveModal] = React.useState(false)
    const [deleteIndex, setDeleteIndex] = React.useState('')
    const [tabIndex] = React.useState(qs.get("tab")||0)
    const [openBackDrop, setOpenBackDrop] = React.useState(false);
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: ""
    });
    const { vertical, horizontal, open } = state;

    const handleSnackbarClose = () => {
        setState({ ...state, open: false });
    };

    useEffect(() => {
        const uuid = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
        const searchIndex = indices.find(obj => obj['uuid'] === uuid)
        if (searchIndex) {
            dispatch(setIndexAction(searchIndex['index']))
        }
    }, [indices]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (index) {
            dispatch(setIndexStateAction(index))
            dispatch(setIndexAliasesAction(index))
            dispatch(setIndexInfoListAction(index))
            dispatch(setIndexSettingsAction(index))
            dispatch(setIndexMappingsAction(index))
            dispatch(setIndexDocumentSourceListAction({index, from: 0, size: 100, columns: [], searchKeyword: ''}))
        }
    }, [index]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleIndexAction = (event, action, index) => {
        setProcess(true)
        handleClose()

        if ('delete' === action) {
            setDeleteIndex(index)
            setOpenRemoveModal(true);
            // dispatch(deleteIndexAction(index))
            //     .then(response => {
            //         setProcess(false)
            //         setState({ ...state, open: true, message: "삭제되었습니다." })
            //         history.push('../indices')
            //     })
            //     .catch(error => {
            //         setProcess(false)
            //         setState({ ...state, open: true, message: "요청이 실패하였습니다." })
            //     })
        } else {
            dispatch(setIndexManagedAction(action, index))
                .then(response => {
                    setTimeout(() => {
                        dispatch(setIndexAliasesAction(index))
                        dispatch(setIndexInfoListAction(index))
                        dispatch(setIndexSettingsAction(index))
                        dispatch(setIndexStateAction(index))
                        setState({ ...state, open: true, message: "적용되었습니다." })
                        setProcess(false)
                    }, 1000)
                })
                .catch(error => {
                    setTimeout(() => {
                        dispatch(setIndexAliasesAction(index))
                        dispatch(setIndexInfoListAction(index))
                        dispatch(setIndexSettingsAction(index))
                        dispatch(setIndexStateAction(index))
                        setState({ ...state, open: true, message: "요청이 실패하였습니다." })
                        setProcess(false)
                    }, 1000)
                })
        }
    }

    function handleCancel(){
        setProcess(false);
        setOpenRemoveModal(false);
    }

    function handleDeleteIndex(event) {
        
        dispatch(deleteIndexAction(deleteIndex))
            .then(response => {
                setProcess(false)
                setState({ ...state, open: true, message: "삭제되었습니다." })
                history.push('../indices')
            })
            .catch(error => {
                setProcess(false)
                setState({ ...state, open: true, message: "요청이 실패하였습니다." })
            })
            setOpenRemoveModal(false);
    }

    function handleChangeIndex(index) {
        setOpenBackDrop(true)
        setTimeout(()=> setOpenBackDrop(false), 2000)
    }

    return (
        <React.Fragment>
            <Helmet title="인덱스"/>

            <IndicesSelect onSelected={handleChangeIndex}/>
            <Backdrop className={classes.backdrop} open={openBackDrop}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h3" gutterBottom display="inline">인덱스</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box align={"right"}>
                        {
                            process ?
                                <CircularProgress color="secondary"/>
                                :
                                <Button
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                    color="primary"
                                    style={{minWidth: "150px"}}
                                    onClick={handleClick}
                                >
                                    관리
                                </Button>
                        }
                        <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {
                                indexInfoList.length === 0 ?
                                    null
                                    :
                                    <Box>
                                        {
                                            indexInfoList[0]['status'] === 'open' ?
                                                <StyledMenuItem onClick={event => handleIndexAction(event, "_close", indexInfoList[0]['index'])}>
                                                    <ListItemText primary="인덱스 닫기" />
                                                </StyledMenuItem>
                                                :
                                                <StyledMenuItem onClick={event => handleIndexAction(event, "_open", indexInfoList[0]['index'])}>
                                                    <ListItemText primary="인덱스 열기" />
                                                </StyledMenuItem>
                                        }
                                        <StyledMenuItem onClick={event => handleIndexAction(event, "_forcemerge", indexInfoList[0]['index'])}>
                                            <ListItemText primary="인덱스 강제 머징" />
                                        </StyledMenuItem>
                                        <StyledMenuItem onClick={event => handleIndexAction(event, "_refresh", indexInfoList[0]['index'])}>
                                            <ListItemText primary="인덱스 리프레쉬" />
                                        </StyledMenuItem>
                                        <StyledMenuItem onClick={event => handleIndexAction(event, "_flush", indexInfoList[0]['index'])}>
                                            <ListItemText primary="인덱스 플러시" />
                                        </StyledMenuItem>

                                        {
                                            ((settings['settings']||{})['index']||{})['frozen'] === 'true' ?
                                                <StyledMenuItem onClick={event => handleIndexAction(event, "_unfreeze", indexInfoList[0]['index'])}>
                                                    <ListItemText primary="인덱스 동결 해제" />
                                                </StyledMenuItem>
                                                :
                                                <StyledMenuItem onClick={event => handleIndexAction(event, "_freeze", indexInfoList[0]['index'])}>
                                                    <ListItemText primary="인덱스 동결" />
                                                </StyledMenuItem>
                                        }

                                        <StyledMenuItem style={{backgroundColor: red["400"]}}
                                            onClick={event => handleIndexAction(event, "delete", indexInfoList[0]['index'])}>
                                            <ListItemText primary="인덱스 삭제" />
                                        </StyledMenuItem>
                                    </Box>
                            }
                        </StyledMenu>

                    </Box>
                </Grid>
            </Grid>
            


            <Divider my={6} />

            <AntTabs tabs={tabs} tabIndex={tabIndex} />


            <Dialog open={openRemoveModal} fullWidth={true}>
                <DialogTitle>인덱스 삭제</DialogTitle>
                <DialogContent>
                    <Box style={{color: red['500']}}> 선택하신 인덱스를 삭제 하시겠습니까? </Box>
                </DialogContent>
                <DialogActions>
                    <Button style={{backgroundColor: red['200']}}
                            variant="contained"
                            onClick={handleDeleteIndex}
                    >
                        삭제
                    </Button>
                    <Button onClick={() => handleCancel()}
                            variant="contained"
                    >
                        취소
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                color={"info"}
                anchorOrigin={{  vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={handleSnackbarClose}
                message={state['message']}
                key={vertical + horizontal}
            />

        </React.Fragment>
    );
}

export default connect(store => ({ ...store.indicesReducers }))(Index);
