import React, {useEffect} from "react";
import {connect} from 'react-redux';
import styled from "styled-components";
import Helmet from 'react-helmet';
import {spacing} from "@material-ui/system";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Card as MuiCard,
    CardContent,
    CardHeader,
    Divider as MuiDivider,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Button,
    DialogTitle,
    DialogContent,
    InputLabel,
    DialogActions,
    Dialog,
    TextField as MuiTextField,
    Select as MuiSelect,
    FormControl as MuiFormControl,
    Switch,
    Box
} from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import {ArrowDropDown} from "@material-ui/icons";
import red from '@material-ui/core/colors/red';
import {setRoleListAction} from "../../redux/actions/roleManagementActions";

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


function Role({ dispatch, roleList }) {

    const classes = useStyles();
    const [checked, setChecked] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        dispatch(setRoleListAction())
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddClickOpen = () => {
        setOpen(true);
    };

    const handleAddClose = () => {
        setOpen(false);
    };

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
                            <div align={"right"}>
                                <Button
                                    aria-controls="customized-menu"
                                    aria-haspopup="true"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleClick}
                                >
                                    작업
                                    <ArrowDropDown />
                                </Button>

                                <StyledMenu
                                    id="customized-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <StyledMenuItem onClick={handleAddClickOpen}>
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

                            <TableContainer >
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">#</StyledTableCell>
                                            <StyledTableCell align="center">역할</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {roleList.map((row) => (
                                            <StyledTableRow key={row.name}>
                                                <StyledTableCell component="th"
                                                                 scope="row"
                                                                 align="center"
                                                >
                                                    <Checkbox
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{row.name}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleAddClose}>
                <DialogTitle id="form-dialog-title">역할 추가</DialogTitle>
                <DialogContent>

                    <form noValidate autoComplete="off">

                        <Grid container spacing={6}>
                            <Grid item xs={3}>
                                이름
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    id="standard-name"
                                />
                            </Grid>
                        </Grid>

                        <Grid container className={classes.roleTable}>
                            <Grid item xs={3}>
                                권한
                            </Grid>
                            <Grid item xs={8}>

                                <Table  size="small">
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
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
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
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
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
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
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
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
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
                                <Box  className={classes.warning}>
                                    * 모든영역에 대한 읽기권한은 기본적으로 존재합니다.
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose} color="primary">
                        추가
                    </Button>
                    <Button onClick={handleAddClose} color="primary">
                        취소
                    </Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}

export default connect(store => ({...store.roleManagementReducers}))(Role);