import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
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
    FormControl as MuiFormControl, FormControlLabel,
    Grid,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Select as MuiSelect,
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
import {
    addUserAction, removeUserAction,
    resetPasswordAction,
    setUserEditAction,
    setUserListAction
} from "../../redux/actions/userManagementActions";
import red from "@material-ui/core/colors/red";
import roleManagementReducers from "../../redux/reducers/roleManagementReducers";
import {setRoleListAction} from "../../redux/actions/roleManagementActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

const FormControl = styled(MuiFormControl)(spacing);
const TextFieldSpacing = styled(MuiTextField)(spacing);

const TextField = styled(TextFieldSpacing)`
  width: 100%;
`;

const Select = styled(MuiSelect)(spacing);

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

function UserManagement({dispatch, userList, userRolesList, roleList, authUser}) {
    const classes = useStyles()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [openDropDown, setOpenDropDown] = useState(null);

    const [openUserAddModal, setOpenUserAddModal] = useState(null);
    const [showPassword, setShowPassword] = useState(null)

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState(false)
    const [roleId, setRoleId] = useState("")
    const [roleIdError, setRoleIdError] = useState(false)

    const [selectedUserId, setSelectedUserId] = useState("")
    const [openUserEditModal, setOpenUserEditModal] = useState(null);

    useEffect(() => {
        dispatch(setRoleListAction())
        dispatch(setUserListAction())
    }, [])

    function toggleDropDownButton(event) {
        if (openDropDown === null) {
            setOpenDropDown(event.currentTarget);
        } else {
            setOpenDropDown(null);
        }
    }

    function toggleUserAddModal(event) {
        if (openUserAddModal === null) {
            setShowPassword(null)
            setEmail("")
            setUsername("")
            setRoleId("")
            setOpenUserAddModal(event.currentTarget);
        } else {
            dispatch(setRoleListAction())
            dispatch(setUserListAction())
            setOpenDropDown(null);
            setOpenUserAddModal(null);
        }
    }

    function toggleUserEditModal(event) {
        setShowPassword(null)
        if (openUserEditModal === null) {
            const user = userList.find(user => user['id'] === selectedUserId)
            const userRoles = userRolesList.find(userRoles => userRoles['userId'] === selectedUserId)
            setEmail(user['email'])
            setUsername(user['username'])
            setRoleId(userRoles['roleId'])
            setOpenUserEditModal(event.currentTarget);
        } else {
            dispatch(setRoleListAction())
            dispatch(setUserListAction())
            setOpenDropDown(null);
            setOpenUserEditModal(null);
        }
    }

    function handleUserAddProcess() {
        setEmailError(false)
        setUsernameError(false)
        setRoleIdError(false)

        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email === "" || !re.test(email)) {
            setEmailError(true)
            return false
        }
        if (username === "") {
            setUsernameError(true)
            return false
        }
        if (roleId === "") {
            setRoleIdError(true)
            return false
        }
        dispatch(addUserAction({ email, username, roleId})).then(response => {
            setShowPassword(response.data['password'])
        }).catch(error => {
            console.log(error)
            alert("실패")
        })
    }

    function resetPassword() {
        dispatch(resetPasswordAction(selectedUserId))
            .then(response => {
                setShowPassword(response.data['password'])
            }).catch(error => {
                alert("실패")
                console.log(error)
        })
    }

    function handleUserEditProcess() {
        dispatch(setUserEditAction(selectedUserId, {
            email, username, roleId
        }))
            .then(() => {
                toggleUserEditModal()
            }).catch(error => {
            alert("실패")
            console.log(error)
        })
    }

    function handleRemoveUserProcess() {
        dispatch(removeUserAction(selectedUserId))
            .then(response => {
                setSelectedUserId("")
                setOpenDropDown(null);
                dispatch(setRoleListAction())
                dispatch(setUserListAction())
            })
    }

    const isManager = authUser['role']['manage']

    return (
        <React.Fragment>
            <Helmet title="사용자"/>
            <Typography variant="h3" gutterBottom display="inline">
                사용자
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
                                    <ArrowDropDown />
                                </Button>

                                <StyledMenu
                                    id="customized-menu"
                                    anchorEl={openDropDown}
                                    keepMounted
                                    open={Boolean(openDropDown)}
                                    onClose={toggleDropDownButton}
                                >
                                    <StyledMenuItem onClick={toggleUserAddModal}>
                                        <ListItemIcon>
                                            <InboxIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="추가" />
                                    </StyledMenuItem>
                                    <StyledMenuItem onClick={toggleUserEditModal}
                                                    disabled={selectedUserId === ""}>
                                        <ListItemIcon>
                                            <SendIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="수정" />
                                    </StyledMenuItem>
                                    <StyledMenuItem onClick={handleRemoveUserProcess}
                                                    disabled={selectedUserId === ""}>
                                        <ListItemIcon>
                                            <DraftsIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="삭제" />
                                    </StyledMenuItem>
                                </StyledMenu>
                            </div>

                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            {
                                                isManager ?
                                                    <StyledTableCell align="center">#</StyledTableCell>
                                                    :
                                                    null
                                            }
                                            <StyledTableCell>이메일</StyledTableCell>
                                            <StyledTableCell>이름</StyledTableCell>
                                            <StyledTableCell align="center">역할</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userList.map((user) => {
                                            const userRoles = userRolesList.find(userRoles => userRoles['userId'] === user['id']);
                                            let roleName = "";
                                            if (userRoles) {
                                                roleName = roleList.find(role => role['id'] === userRoles['roleId'])['name'] || ""
                                            }
                                            return (
                                                <StyledTableRow key={user['email']}>
                                                    {
                                                        isManager ?
                                                            <StyledTableCell component="th"
                                                                             scope="row"
                                                                             align="center"
                                                            >
                                                                <Checkbox color="primary"
                                                                          checked={selectedUserId === user['id']}
                                                                          onChange={() => selectedUserId === user['id'] ? setSelectedUserId("") : setSelectedUserId(user['id'])}
                                                                />
                                                            </StyledTableCell>
                                                            :
                                                            null
                                                    }
                                                    <StyledTableCell>{user['email']}</StyledTableCell>
                                                    <StyledTableCell>{user['username']}</StyledTableCell>
                                                    <StyledTableCell align="center">{roleName}</StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Dialog open={Boolean(openUserAddModal)}
                    fullScreen={fullScreen}
                    onClose={toggleUserAddModal}
                    fullWidth={true}
            >
                <DialogTitle id="form-dialog-title">사용자 추가</DialogTitle>
                <DialogContent>
                    <Box display={showPassword ? "none" : "block"}>
                        <Grid container>
                            <Grid item xs={4}>
                                <Box mt={2}>이메일</Box>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField value={email}
                                           onChange={event => setEmail(event.target.value)}
                                           error={emailError}
                                />
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container>
                            <Grid item xs={4}>
                                <Box mt={2}>이름</Box>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField value={username}
                                           onChange={event => setUsername(event.target.value)}
                                           error={usernameError}
                                />
                            </Grid>
                        </Grid>
                        <br/>
                        <Grid container>
                            <Grid item xs={4}>
                                <Box mt={2}>역할</Box>
                            </Grid>
                            <Grid item xs={7}>
                                <Select value={roleId}
                                        onChange={event => setRoleId(event.target.value)}
                                        error={roleIdError}
                                        style={{minWidth: "120px"}}
                                >
                                    { roleList.map(role => <MenuItem key={role['name']} value={role['id']}>{role['name']}</MenuItem>) }
                                </Select>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box display={showPassword ? "block" : "none" } align={"center"}>
                        임시 비밀번호
                        <Divider my={2} />
                        {showPassword}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Box display={showPassword ? "none" : "block" }>
                        <Button onClick={handleUserAddProcess}>
                            추가
                        </Button>
                        <Button onClick={toggleUserAddModal}>
                            취소
                        </Button>
                    </Box>
                    <Box display={showPassword ? "block" : "none" }>
                        <Button onClick={toggleUserAddModal}>
                            확인
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>


        {/*    수정       */}
            <Dialog open={Boolean(openUserEditModal)}
                    fullScreen={fullScreen}
                    onClose={toggleUserEditModal}
            >
                <DialogTitle id="form-dialog-title">사용자 수정</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={4}>
                            <Box mt={2}>이메일</Box>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField value={email} disabled/>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container>
                        <Grid item xs={4}>
                            <Box mt={2}>이름</Box>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField value={username}
                                       onChange={event => setUsername(event.target.value)}
                                       error={usernameError}
                            />
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container>
                        <Grid item xs={4}>
                            <Box mt={2}>역할</Box>
                        </Grid>
                        <Grid item xs={7}>
                            <Select value={roleId}
                                    onChange={event => setRoleId(event.target.value)}
                                    error={roleIdError}
                                    style={{minWidth: "120px"}}
                            >
                                { roleList.map(role => <MenuItem key={role['name']} value={role['id']}>{role['name']}</MenuItem>) }
                            </Select>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container>
                        <Grid item xs={4}>
                            <Box mt={2}>비밀번호</Box>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display={showPassword ? "none" : "block"}>
                                <Button variant={"contained"}
                                        style={{backgroundColor: red["400"]}}
                                        size={"small"}
                                        onClick={resetPassword}
                                >초기화</Button>
                            </Box>
                            <Box display={showPassword ? "block" : "none"} mt={2}>
                                {showPassword}
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUserEditProcess}>
                        저장
                    </Button>
                    <Button onClick={toggleUserEditModal}>
                        취소
                    </Button>
                </DialogActions>
            </Dialog>




        </React.Fragment>
    );
}

export default connect(store => ({...store.userManagementReducers, ...store.roleManagementReducers, ...store.fastcatxReducers}))(UserManagement);
