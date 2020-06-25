import React, {useEffect} from "react";
import {connect} from 'react-redux';
import styled from "styled-components";
import Helmet from 'react-helmet';
import {spacing} from "@material-ui/system";
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import {
    Box,
    Button,
    Card as MuiCard,
    CardContent,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider as MuiDivider,
    Grid,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField as MuiTextField,
    Typography,
} from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import {ArrowDropDown} from "@material-ui/icons";
import red from '@material-ui/core/colors/red';
import {
    addRoleAction,
    editRoleAction,
    removeRoleAction,
    setRoleListAction
} from "../../redux/actions/roleManagementActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import fastcatxReducers from "../../redux/reducers/fastcatxReducers";

const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);


const useStyles = makeStyles({
    table: {
        minWidth: 600,
    },
    roleTable: {
        marginTop: "30px",
        minWidth: 300
    },
    warning: {
        color: red[500],
        marginTop: "30px"
    }
});

const StyledTableCell = withStyles((theme) => ({
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);


const TextFieldSpacing = styled(MuiTextField)(spacing);

const TextField = styled(TextFieldSpacing)`
  width: 100%;
`;

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
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

function Role({dispatch, roleList, userRolesList, authUser}) {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedId, setSelectedId] = React.useState("")

    const [openDropDown, setOpenDropDown] = React.useState(null);
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);

    const [name, setName] = React.useState("");
    const [nameError, setNameError] = React.useState(false);
    const [analysis, setAnalysis] = React.useState(false);
    const [index, setIndex] = React.useState(false);
    const [search, setSearch] = React.useState(false);
    const [manage, setManage] = React.useState(false);

    useEffect(() => {
        dispatch(setRoleListAction())
    }, [])


    function handleSelectCheckbox(id) {
        if (selectedId === id) {
            setSelectedId("")
        } else {
            setSelectedId(id)
        }
    }

    function toggleDropDownButton(event) {
        if (openDropDown === null) {
            setOpenDropDown(event.currentTarget);
        } else {
            setOpenDropDown(null);
        }
    }

    function toggleAddModal(){
        setName("")
        setAnalysis(false)
        setIndex(false)
        setSearch(false)
        setManage(false)
        setOpenAddModal(!openAddModal);
    }

    function handleRoleAddProcess() {
        if (name === "") {
            setNameError(true)
            return false
        }
        dispatch(addRoleAction({
            name, analysis, index, search, manage
        })).then(response => {
            console.log(response)
        }).catch(error => {
            console.error(error)
        }).finally(() => {
            dispatch(setRoleListAction())
            toggleAddModal()
            toggleDropDownButton()
        })
    }



    function toggleEditModal() {
        if (openEditModal === false) {
            const role = roleList.find(role => role['id'] === selectedId)
            setName(role['name'])
            setAnalysis(role['analysis'])
            setIndex(role['index'])
            setSearch(role['search'])
            setManage(role['manage'])
        } else {
            dispatch(setRoleListAction())
        }
        setOpenEditModal(!openEditModal)
    }

    function handleRoleEditProcess() {
        if (name === "") {
            setNameError(true)
            return false
        }
        dispatch(editRoleAction(selectedId, {
            name, analysis, index, search, manage
        })).then(response => {
            console.log(response)
            toggleEditModal()
        }).catch(error => {
            console.error(error)
            alert("실패")
        }).finally(() => {
            toggleDropDownButton()
        })
    }

    function handleRoleRemoveProcess() {
        dispatch(removeRoleAction(selectedId))
            .then(response => setSelectedId(""))
            .finally(() => {
                toggleDropDownButton()
                dispatch(setRoleListAction())
            })
    }

    const isManager = authUser['role']['manage']

    return (
        <React.Fragment>
            <Helmet title="역할"/>
            <Typography variant="h3" gutterBottom display="inline">
                역할
            </Typography>

            <Divider my={6}/>

            <Grid container spacing={6} alignItems="center" justify="center">
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <div align={"right"} style={{display: isManager ? 'block' : 'none'}}>
                                <Button
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                    color="primary"
                                    onClick={toggleDropDownButton}
                                >
                                    작업
                                    <ArrowDropDown/>
                                </Button>

                                <StyledMenu
                                    id="customized-menu"
                                    anchorEl={openDropDown}
                                    keepMounted
                                    open={Boolean(openDropDown)}
                                    onClose={toggleDropDownButton}
                                >
                                    <StyledMenuItem onClick={toggleAddModal}>
                                        <ListItemIcon>
                                            <InboxIcon fontSize="small"/>
                                        </ListItemIcon>
                                        <ListItemText primary="추가"/>
                                    </StyledMenuItem>
                                    <StyledMenuItem disabled={selectedId === ""} onClick={toggleEditModal}>
                                        <ListItemIcon>
                                            <SendIcon fontSize="small"/>
                                        </ListItemIcon>
                                        <ListItemText primary="수정"/>
                                    </StyledMenuItem>
                                    <StyledMenuItem disabled={selectedId === "" || userRolesList.find(userRoles => userRoles['roleId'] === selectedId) !== undefined } onClick={handleRoleRemoveProcess}>
                                        <ListItemIcon>
                                            <DraftsIcon fontSize="small"/>
                                        </ListItemIcon>
                                        <ListItemText primary="삭제"/>
                                    </StyledMenuItem>
                                </StyledMenu>
                            </div>

                            <TableContainer>
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            {
                                                isManager ?
                                                    <StyledTableCell align="center" style={{width: "10%"}}>#</StyledTableCell>
                                                    :
                                                    null
                                            }
                                            <StyledTableCell align="center" style={{width: "40%"}}>역할</StyledTableCell>
                                            <StyledTableCell align="center" style={{width: "10%"}}>분석 권한</StyledTableCell>
                                            <StyledTableCell align="center" style={{width: "10%"}}>인덱스 권한</StyledTableCell>
                                            <StyledTableCell align="center" style={{width: "10%"}}>검색 권한</StyledTableCell>
                                            <StyledTableCell align="center" style={{width: "10%"}}>관리 권한</StyledTableCell>
                                            <StyledTableCell align="center" style={{width: "10%"}}>사용 여부</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {roleList.map(row => (
                                            <StyledTableRow key={row['id']}>
                                                {
                                                    isManager ?
                                                        <StyledTableCell component="th"
                                                                         scope="row"
                                                                         align="center"
                                                        >
                                                            <Checkbox color="primary"
                                                                      checked={selectedId === row['id']}
                                                                      onChange={event => handleSelectCheckbox(row['id'], event.target.checked)}
                                                            />
                                                        </StyledTableCell>
                                                        :
                                                        null
                                                }
                                                <StyledTableCell align="center">
                                                    {row['name'] || ''}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Checkbox checked={row['analysis']}/>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Checkbox checked={row['index']}/>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Checkbox checked={row['search']}/>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Checkbox checked={row['manage']}/>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {
                                                        userRolesList.find(userRoles => userRoles['roleId'] === row['id']) ?
                                                            <Box component={"span"}>사용</Box>
                                                            :
                                                            <Box component={"span"}>미사용</Box>
                                                    }
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Dialog open={openAddModal}
                    onClose={toggleAddModal}
                    fullScreen={fullScreen}
            >
                <DialogTitle id="form-dialog-title">역할 추가</DialogTitle>
                <DialogContent>

                    <form noValidate autoComplete="off">

                        <Grid container spacing={6}>
                            <Grid item xs={3}> 이름 </Grid>
                            <Grid item xs={8}>
                                <TextField value={name} onChange={event => setName(event.target.value)} error={nameError}/>
                            </Grid>
                        </Grid>

                        <Grid container className={classes.roleTable}>
                            <Grid item xs={3}>
                                권한
                            </Grid>
                            <Grid item xs={8}>

                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">쓰기권한</TableCell>
                                            <TableCell align="center">영역</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center">
                                                <Switch
                                                    color="primary"
                                                    name="checkedB"
                                                    inputProps={{'aria-label': 'primary checkbox'}}
                                                    checked={analysis}
                                                    onChange={event => setAnalysis(event.target.checked)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                분석
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center">
                                                <Switch
                                                    color="primary"
                                                    name="checkedB"
                                                    inputProps={{'aria-label': 'primary checkbox'}}
                                                    checked={index}
                                                    onChange={event => setIndex(event.target.checked)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                인덱스
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center">
                                                <Switch
                                                    color="primary"
                                                    name="checkedB"
                                                    inputProps={{'aria-label': 'primary checkbox'}}
                                                    checked={search}
                                                    onChange={event => setSearch(event.target.checked)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                검색
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center">
                                                <Switch
                                                    color="primary"
                                                    name="checkedB"
                                                    inputProps={{'aria-label': 'primary checkbox'}}
                                                    checked={manage}
                                                    onChange={event => setManage(event.target.checked)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                관리
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12} m={5}>
                                <Box className={classes.warning}>
                                    * 모든영역에 대한 읽기권한은 기본적으로 존재합니다.
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRoleAddProcess} color="primary"> 추가 </Button>
                    <Button onClick={toggleAddModal} color="primary"> 취소 </Button>
                </DialogActions>
            </Dialog>



            <Dialog open={openEditModal}
                    onClose={toggleEditModal}
                    fullScreen={fullScreen}
            >
                <DialogTitle id="form-dialog-title">역할 수정 </DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={6}>
                            <Grid item xs={3}> 이름 </Grid>
                            <Grid item xs={8}>
                                <TextField value={name} onChange={event => setName(event.target.value)} error={nameError}/>
                            </Grid>
                        </Grid>

                        <Grid container className={classes.roleTable}>
                            <Grid item xs={3}>
                                권한
                            </Grid>
                            <Grid item xs={8}>

                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">쓰기권한</TableCell>
                                            <TableCell align="center">영역</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center">
                                                <Switch
                                                    color="primary"
                                                    name="checkedB"
                                                    inputProps={{'aria-label': 'primary checkbox'}}
                                                    checked={analysis}
                                                    onChange={event => setAnalysis(event.target.checked)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                분석
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center">
                                                <Switch
                                                    color="primary"
                                                    name="checkedB"
                                                    inputProps={{'aria-label': 'primary checkbox'}}
                                                    checked={index}
                                                    onChange={event => setIndex(event.target.checked)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                인덱스
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center">
                                                <Switch
                                                    color="primary"
                                                    name="checkedB"
                                                    inputProps={{'aria-label': 'primary checkbox'}}
                                                    checked={search}
                                                    onChange={event => setSearch(event.target.checked)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                검색
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center">
                                                <Switch
                                                    color="primary"
                                                    name="checkedB"
                                                    inputProps={{'aria-label': 'primary checkbox'}}
                                                    checked={manage}
                                                    onChange={event => setManage(event.target.checked)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                관리
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} ml={5} mr={5} mb={5} mt={3}>
                                <Box className={classes.warning}>
                                    * 모든영역에 대한 읽기권한은 기본적으로 존재합니다.
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRoleEditProcess} color="primary"> 수정 </Button>
                    <Button onClick={toggleEditModal} color="primary"> 취소 </Button>
                </DialogActions>
            </Dialog>



        </React.Fragment>
    );
}

export default connect(store => ({...store.roleManagementReducers, ...store.fastcatxReducers}))(Role);