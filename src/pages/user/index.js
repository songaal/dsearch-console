import React from "react";
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField as MuiTextField,
    Select as MuiSelect,
    InputLabel,
    FormControl as MuiFormControl,
} from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import {ArrowDropDown} from "@material-ui/icons";

const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);

const useStyles = makeStyles({
    table: {
        width: "100%",
    },
    formStyle: {
        marginTop: "10px",
        marginBottom: "10px"
    }
}, { withTheme: true });

const StyledTableCell = withStyles((theme) => ({
    body: {
        fontSize: 14,
    },
}))(TableCell);

const TextFieldSpacing = styled(MuiTextField)(spacing);

const TextField = styled(TextFieldSpacing)`
  width: 100%;
`;

const Select = styled(MuiSelect)(spacing);

const FormControlSpacing = styled(MuiFormControl)(spacing);

const FormControl = styled(FormControlSpacing)`
  min-width: 148px;
`;

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);


function createData(email, role) {
    return { email, role };
}
const rows = [
    createData('Cupcake@gmail.com', '관리자'),
    createData('Donut@gmail.com', '관리자'),
    createData('Eclair@gmail.com', '관리자'),
    createData('Frozen yoghurt@gmail.com', '관리자'),
    createData('Gingerbread@gmail.com', '관리자'),
    createData('Honeycomb@gmail.com', '운영자'),
    createData('Ice cream sandwich@gmail.com', '사용자'),
    createData('Jelly Bean@gmail.com', '사용자'),
    createData('KitKat@gmail.com', '사용자'),
    createData('Lollipop@gmail.com', '사용자'),
    createData('Marshmallow@gmail.com', '사용자'),
    createData('Nougat@gmail.com', '사용자'),
];



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


function User() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);


    const handleButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleButtonClose = () => {
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
                                    onclick={handleButtonClick}
                                >
                                    작업
                                    <ArrowDropDown />
                                </Button>

                                <StyledMenu
                                    id="customized-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleButtonClose}
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

                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">#</StyledTableCell>
                                            <StyledTableCell>이메일</StyledTableCell>
                                            <StyledTableCell align="center">역할</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <StyledTableRow key={row.email}>
                                                <StyledTableCell component="th"
                                                                 scope="row"
                                                                 align="center"
                                                >
                                                    <Checkbox
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell>{row.email}</StyledTableCell>
                                                <StyledTableCell align="center">{row.role}</StyledTableCell>
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
                <DialogTitle id="form-dialog-title">사용자 초대</DialogTitle>
                <DialogContent>

                    <Grid container className={classes.formStyle}>
                        <Grid item xs={4}>
                            이메일
                        </Grid>
                        <Grid item xs={7}>
                            <FormControl >
                                <TextField
                                    id="standard-name"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container className={classes.formStyle}>
                        <Grid item xs={4}>
                            역할
                        </Grid>
                        <Grid item xs={7}>
                            <FormControl >
                                <Select>
                                    <MenuItem value={"관리자"}>관리자</MenuItem>
                                    <MenuItem value={"운영자"}>운영자</MenuItem>
                                    <MenuItem value={"사용자"}>사용자</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose} color="primary">
                        초대하기
                    </Button>
                    <Button onClick={handleAddClose} color="primary">
                        취소
                    </Button>
                </DialogActions>
            </Dialog>





        </React.Fragment>
    );
}

export default User;
