import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import Helmet from 'react-helmet';
import {spacing} from "@material-ui/system";
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import {
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
import {addUserAction, setUserListAction} from "../../redux/actions/userManagementActions";
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

function UserManagement({dispatch, userList, userRolesList, roleList}) {
    const classes = useStyles()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [openDropDown, setOpenDropDown] = useState(null);
    const [openUserAddModal, setOpenUserAddModal] = useState(null);

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState(false)
    const [roleId, setRoleId] = useState("")
    const [roleIdError, setRoleIdError] = useState(false)

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
            setOpenUserAddModal(event.currentTarget);
        } else {
            setOpenUserAddModal(null);
        }
    }

    function handleUserAddProcess() {
        setEmailError(false)
        setUsernameError(false)
        setRoleIdError(false)

        if (email === "") {
            setEmailError(true)
        }
        if (username === "") {
            setUsernameError(true)
        }
        if (roleId === "") {
            setRoleIdError(true)
        }

        dispatch(addUserAction({ email, username, roleId})).then(response => {
            console.log(response.data)
        })
    }


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
                            <div align={"right"}>
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
                                    <StyledMenuItem>
                                        <ListItemIcon>
                                            <SendIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="수정" />
                                    </StyledMenuItem>
                                    <StyledMenuItem>
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
                                            <StyledTableCell align="center">#</StyledTableCell>
                                            <StyledTableCell>이메일</StyledTableCell>
                                            <StyledTableCell>이름</StyledTableCell>
                                            <StyledTableCell align="center">역할</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userList.map((user) => {
                                            const userRoles = userRolesList.find(userRoles => userRoles['userId'] === user['id']);
                                            const role = roleList.find(role => role['id'] === userRoles['roleId']);
                                            return (
                                                <StyledTableRow key={user['email']}>
                                                    <StyledTableCell component="th"
                                                                     scope="row"
                                                                     align="center"
                                                    >
                                                        <Checkbox color="primary" />
                                                    </StyledTableCell>
                                                    <StyledTableCell>{user['email']}</StyledTableCell>
                                                    <StyledTableCell>{user['username']}</StyledTableCell>
                                                    <StyledTableCell align="center">{role['name']}</StyledTableCell>
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
            >
                <DialogTitle id="form-dialog-title">사용자 추가</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={4}>
                            이메일
                        </Grid>
                        <Grid item xs={7}>
                            <TextField value={email}
                                       onChange={event => setEmail(event.target.value)}
                                       error={emailError}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            이름
                        </Grid>
                        <Grid item xs={7}>
                            <TextField value={username}
                                       onChange={event => setUsername(event.target.value)}
                                       error={usernameError}
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>
                            역할
                        </Grid>
                        <Grid item xs={7}>
                            <Select value={roleId}
                                    onChange={event => setRoleId(event.target.value)}
                                    error={roleIdError}
                            >
                                { roleList.map(role => <MenuItem key={role['name']} value={role['id']}>{role['name']}</MenuItem>) }
                            </Select>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUserAddProcess}>
                        추가
                    </Button>
                    <Button onClick={toggleUserAddModal}>
                        취소
                    </Button>
                </DialogActions>
            </Dialog>





        </React.Fragment>
    );
}

export default connect(store => ({...store.userManagementReducers, ...store.roleManagementReducers}))(UserManagement);
